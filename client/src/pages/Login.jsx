import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowRightLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  X,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authAPI } from '../services/api';

export default function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Forgot password modal
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const res = await login(email.trim(), password);
    setLoading(false);

    if (res.success) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } else {
      setErrorMsg(res.message || 'Login failed.');
    }
  };

  const handleQuickDemo = async (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setLoading(true);
    const res = await login(demoEmail, demoPass);
    setLoading(false);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      toast.error('Please enter your email.');
      return;
    }

    setForgotLoading(true);
    try {
      const res = await authAPI.forgotPassword(forgotEmail.trim());
      toast.success(res.data.message || 'Password reset instructions sent!');
      setForgotModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to request reset.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 px-4 max-w-md mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-blue-500/20">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to manage your swaps and chat with study partners.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              College Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="name@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setForgotModalOpen(true);
                }}
                className="text-xs font-semibold text-primary-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition transform active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Login Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
            Quick 1-Click Demo Profiles
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('alex.rivera@stanford.edu', 'Password123!')}
              className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/60 text-left transition text-xs group"
            >
              <div className="font-bold text-blue-900 group-hover:text-blue-700 truncate">Alex Rivera</div>
              <div className="text-[10px] text-blue-600 truncate">React & UI Expert</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('priya.sharma@mit.edu', 'Password123!')}
              className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100/60 text-left transition text-xs group"
            >
              <div className="font-bold text-purple-900 group-hover:text-purple-700 truncate">Priya Sharma</div>
              <div className="text-[10px] text-purple-600 truncate">Python & ML Researcher</div>
            </button>
          </div>
        </div>

        {/* Register Link */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-primary-600 hover:underline">
            Register for Free
          </Link>
        </p>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setForgotModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Reset Your Password</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
              Enter your student email and we'll send you a password recovery link.
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                required
                placeholder="name@college.edu"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <button
                type="submit"
                disabled={forgotLoading}
                className="w-full py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs transition disabled:opacity-50"
              >
                {forgotLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
