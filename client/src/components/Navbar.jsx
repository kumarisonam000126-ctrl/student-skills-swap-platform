import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowRightLeft, 
  Compass, 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { swapAPI } from '../services/api';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Fetch pending swap count if logged in
  useEffect(() => {
    if (isAuthenticated) {
      swapAPI.getMyRequests()
        .then(res => {
          if (res.data.success && res.data.stats) {
            setPendingCount(res.data.stats.pendingIncoming || 0);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated, location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <ArrowRightLeft className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                Skill<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Swap</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-1">
                Student Exchange
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/explore"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/explore') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4" /> Explore Students
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive('/dashboard') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>

                <Link
                  to="/requests"
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 relative ${
                    isActive('/requests') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <ArrowRightLeft className="w-4 h-4" /> Swaps
                  {pendingCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center animate-bounce">
                      {pendingCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/connections"
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive('/connections') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Users className="w-4 h-4" /> Connections
                </Link>

                <Link
                  to="/chat"
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive('/chat') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" /> Chat
                </Link>
              </>
            )}

            <Link
              to="/about"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/about') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/contact') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
                >
                  <img
                    src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`}
                    alt={user?.full_name}
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-primary-500/20"
                  />
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[100px]">
                      {user?.full_name?.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[100px]">
                      {user?.college?.split(' ')[0] || 'Student'}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.email}</p>
                    </div>

                    <Link
                      to={`/profile/${user?.id}`}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <User className="w-4 h-4 text-slate-400" /> View My Profile
                    </Link>

                    <Link
                      to="/edit-profile"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <Sparkles className="w-4 h-4 text-primary-500" /> Edit Profile & Skills
                    </Link>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 font-medium text-left"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 rounded-xl transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-blue-500/20 transition transform active:scale-95"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {isAuthenticated && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl mb-3">
              <img
                src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`}
                alt={user?.full_name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{user?.full_name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.college}</p>
              </div>
            </div>
          )}

          <Link
            to="/"
            className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
          >
            Explore Students
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                Dashboard
              </Link>
              <Link
                to="/requests"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span>Swap Requests</span>
                {pendingCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </Link>
              <Link
                to="/connections"
                className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                Connections
              </Link>
              <Link
                to="/chat"
                className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                Chat Messages
              </Link>
              <Link
                to={`/profile/${user?.id}`}
                className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                My Profile
              </Link>
              <Link
                to="/edit-profile"
                className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                Edit Profile & Skills
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-base font-semibold text-rose-600 hover:bg-rose-50"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-3 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold shadow-md shadow-primary-500/20"
              >
                Join Free
              </Link>
            </div>
          )}

          <div className="border-t border-slate-100 pt-2 flex gap-4 text-xs text-slate-400 px-3">
            <Link to="/about" className="hover:text-slate-600">About Us</Link>
            <Link to="/contact" className="hover:text-slate-600">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
