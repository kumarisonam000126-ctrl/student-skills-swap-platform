import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  GraduationCap, 
  Star, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { connectionAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import SkillBadge from '../components/SkillBadge';

export default function Connections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        const res = await connectionAPI.getMyConnections();
        if (res.data.success) {
          setConnections(res.data.connections || []);
        }
      } catch (err) {
        toast.error('Failed to load peer connections.');
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 mb-2">
          <Users className="w-3.5 h-3.5" /> Peer Network
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          My Active Connections
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Students you have actively partnered with for skill swaps. Message them and schedule learning sessions.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-500">Loading your connections...</p>
        </div>
      ) : connections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map(conn => {
            const partner = conn.partner;
            if (!partner) return null;

            return (
              <div
                key={conn.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top info */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="relative">
                      <img
                        src={partner.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${partner.id}`}
                        alt={partner.full_name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-100"
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <Link to={`/profile/${partner.id}`} className="font-bold text-slate-900 hover:text-primary-600 text-base truncate block">
                        {partner.full_name}
                      </Link>
                      <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{partner.college}</span>
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{partner.course}</p>
                    </div>
                  </div>

                  {/* Partner's skills */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Can Teach You
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {partner.skills?.teach && partner.skills.teach.slice(0, 2).map((s, idx) => (
                          <SkillBadge key={idx} name={s.name} level={s.level} type="teach" size="sm" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Last message preview if any */}
                  {conn.lastMessage && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600 border border-slate-100 flex items-start gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <p className="truncate italic">"{conn.lastMessage.content}"</p>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <Link
                    to={`/profile/${partner.id}`}
                    className="flex-1 text-center py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                  >
                    View Profile
                  </Link>

                  <button
                    onClick={() => navigate('/chat', { state: { selectedConnectionId: conn.id } })}
                    className="flex-1 py-2 px-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Open Chat
                    {conn.unreadCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {conn.unreadCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No active connections yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            When a student accepts your skill swap proposal (or you accept theirs), they will appear in your network here.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-xs hover:bg-primary-700 transition"
          >
            <Compass className="w-4 h-4" /> Discover Partners Now
          </Link>
        </div>
      )}

    </div>
  );
}
