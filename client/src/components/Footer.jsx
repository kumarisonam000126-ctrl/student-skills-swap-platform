import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, Heart, Github, Mail, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Skill<span className="text-blue-400">Swap</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier zero-cost peer learning exchange for university students. 
              Swap your expertise, build real-world portfolios, and accelerate your tech career together.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-semibold border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Free Peer Learning
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/explore" className="hover:text-white transition">Explore Students</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">Student Dashboard</Link>
              </li>
              <li>
                <Link to="/requests" className="hover:text-white transition">Swap Requests</Link>
              </li>
              <li>
                <Link to="/connections" className="hover:text-white transition">My Connections</Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-white transition">Peer Chat</Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Trending Skills</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/explore?skill=React.js" className="hover:text-white transition">React & Frontend</Link></li>
              <li><Link to="/explore?skill=Python" className="hover:text-white transition">Python & Machine Learning</Link></li>
              <li><Link to="/explore?skill=UI/UX" className="hover:text-white transition">UI/UX Design (Figma)</Link></li>
              <li><Link to="/explore?skill=Node.js" className="hover:text-white transition">Node.js & Backend</Link></li>
              <li><Link to="/explore?skill=Flutter" className="hover:text-white transition">Flutter Mobile Apps</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">Contact & Support</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition">Join as Student</Link>
              </li>
              <li>
                <a 
                  href="https://github.com/kumarisonam000126-ctrl/student-skills-swap-platform" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" /> GitHub Repository
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SkillSwap Platform. Built for student community empowerment.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for university learners worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
