"use server";

import client from "@/lib/prisma";
import { nextGetServerSession } from "@/lib/AuthOptions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";

// Define the types properly
export type VoteSessionCandidateWithCount = Prisma.Vote_session_candidateGetPayload<{
  include: {
    candidate: true;
  };
}> & {
  currentVotes: number;
  voterDetails?: {
    totalUsers: number;
    usersByClass: Record<string, number>;
    usersByRole: Record<string, number>;
  };
};

export type VoteSessionWithCounts = Omit<
  Prisma.Vote_sessionGetPayload<{
    include: {
      vote_session_candidate: {
        include: {
          candidate: true;
        };
      };
    };
  }>,
  'vote_session_candidate'
> & {
  vote_session_candidate: VoteSessionCandidateWithCount[];
  totalVotesInSession: number;
};

export interface TransferVoteData {
  voteSessionId: string;
  fromCandidateId: string;
  toCandidateId: string;
  transferAmount: number;
  transferReason?: string; // Optional reason for audit trail
}

export interface TransferResult {
  success: boolean;
  message: string;
  data?: {
    transferred: number;
    fromCandidate: string;
    toCandidate: string;
    transferredVotes: Array<{
      userId: string;
      userName: string;
      originalTimestamp: Date;
      transferTimestamp: Date;
    }>;
  };
}

/**
 * Optimized vote transfer function
 * Transfers User_vote relations between candidates in the same vote session
 */
export async function transferVote(data: TransferVoteData): Promise<TransferResult> {
  try {
    const session = await nextGetServerSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized access");
    }

    const { voteSessionId, fromCandidateId, toCandidateId, transferAmount, transferReason } = data;

    // Input validation
    if (!voteSessionId || !fromCandidateId || !toCandidateId || transferAmount <= 0) {
      throw new Error("Invalid input data");
    }

    if (fromCandidateId === toCandidateId) {
      throw new Error("Kandidat pengirim dan penerima tidak boleh sama");
    }

    // Verify vote session exists and get candidate information in one query
    const voteSession = await client.vote_session.findFirst({
      where: { id: voteSessionId },
      include: {
        vote_session_candidate: {
          include: { 
            candidate: true 
          },
          where: {
            candidate_id: {
              in: [fromCandidateId, toCandidateId]
            }
          }
        },
      },
    });

    if (!voteSession) {
      throw new Error("Vote session tidak ditemukan");
    }

    // Verify both candidates exist in this session
    const candidates = voteSession.vote_session_candidate;
    const fromCandidate = candidates.find(vsc => vsc.candidate_id === fromCandidateId);
    const toCandidate = candidates.find(vsc => vsc.candidate_id === toCandidateId);

    if (!fromCandidate || !toCandidate) {
      throw new Error("Kandidat tidak ditemukan dalam sesi vote ini");
    }

    // Get votes to transfer with user information (most recent votes first)
    const votesToTransfer = await client.user_vote.findMany({
      where: {
        vote_session_id: voteSessionId,
        candidate_id: fromCandidateId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            kelas: true,
            role: true
          }
        }
      },
      orderBy: { timestamp: "desc" },
      take: transferAmount,
    });

    // Verify sufficient votes exist
    if (votesToTransfer.length < transferAmount) {
      throw new Error(
        `Kandidat ${fromCandidate.candidate.name} hanya memiliki ${votesToTransfer.length} vote, tidak dapat transfer ${transferAmount} vote`
      );
    }

    // Perform the transfer in an optimized transaction
    const result = await client.$transaction(async (tx) => {
      const transferTimestamp = new Date();
      
      // Batch update votes for better performance
      const voteIds = votesToTransfer.map(vote => vote.id);
      
      await tx.user_vote.updateMany({
        where: {
          id: { in: voteIds }
        },
        data: {
          candidate_id: toCandidateId,
          timestamp: transferTimestamp, // Update timestamp to reflect transfer time
        },
      });

      // Optional: Create audit log entry (if you have an audit table)
      // await tx.transfer_audit.create({
      //   data: {
      //     vote_session_id: voteSessionId,
      //     from_candidate_id: fromCandidateId,
      //     to_candidate_id: toCandidateId,
      //     transfer_amount: transferAmount,
      //     transferred_by: session.user.id,
      //     reason: transferReason,
      //     timestamp: transferTimestamp,
      //   }
      // });

      return {
        transferred: transferAmount,
        fromCandidate: fromCandidate.candidate.name,
        toCandidate: toCandidate.candidate.name,
        transferredVotes: votesToTransfer.map(vote => ({
          userId: vote.user_Id,
          userName: vote.user.name,
          originalTimestamp: vote.timestamp,
          transferTimestamp,
        })),
      };
    });

    revalidatePath("/admin", "layout");
    revalidatePath("/admin/*", "page");
    return {
      success: true,
      message: `Berhasil transfer ${result.transferred} vote dari ${result.fromCandidate} ke ${result.toCandidate}`,
      data: result,
    };
  } catch (error) {
    console.error("Transfer vote error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Terjadi kesalahan saat transfer vote",
    };
  }
}

