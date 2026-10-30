import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';

export default function SkillBadge({ name, level, type = 'teach', size = 'md' }) {
  const isTeach = type === 'teach';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }[size] || 'text-xs px-2.5 py-1 gap-1.5';

  const levelColor = {
    Beginner: 'bg-slate-100 text-slate-600',
    Intermediate: 'bg-blue-100 text-blue-700',
    Advanced: 'bg-emerald-100 text-emerald-700',
    Expert: 'bg-purple-100 text-purple-700',
  }[level] || 'bg-slate-100 text-slate-600';

  return (
    <span
      className={`inline-flex items-center rounded-lg font-medium transition-all duration-200 border ${sizeClasses} ${
        isTeach
          ? 'bg-emerald-50/80 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100/70'
          : 'bg-violet-50/80 text-violet-800 border-violet-200/80 hover:bg-violet-100/70'
      }`}
    >
      {isTeach ? (
        <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
      ) : (
        <BookOpen className="w-3.5 h-3.5 text-violet-600 shrink-0" />
      )}
      <span className="truncate max-w-[140px] sm:max-w-[200px]">{name}</span>
      {level && (
        <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-semibold uppercase tracking-wider ${levelColor}`}>
          {level.slice(0, 3)}
        </span>
      )}
    </span>
  );
}
