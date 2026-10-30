import React from 'react';

export default function StatCard({ title, value, icon: Icon, trend, color = 'blue' }) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 text-blue-600',
      border: 'hover:border-blue-300',
      glow: 'from-blue-600/10 to-indigo-600/5'
    },
    purple: {
      bg: 'bg-purple-50 text-purple-600',
      border: 'hover:border-purple-300',
      glow: 'from-purple-600/10 to-pink-600/5'
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600',
      border: 'hover:border-emerald-300',
      glow: 'from-emerald-600/10 to-teal-600/5'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600',
      border: 'hover:border-amber-300',
      glow: 'from-amber-600/10 to-orange-600/5'
    }
  }[color] || {
    bg: 'bg-blue-50 text-blue-600',
    border: 'hover:border-blue-300',
    glow: 'from-blue-600/10 to-indigo-600/5'
  };

  return (
    <div className={`relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-md ${colorMap.border} group`}>
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorMap.glow} rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-500`} />
      
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
          {trend && (
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <span className="text-emerald-600 font-semibold">{trend}</span>
            </p>
          )}
        </div>
        <div className={`p-3.5 rounded-xl ${colorMap.bg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