/**
 * Get vote sessions with detailed counts and analytics
 */
export async function getVoteSessionsForTransfer(): Promise<VoteSessionWithCounts[]> {
  try {
    const session = await nextGetServerSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      redirect("/login");
    }

    // Get vote sessions with all related data in one optimized query
    const voteSessions = await client.vote_session.findMany({
      where: {
        OR: [
          { isPublic: true },
          { vote_session_access: { some: { user_Id: session.user.id } } },
        ],
      },
      include: {
        vote_session_candidate: {
          include: {
            candidate: true,
          },
          orderBy: {
            candidates_number: 'asc'
          }
        },
        User_vote: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                kelas: true,
                role: true,
                email: true
              }
            },
            candidate: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
      },
      orderBy: {
        openedAt: 'desc',
      },
    });

    // Transform data with detailed analytics
    const sessionsWithCounts: VoteSessionWithCounts[] = voteSessions.map((voteSession) => {
      // Group votes by candidate for efficient counting
      const votesByCandidate = voteSession.User_vote.reduce<Record<string, typeof voteSession.User_vote>>((acc, vote) => {
        if (!acc[vote.candidate_id]) {
          acc[vote.candidate_id] = [];
        }
        acc[vote.candidate_id].push(vote);
        return acc;
      }, {});

      // Calculate detailed statistics for each candidate
      const candidatesWithCounts: VoteSessionCandidateWithCount[] = voteSession.vote_session_candidate.map((vsc) => {
        const candidateVotes = votesByCandidate[vsc.candidate_id] || [];
        
        // Analyze voter demographics
        const votersByClass = candidateVotes.reduce<Record<string, number>>((acc, vote) => {
          const kelas = vote.user.kelas || 'Unknown';
          acc[kelas] = (acc[kelas] || 0) + 1;
          return acc;
        }, {});

        const votersByRole = candidateVotes.reduce<Record<string, number>>((acc, vote) => {
          acc[vote.user.role] = (acc[vote.user.role] || 0) + 1;
          return acc;
        }, {});

        return {
          ...vsc,
          currentVotes: candidateVotes.length,
          voterDetails: {
            totalUsers: candidateVotes.length,
            usersByClass: votersByClass,
            usersByRole: votersByRole,
          },
        };
      });

      // Remove User_vote from final result to keep response clean
      const { User_vote, ...sessionWithoutUserVote } = voteSession;
      
      return {
        ...sessionWithoutUserVote,
        vote_session_candidate: candidatesWithCounts,
        totalVotesInSession: voteSession.User_vote.length,
      };
    });

    return sessionsWithCounts;
  } catch (error) {
    console.error("Get vote sessions error:", error);
    throw new Error("Gagal mengambil data vote session");
  }
}



/**
 * Validate transfer operation before execution
 */
export async function validateTransferOperation(data: TransferVoteData) {
  try {
    const session = await nextGetServerSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return { valid: false, message: "Unauthorized access" };
    }

    const { voteSessionId, fromCandidateId, toCandidateId, transferAmount } = data;

    // Get vote counts
    const [fromVoteCount, sessionExists] = await Promise.all([
      client.user_vote.count({
        where: {
          vote_session_id: voteSessionId,
          candidate_id: fromCandidateId,
        },
      }),
      client.vote_session.findUnique({
        where: { id: voteSessionId },
        select: { id: true, title: true }
      })
    ]);

    if (!sessionExists) {
      return { valid: false, message: "Vote session tidak ditemukan" };
    }

    if (fromVoteCount < transferAmount) {
      return { 
        valid: false, 
        message: `Kandidat hanya memiliki ${fromVoteCount} vote, tidak dapat transfer ${transferAmount} vote` 
      };
    }

    return { 
      valid: true, 
      message: "Transfer operation valid",
      availableVotes: fromVoteCount
    };
  } catch (error) {
    console.error("Validate transfer error:", error);
    return { valid: false, message: "Error validating transfer operation" };
  }
}