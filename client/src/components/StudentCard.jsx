import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, GraduationCap, ArrowRightLeft, User, Sparkles, BookOpen } from 'lucide-react';
import SkillBadge from './SkillBadge';
import SwapModal from './SwapModal';
import { useAuth } from '../context/AuthContext';

export default function StudentCard({ student, matchScore, matchType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleSwapClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  };

  const isSelf = user?.id === student.id;

  return (
    <>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
        {/* Match Ribbon if present */}
        {matchScore && matchScore > 50 && (
          <div className="absolute top-4 right-4 z-10">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${
              matchScore >= 90
                ? 'bg-emerald-500 text-white animate-soft-pulse'
                : 'bg-primary-100 text-primary-700'
            }`}>
              <Sparkles className="w-3 h-3" /> {matchScore}% Match
            </span>
          </div>
        )}

        <div>
          {/* Header Info */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative shrink-0">
              <img
                src={student.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.id}`}
                alt={student.full_name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-primary-400 transition-all duration-300"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div className="min-w-0 pr-12">
              <Link to={`/profile/${student.id}`} className="hover:text-primary-600 transition-colors">
                <h4 className="text-lg font-bold text-slate-900 truncate">{student.full_name}</h4>
              </Link>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                <GraduationCap className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{student.college}</span>
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[11px] font-medium text-slate-500 px-2 py-0.5 rounded-md bg-slate-100 truncate max-w-[170px]">
                  {student.course}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {student.rating || '5.0'}
                </span>
              </div>
            </div>
          </div>

          {/* Bio snippet */}
          {student.bio && (
            <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
              "{student.bio}"
            </p>
          )}

          {/* Skills Section */}
          <div className="space-y-3 pt-1">
            {/* Can Teach */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Can Teach</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {student.skills?.teach && student.skills.teach.length > 0 ? (
                  student.skills.teach.map((s, idx) => (
                    <SkillBadge key={idx} name={s.name} level={s.level} type="teach" size="sm" />
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No skills listed yet</span>
                )}
              </div>
            </div>

            {/* Wants to Learn */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                <span>Wants to Learn</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {student.skills?.learn && student.skills.learn.length > 0 ? (
                  student.skills.learn.map((s, idx) => (
                    <SkillBadge key={idx} name={s.name} level={s.level} type="learn" size="sm" />
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">Exploring new skills</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center gap-2 pt-5 mt-5 border-t border-slate-100">
          <Link
            to={`/profile/${student.id}`}
            className="flex-1 text-center py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            View Profile
          </Link>
          {!isSelf && (
            <button
              onClick={handleSwapClick}
              className="flex-1 py-2.5 px-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold shadow-sm hover:shadow-md shadow-primary-500/20 flex items-center justify-center gap-1.5 transition transform active:scale-95"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" /> Swap Skills
            </button>
          )}
        </div>
      </div>

      <SwapModal
        student={student}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
