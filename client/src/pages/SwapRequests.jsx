import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRightLeft, 
  Check, 
  X, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  AlertCircle,
  Inbox,
  Send
} from 'lucide-react';
import { swapAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

export default function SwapRequests() {
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming' | 'outgoing' | 'history'
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await swapAPI.getMyRequests();
      if (res.data.success) {
        setIncoming(res.data.incoming || []);
        setOutgoing(res.data.outgoing || []);
      }
    } catch (err) {
      toast.error('Failed to load swap requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRespond = async (requestId, status) => {
    setActionLoading(requestId);
    try {
      const res = await swapAPI.respond(requestId, status);
      if (res.data.success) {
        if (status === 'accepted') {
          toast.success('Swap request accepted! Connection created.');
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
          });
        } else {
          toast.info('Swap request declined.');
        }
        await fetchRequests();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating request.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (requestId) => {
    setActionLoading(requestId);
    try {
      const res = await swapAPI.cancel(requestId);
      if (res.data.success) {
        toast.info('Request cancelled.');
        await fetchRequests();
      }
    } catch (err) {
      toast.error('Error cancelling request.');
    } finally {
      setActionLoading(null);
    }
  };

  // Filter requests based on tab
  const pendingIncoming = incoming.filter(r => r.status === 'pending');
  const pendingOutgoing = outgoing.filter(r => r.status === 'pending');
  const historyRequests = [
    ...incoming.filter(r => r.status !== 'pending'),
    ...outgoing.filter(r => r.status !== 'pending')
  ].sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 mb-2">
          <ArrowRightLeft className="w-3.5 h-3.5" /> Exchange Manager
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Skill Swap Requests
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review incoming exchange proposals, manage outgoing offers, and connect with peers.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'incoming'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Inbox className="w-4 h-4" /> Incoming Proposals
          {pendingIncoming.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-rose-500 text-white font-bold">
              {pendingIncoming.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('outgoing')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'outgoing'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Send className="w-4 h-4" /> Sent by You
          {pendingOutgoing.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-200 text-slate-700 font-bold">
              {pendingOutgoing.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" /> Completed & History ({historyRequests.length})
        </button>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-500">Loading requests...</p>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* 1. INCOMING REQUESTS */}
          {activeTab === 'incoming' && (
            pendingIncoming.length > 0 ? (
              pendingIncoming.map(req => (
                <div
                  key={req.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={req.sender?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${req.sender?.id}`}
                        alt={req.sender?.full_name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
                      />
                      <div>
                        <Link to={`/profile/${req.sender?.id}`} className="font-bold text-slate-900 hover:text-primary-600">
                          {req.sender?.full_name}
                        </Link>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5" /> {req.sender?.college} • {req.sender?.course}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400">
                      {new Date(req.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {/* Skills Exchange Deal */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-slate-500 block mb-0.5">They will teach you:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block border border-emerald-200">
                        ✨ {req.offered_skill}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500 block mb-0.5">In return, you teach:</span>
                      <span className="font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-lg inline-block border border-violet-200">
                        🎯 {req.wanted_skill}
                      </span>
                    </div>
                  </div>

                  {/* Personal message */}
                  {req.message && (
                    <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100 italic">
                      "{req.message}"
                    </p>
                  )}

                  {/* Accept / Decline Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => handleRespond(req.id, 'rejected')}
                      disabled={actionLoading === req.id}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
                    >
                      <X className="w-4 h-4" /> Decline
                    </button>
                    <button
                      onClick={() => handleRespond(req.id, 'accepted')}
                      disabled={actionLoading === req.id}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition transform active:scale-95 disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" /> Accept & Connect
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
                <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 text-base">No pending incoming proposals</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  When other students want to exchange skills with you, their proposals will appear here.
                </p>
              </div>
            )
          )}

          {/* 2. OUTGOING REQUESTS */}
          {activeTab === 'outgoing' && (
            pendingOutgoing.length > 0 ? (
              pendingOutgoing.map(req => (
                <div
                  key={req.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={req.receiver?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${req.receiver?.id}`}
                        alt={req.receiver?.full_name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
                      />
                      <div>
                        <p className="text-xs text-slate-400">Proposal sent to</p>
                        <Link to={`/profile/${req.receiver?.id}`} className="font-bold text-slate-900 hover:text-primary-600">
                          {req.receiver?.full_name}
                        </Link>
                        <p className="text-xs text-slate-500">{req.receiver?.college}</p>
                      </div>
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 self-start sm:self-auto">
                      PENDING REVIEW
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-slate-500 block mb-0.5">You offered to teach:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block border border-emerald-200">
                        ✨ {req.offered_skill}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500 block mb-0.5">You requested to learn:</span>
                      <span className="font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-lg inline-block border border-violet-200">
                        🎯 {req.wanted_skill}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-2">
                    <button
                      onClick={() => handleCancel(req.id)}
                      disabled={actionLoading === req.id}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-semibold transition disabled:opacity-50"
                    >
                      Cancel Proposal
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
                <Send className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 text-base">You haven't sent any pending proposals</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">
                  Find peers who teach what you want to learn and send them a swap request!
                </p>
                <Link
                  to="/explore"
                  className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-xs hover:bg-primary-700"
                >
                  Explore Students
                </Link>
              </div>
            )
          )}

          {/* 3. HISTORY / COMPLETED */}
          {activeTab === 'history' && (
            historyRequests.length > 0 ? (
              historyRequests.map(req => (
                <div
                  key={req.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-100 text-slate-600">
                      <ArrowRightLeft className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Swap: <span className="text-emerald-700">{req.offered_skill}</span> ↔ <span className="text-violet-700">{req.wanted_skill}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Between {req.sender?.full_name} and {req.receiver?.full_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      req.status === 'accepted'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {req.status.toUpperCase()}
                    </span>

                    {req.status === 'accepted' && (
                      <Link
                        to="/chat"
                        className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Chat
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 text-base">No swap history recorded</h3>
                <p className="text-xs text-slate-500 mt-1">Accepted and archived swaps will appear here.</p>
              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}
