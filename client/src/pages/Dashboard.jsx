import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ArrowRightLeft, 
  Sparkles, 
  BookOpen, 
  Clock, 
  ChevronRight, 
  GraduationCap, 
  Star,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  TrendingUp,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { swapAPI, connectionAPI, matchAPI, profileAPI } from '../services/api';
import StatCard from '../components/StatCard';
import SkillBadge from '../components/SkillBadge';
import StudentCard from '../components/StudentCard';

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalConnections: 0,
    pendingIncoming: 0,
    pendingOutgoing: 0,
    totalAccepted: 0,
    skillsTeachCount: user?.skills?.teach?.length || 0,
    skillsLearnCount: user?.skills?.learn?.length || 0
  });

  const [recommendedMatches, setRecommendedMatches] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // 1. Fetch swap requests
        const reqRes = await swapAPI.getMyRequests();
        if (reqRes.data.success) {
          const inc = reqRes.data.incoming || [];
          const out = reqRes.data.outgoing || [];
          setRecentRequests([...inc, ...out].slice(0, 5));
          setStats(prev => ({
            ...prev,
            pendingIncoming: reqRes.data.stats.pendingIncoming || 0,
            pendingOutgoing: reqRes.data.stats.pendingOutgoing || 0,
            totalAccepted: reqRes.data.stats.totalAccepted || 0
          }));
        }

        // 2. Fetch connections
        const connRes = await connectionAPI.getMyConnections();
        if (connRes.data.success) {
          setConnections(connRes.data.connections || []);
          setStats(prev => ({
            ...prev,
            totalConnections: connRes.data.count || 0
          }));
        }

        // 3. Fetch smart matches
        const matchRes = await matchAPI.getSmartMatches();
        if (matchRes.data.success) {
          setRecommendedMatches(matchRes.data.matches.slice(0, 3));
        }
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const getTimeGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      
      {/* 1. WELCOME PROFILE BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/10">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`}
              alt={user?.full_name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 bg-white/10"
            />
            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-blue-100">
                {getTimeGreeting()}, Student Partner
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">{user?.full_name}</h1>
              <p className="text-xs sm:text-sm text-blue-100 flex items-center gap-1.5 mt-1">
                <GraduationCap className="w-4 h-4 text-blue-200" />
                <span>{user?.college}</span>
                <span className="opacity-60">•</span>
                <span>{user?.course}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/edit-profile"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition"
            >
              Edit Profile & Skills
            </Link>
            <Link
              to="/explore"
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition transform active:scale-95 flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" /> Find New Partner
            </Link>
          </div>
        </div>
      </div>

      {/* 2. KPI STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Active Connections"
          value={stats.totalConnections}
          icon={Users}
          color="blue"
          trend="Connected peers"
        />
        <StatCard
          title="Pending Swap Requests"
          value={stats.pendingIncoming}
          icon={ArrowRightLeft}
          color="amber"
          trend={stats.pendingIncoming > 0 ? "Requires your response" : "Up to date"}
        />
        <StatCard
          title="Skills You Teach"
          value={user?.skills?.teach?.length || 0}
          icon={Sparkles}
          color="emerald"
          trend="Sharing knowledge"
        />
        <StatCard
          title="Skills You Want"
          value={user?.skills?.learn?.length || 0}
          icon={BookOpen}
          color="purple"
          trend="Learning roadmap"
        />
      </div>

      {/* 3. TWO COLUMN: SKILLS PROFILE BREAKDOWN + RECENT SWAP ACTIVITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: My Skills Inventory */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg">My Skills Portfolio</h3>
            <Link to="/edit-profile" className="text-xs font-semibold text-primary-600 hover:underline">
              Manage
            </Link>
          </div>

          {/* Teach Skills */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Skills You Teach ({user?.skills?.teach?.length || 0})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.teach && user.skills.teach.length > 0 ? (
                user.skills.teach.map((s, idx) => (
                  <SkillBadge key={idx} name={s.name} level={s.level} type="teach" size="md" />
                ))
              ) : (
                <p className="text-xs text-slate-400">No skills added yet.</p>
              )}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Learn Skills */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5 text-violet-700">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                Skills You Want to Learn ({user?.skills?.learn?.length || 0})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.learn && user.skills.learn.length > 0 ? (
                user.skills.learn.map((s, idx) => (
                  <SkillBadge key={idx} name={s.name} level={s.level} type="learn" size="md" />
                ))
              ) : (
                <p className="text-xs text-slate-400">No learning skills specified.</p>
              )}
            </div>
          </div>

          {/* Quick learning progress note */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
            <p className="font-semibold text-slate-900 mb-1">💡 Pro-Tip for Fast Matching</p>
            Add at least 3 skills you can teach and 3 you want to learn to get 4x more reciprocal match notifications!
          </div>
        </div>

        {/* Right Column (2 cols wide): Recent Activity & Requests */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Recent Swap Activities</h3>
              <p className="text-xs text-slate-500 mt-0.5">Latest exchange proposals and connection milestones</p>
            </div>
            <Link to="/requests" className="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentRequests.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentRequests.map(req => {
                const isIncoming = req.receiver_id === user?.id;
                const partner = isIncoming ? req.sender : req.receiver;

                return (
                  <div key={req.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={partner?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${partner?.id}`}
                        alt={partner?.full_name}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {isIncoming ? `${partner?.full_name} sent you a swap proposal` : `You proposed a swap to ${partner?.full_name}`}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          Offering <span className="font-semibold text-emerald-700">{req.offered_skill}</span> in exchange for <span className="font-semibold text-violet-700">{req.wanted_skill}</span>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        req.status === 'accepted'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : req.status === 'rejected'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {req.status.toUpperCase()}
                      </span>
                      {req.status === 'accepted' && (
                        <Link
                          to="/chat"
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          title="Message Partner"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">No recent swap activity yet</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore students on the platform and propose your first skill exchange!
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700 transition"
              >
                <Compass className="w-3.5 h-3.5" /> Explore Students
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* 4. RECOMMENDED STUDENTS MATCHES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-600" />
              Smart Recommendations for You
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Partners whose skills align with what you want to learn right now
            </p>
          </div>
          <Link to="/explore" className="text-xs font-semibold text-primary-600 hover:underline">
            View all students
          </Link>
        </div>

        {recommendedMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedMatches.map(match => (
              <StudentCard
                key={match.student.id}
                student={match.student}
                matchScore={match.matchScore}
                matchType={match.matchType}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">Finding top matches...</p>
        )}
      </div>

    </div>
  );
}
