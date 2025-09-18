"use client";

import React, { useState } from "react";
import { ChevronDown, Users, Vote, ArrowRight, AlertCircle, CheckCircle, Calendar } from "lucide-react";
import { transferVote, type TransferVoteData, type VoteSessionWithCounts } from "@/utils/forbidden-vote";

interface TransferVotePageProps {
  voteSessions: VoteSessionWithCounts[];
}

export default function TransferVotePage({ voteSessions }: TransferVotePageProps) {
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedFromCandidate, setSelectedFromCandidate] = useState("");
  const [selectedToCandidate, setSelectedToCandidate] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const selectedSessionData = voteSessions?.find(session => session.id === selectedSession);
  const fromCandidateData = selectedSessionData?.vote_session_candidate.find(
    vsc => vsc.candidate_id === selectedFromCandidate
  );
  const maxTransferVotes = fromCandidateData?.currentVotes || 0;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isSessionActive = (openedAt: Date, closeAt: Date) => {
    const now = new Date();
    return now >= new Date(openedAt) && now <= new Date(closeAt);
  };

  const handleTransferVote = async () => {
    if (!selectedSession || !selectedFromCandidate || !selectedToCandidate || !transferAmount) {
      setMessage({ type: "error", text: "Harap lengkapi semua field" });
      return;
    }

    if (selectedFromCandidate === selectedToCandidate) {
      setMessage({ type: "error", text: "Kandidat pengirim dan penerima tidak boleh sama" });
      return;
    }

    const amount = parseInt(transferAmount);
    if (amount <= 0 || amount > maxTransferVotes) {
      setMessage({ 
        type: "error", 
        text: `Jumlah vote harus antara 1 dan ${maxTransferVotes}` 
      });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const transferData: TransferVoteData = {
        voteSessionId: selectedSession,
        fromCandidateId: selectedFromCandidate,
        toCandidateId: selectedToCandidate,
        transferAmount: amount
      };

      const result = await transferVote(transferData);

      if (result.success) {
        setMessage({ type: "success", text: result.message });
        // Reset form
        setSelectedFromCandidate("");
        setSelectedToCandidate("");
        setTransferAmount("");
        
        // Refresh the page to get updated vote counts
        window.location.reload();
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Terjadi kesalahan saat transfer vote" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Vote className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Vote Transfer System</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sistem Transfer Vote
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kelola dan transfer vote antar kandidat dalam sesi pemungutan suara aktif
          </p>
        </div>

        {/* Vote Sessions List */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {voteSessions?.map((session) => {
            const isActive = isSessionActive(session.openedAt, session.closeAt);
            const totalVotes = session.vote_session_candidate.reduce((sum, vsc) => sum + vsc.currentVotes, 0);
            
            return (
              <div key={session.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{session.title}</h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {isActive ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(session.openedAt)} - {formatDate(session.closeAt)}</span>
                  </div>
                  
                  <div className="space-y-3">
                    {session.vote_session_candidate.map((vsc) => (
                      <div key={vsc.candidate_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={vsc.candidate.img || "/api/placeholder/40/40"} 
                            alt={vsc.candidate.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <span className="font-medium text-gray-900">{vsc.candidate.name}</span>
                            {vsc.candidate.kandidat_kelas && (
                              <p className="text-xs text-gray-500">{vsc.candidate.kandidat_kelas}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="font-semibold text-blue-600">{vsc.currentVotes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Max Vote: {session.max_vote}</span>
                      <span>Total: {totalVotes} votes</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Public: {session.isPublic ? 'Ya' : 'Tidak'}</span>
                      <span>Kandidat: {session.vote_session_candidate.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transfer Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Transfer Vote</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Vote Session Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Sesi Pemungutan Suara
                </label>
                <div className="relative">
                  <select 
                    value={selectedSession}
                    onChange={(e) => {
                      setSelectedSession(e.target.value);
                      setSelectedFromCandidate('');
                      setSelectedToCandidate('');
                      setTransferAmount('');
                    }}
                    className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Pilih Sesi Vote...</option>
                    {voteSessions?.map((session) => (
                      <option key={session.id} value={session.id}>
                        {session.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* From Candidate Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transfer Dari Kandidat
                </label>
                <div className="relative">
                  <select 
                    value={selectedFromCandidate}
                    onChange={(e) => {
                      setSelectedFromCandidate(e.target.value);
                      setTransferAmount('');
                    }}
                    disabled={!selectedSession}
                    className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Pilih Kandidat Pengirim...</option>
                    {selectedSessionData?.vote_session_candidate.map((vsc) => (
                      <option key={vsc.candidate_id} value={vsc.candidate_id}>
                        {vsc.candidate.name} ({vsc.currentVotes} votes)
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* To Candidate Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transfer Ke Kandidat
                </label>
                <div className="relative">
                  <select 
                    value={selectedToCandidate}
                    onChange={(e) => setSelectedToCandidate(e.target.value)}
                    disabled={!selectedFromCandidate}
                    className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Pilih Kandidat Penerima...</option>
                    {selectedSessionData?.vote_session_candidate
                      .filter(vsc => vsc.candidate_id !== selectedFromCandidate)
                      .map((vsc) => (
                        <option key={vsc.candidate_id} value={vsc.candidate_id}>
                          {vsc.candidate.name} ({vsc.currentVotes} votes)
                        </option>
                      ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Transfer Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Vote yang Ditransfer
                  {maxTransferVotes > 0 && (
                    <span className="text-gray-500 text-xs ml-1">(Max: {maxTransferVotes})</span>
                  )}
                </label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  min="1"
                  max={maxTransferVotes}
                  disabled={!selectedFromCandidate}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Masukkan jumlah vote..."
                />
              </div>
            </div>

            {/* Transfer Preview */}
            {selectedFromCandidate && selectedToCandidate && transferAmount && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <p className="font-medium text-gray-900">
                      {fromCandidateData?.candidate.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {fromCandidateData?.currentVotes} → {fromCandidateData?.currentVotes! - parseInt(transferAmount || '0')} votes
                    </p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-blue-600" />
                  <div className="text-center">
                    <p className="font-medium text-gray-900">
                      {selectedSessionData?.vote_session_candidate.find(vsc => vsc.candidate_id === selectedToCandidate)?.candidate.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedSessionData?.vote_session_candidate.find(vsc => vsc.candidate_id === selectedToCandidate)?.currentVotes} → {(selectedSessionData?.vote_session_candidate.find(vsc => vsc.candidate_id === selectedToCandidate)?.currentVotes || 0) + parseInt(transferAmount || '0')} votes
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            {message.text && (
              <div className={`mt-4 p-4 rounded-lg flex items-center space-x-2 ${
                message.type === 'error' 
                  ? 'bg-red-50 border border-red-200 text-red-700' 
                  : 'bg-green-50 border border-green-200 text-green-700'
              }`}>
                {message.type === 'error' ? (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <p>{message.text}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                onClick={handleTransferVote}
                disabled={isLoading || !selectedSession || !selectedFromCandidate || !selectedToCandidate || !transferAmount}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Memproses Transfer...</span>
                  </>
                ) : (
                  <>
                    <Vote className="h-5 w-5" />
                    <span>Transfer Vote</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}