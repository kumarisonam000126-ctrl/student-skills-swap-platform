import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRightLeft, 
  User, 
  Mail, 
  Lock, 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Plus, 
  X, 
  Eye, 
  EyeOff,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    course: '',
    bio: ''
  });

  const [teachSkills, setTeachSkills] = useState([
    { name: 'JavaScript', level: 'Advanced' }
  ]);
  const [learnSkills, setLearnSkills] = useState([
    { name: 'React.js', level: 'Beginner' }
  ]);

  const [newTeach, setNewTeach] = useState('');
  const [newTeachLevel, setNewTeachLevel] = useState('Intermediate');
  const [newLearn, setNewLearn] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddTeach = (e) => {
    e.preventDefault();
    if (!newTeach.trim()) return;
    if (teachSkills.some(s => s.name.toLowerCase() === newTeach.trim().toLowerCase())) {
      toast.info('Skill already added to teaching list');
      return;
    }
    setTeachSkills([...teachSkills, { name: newTeach.trim(), level: newTeachLevel }]);
    setNewTeach('');
  };

  const handleRemoveTeach = (idx) => {
    setTeachSkills(teachSkills.filter((_, i) => i !== idx));
  };

  const handleAddLearn = (e) => {
    e.preventDefault();
    if (!newLearn.trim()) return;
    if (learnSkills.some(s => s.name.toLowerCase() === newLearn.trim().toLowerCase())) {
      toast.info('Skill already added to learning list');
      return;
    }
    setLearnSkills([...learnSkills, { name: newLearn.trim(), level: 'Beginner' }]);
    setNewLearn('');
  };

  const handleRemoveLearn = (idx) => {
    setLearnSkills(learnSkills.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.password) {
      setErrorMsg('Please fill in all mandatory fields.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (teachSkills.length === 0) {
      setErrorMsg('Please add at least one skill you can teach/share.');
      return;
    }

    if (learnSkills.length === 0) {
      setErrorMsg('Please add at least one skill you are eager to learn.');
      return;
    }

    setLoading(true);
    const result = await register({
      ...formData,
      skillsTeach: teachSkills,
      skillsLearn: learnSkills
    });

    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(result.message || 'Registration failed.');
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-blue-500/20">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Create Student Profile</h2>
          <p className="text-sm text-slate-500 mt-1">
            Join the student exchange network and start swapping skills peer-to-peer.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Patel"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                College / University Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="e.g. maya@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition"
                />
              </div>
            </div>

            {/* College Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                College / University Name *
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. National Institute of Tech"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition"
                />
              </div>
            </div>

            {/* Course / Major */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Course / Major *
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech Computer Science"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition"
                />
              </div>
            </div>

          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Short Bio & Exchange Goals
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Passionate about web development and looking to learn data science basics..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition resize-none"
            />
          </div>

          <div className="border-t border-slate-100 my-4" />

          {/* SKILLS SECTION */}
          <div className="space-y-6">
            
            {/* 1. Skills you can teach */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Skills You Can Teach / Offer *
                </label>
                <span className="text-xs text-slate-400">Add 1 or more</span>
              </div>

              {/* Added Tags */}
              <div className="flex flex-wrap gap-2 mb-3 min-h-[38px] p-2 bg-slate-50 rounded-xl border border-slate-200/60">
                {teachSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold"
                  >
                    {s.name} ({s.level})
                    <button
                      type="button"
                      onClick={() => handleRemoveTeach(idx)}
                      className="text-emerald-600 hover:text-emerald-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. HTML5, CSS3, JavaScript, Python..."
                  value={newTeach}
                  onChange={(e) => setNewTeach(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTeach(e))}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <select
                  value={newTeachLevel}
                  onChange={(e) => setNewTeachLevel(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddTeach}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>

            {/* 2. Skills you want to learn */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-violet-600" />
                  Skills You Want to Learn *
                </label>
                <span className="text-xs text-slate-400">Add 1 or more</span>
              </div>

              {/* Added Tags */}
              <div className="flex flex-wrap gap-2 mb-3 min-h-[38px] p-2 bg-slate-50 rounded-xl border border-slate-200/60">
                {learnSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-100 text-violet-800 text-xs font-semibold"
                  >
                    {s.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveLearn(idx)}
                      className="text-violet-600 hover:text-violet-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. React.js, Machine Learning, UI Design, Docker..."
                  value={newLearn}
                  onChange={(e) => setNewLearn(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLearn(e))}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddLearn}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition transform active:scale-98 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Complete Registration <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-xs text-slate-500 pt-2">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:underline">
              Log in here
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}
