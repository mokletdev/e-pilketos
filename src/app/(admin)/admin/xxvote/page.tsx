// If this is in your page.tsx or route handler
import { getVoteSessionsForTransfer } from "@/utils/forbidden-vote";
import TransferVotePage from "./_components/vote"; // adjust path as needed

export default async function Page() {
  try {
    // Get the vote sessions data with proper structure
    const voteSessions = await getVoteSessionsForTransfer();

    return (
      <div className="max-w-full min-h-screen">
        <TransferVotePage voteSessions={voteSessions} />
      </div>
    );
  } catch (error) {
    console.error("Error loading vote sessions:", error);
    return (
      <div className="max-w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">Failed to load vote sessions</p>
        </div>
      </div>
    );
  }
}
