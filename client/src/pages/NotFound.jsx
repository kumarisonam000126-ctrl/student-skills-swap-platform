import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRightLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404 - Page Not Found</h1>
      <p className="text-sm text-slate-500 mt-2 max-w-sm">
        The student page or resource you are looking for doesn't exist or has moved.
      </p>
      <div className="flex items-center gap-3 mt-6">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-primary-700 transition"
        >
          <Home className="w-4 h-4" /> Go to Homepage
        </Link>
        <Link
          to="/explore"
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition"
        >
          Explore Students
        </Link>
      </div>
    </div>
  );
}
