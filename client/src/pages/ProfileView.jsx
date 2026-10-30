import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Star, 
  ArrowRightLeft, 
  MessageSquare, 
  Calendar, 
  Share2, 
  CheckCircle2,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { profileAPI, connectionAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import SkillBadge from '../components/SkillBadge';
import SwapModal from '../components/SwapModal';

export default function ProfileView() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionId, setConnectionId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await profileAPI.getById(id);
        if (res.data.success) {
          setStudent(res.data.profile);
        }

        // Check if currently connected
        if (isAuthenticated) {
          const connRes = await connectionAPI.getMyConnections();
          if (connRes.data.success && connRes.data.connections) {
            const found = connRes.data.connections.find(c => 
              c.user1_id === id || c.user2_id === id
            );
            if (found) {
              setIsConnected(true);
              setConnectionId(found.id);
            }
          }
        }
      } catch (err) {
        toast.error('Student profile not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, isAuthenticated]);

  const isSelf = user?.id === id;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Profile URL copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-medium text-slate-500">Loading student profile...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="max-w-md mx-auto py-20 text-center px-4">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Student Not Found</h3>
        <p className="text-sm text-slate-500 mb-6">This profile could not be retrieved or has been removed.</p>
        <Link to="/explore" className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-xs">
          Back to Student Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Back button */}
      <Link to="/explore" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition">
        <ArrowLeft className="w-4 h-4" /> Back to Explore
      </Link>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm relative overflow-hidden">
        
        {/* Top banner accent */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pt-2">
          
          {/* Avatar & Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative">
              <img
                src={student.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.id}`}
                alt={student.full_name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-slate-100 shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{student.full_name}</h1>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Verified Student
                </span>
              </div>

              <p className="text-sm text-slate-600 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span>{student.college}</span>
              </p>

              <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>{student.course}</span>
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
                <span className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {student.rating || '5.0'} Peer Rating
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Active Member
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-col items-center justify-center gap-3 shrink-0">
            {isSelf ? (
              <Link
                to="/edit-profile"
                className="w-full text-center px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition"
              >
                Edit My Profile
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    if (!isAuthenticated) navigate('/login');
                    else setIsModalOpen(true);
                  }}
                  className="w-full px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition transform active:scale-95"
                >
                  <ArrowRightLeft className="w-4 h-4" /> Propose Skill Swap
                </button>

                {isConnected && (
                  <Link
                    to="/chat"
                    className="w-full text-center px-6 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageSquare className="w-4 h-4" /> Direct Message
                  </Link>
                )}
              </>
            )}

            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Share2 className="w-3.5 h-3.5" /> Share Profile
            </button>
          </div>

        </div>

        {/* About Me Section */}
        {student.bio && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">About Me</h3>
            <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
              {student.bio}
            </p>
          </div>
        )}

      </div>

      {/* Two Column: Teaching Skills vs Learning Desires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: What I Can Teach */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Skills I Can Teach</h3>
              <p className="text-xs text-slate-500">Expertise and topics {student.full_name.split(' ')[0]} offers to coach</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {student.skills?.teach && student.skills.teach.length > 0 ? (
              student.skills.teach.map((s, idx) => (
                <SkillBadge key={idx} name={s.name} level={s.level} type="teach" size="lg" />
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No teaching skills listed yet.</p>
            )}
          </div>
        </div>

        {/* Right Column: What I Want to Learn */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Skills I Want to Learn</h3>
              <p className="text-xs text-slate-500">Topics {student.full_name.split(' ')[0]} is actively studying</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {student.skills?.learn && student.skills.learn.length > 0 ? (
              student.skills.learn.map((s, idx) => (
                <SkillBadge key={idx} name={s.name} level={s.level} type="learn" size="lg" />
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">Open to all technical topics.</p>
            )}
          </div>
        </div>

      </div>

      <SwapModal
        student={student}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}
