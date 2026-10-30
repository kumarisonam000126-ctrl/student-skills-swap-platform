import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Plus, 
  X, 
  Save, 
  ArrowLeft, 
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { profileAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    college: user?.college || '',
    course: user?.course || '',
    bio: user?.bio || '',
    avatar_url: user?.avatar_url || ''
  });

  const [teachSkills, setTeachSkills] = useState(user?.skills?.teach || []);
  const [learnSkills, setLearnSkills] = useState(user?.skills?.learn || []);

  const [newTeach, setNewTeach] = useState('');
  const [newTeachLevel, setNewTeachLevel] = useState('Intermediate');
  const [newLearn, setNewLearn] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        college: user.college || '',
        course: user.course || '',
        bio: user.bio || '',
        avatar_url: user.avatar_url || ''
      });
      setTeachSkills(user.skills?.teach || []);
      setLearnSkills(user.skills?.learn || []);
    }
  }, [user]);

  const handleAddTeach = (e) => {
    e.preventDefault();
    if (!newTeach.trim()) return;
    if (teachSkills.some(s => s.name.toLowerCase() === newTeach.trim().toLowerCase())) {
      toast.info('Skill already exists in your teaching list.');
      return;
    }
    setTeachSkills([...teachSkills, { id: `st-${Date.now()}`, name: newTeach.trim(), level: newTeachLevel }]);
    setNewTeach('');
  };

  const handleRemoveTeach = (idx) => {
    setTeachSkills(teachSkills.filter((_, i) => i !== idx));
  };

  const handleAddLearn = (e) => {
    e.preventDefault();
    if (!newLearn.trim()) return;
    if (learnSkills.some(s => s.name.toLowerCase() === newLearn.trim().toLowerCase())) {
      toast.info('Skill already exists in your learning list.');
      return;
    }
    setLearnSkills([...learnSkills, { id: `sl-${Date.now()}`, name: newLearn.trim(), level: 'Beginner' }]);
    setNewLearn('');
  };

  const handleRemoveLearn = (idx) => {
    setLearnSkills(learnSkills.filter((_, i) => i !== idx));
  };

  const generateRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
    setFormData(prev => ({ ...prev, avatar_url: newAvatar }));
    toast.info('New avatar generated!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await profileAPI.updateMe({
        ...formData,
        skills: {
          teach: teachSkills,
          learn: learnSkills
        }
      });

      if (res.data.success) {
        toast.success('Profile and skills updated successfully!');
        updateUser(res.data.profile);
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Navigation */}
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Edit Student Profile</h1>
          <p className="text-sm text-slate-500 mt-1">Keep your technical skills and academic background fresh for optimal partner matching.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/60">
            <img
              src={formData.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`}
              alt="Avatar"
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-sm"
            />
            <div className="space-y-2 text-center sm:text-left flex-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Profile Avatar
              </label>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={generateRandomAvatar}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Randomize Avatar
                </button>
              </div>
              <input
                type="url"
                placeholder="Or paste an image URL..."
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
              />
            </div>
          </div>

          {/* Core Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                College / University
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Degree / Program
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Bio & Study Interests
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              />
            </div>

          </div>

          <div className="border-t border-slate-100 my-6" />

          {/* Dynamic Skills Management */}
          <div className="space-y-6">
            
            {/* Skills You Can Teach */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Skills You Can Teach ({teachSkills.length})
                </label>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3 min-h-[44px] p-2 bg-slate-50 rounded-xl border border-slate-200/60">
                {teachSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold"
                  >
                    {s.name} ({s.level || 'Intermediate'})
                    <button
                      type="button"
                      onClick={() => handleRemoveTeach(idx)}
                      className="text-emerald-600 hover:text-emerald-950"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add New */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Next.js, PyTorch, Figma..."
                  value={newTeach}
                  onChange={(e) => setNewTeach(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTeach(e))}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <select
                  value={newTeachLevel}
                  onChange={(e) => setNewTeachLevel(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddTeach}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>

            {/* Skills You Want to Learn */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-violet-600" />
                  Skills You Want to Learn ({learnSkills.length})
                </label>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3 min-h-[44px] p-2 bg-slate-50 rounded-xl border border-slate-200/60">
                {learnSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-100 text-violet-800 text-xs font-semibold"
                  >
                    {s.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveLearn(idx)}
                      className="text-violet-600 hover:text-violet-950"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add New */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. AWS Cloud, Flutter, GraphQL..."
                  value={newLearn}
                  onChange={(e) => setNewLearn(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLearn(e))}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                  type="button"
                  onClick={handleAddLearn}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>

          </div>

          {/* Action Submit */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md shadow-primary-500/20 flex items-center gap-2 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4" /> Save Profile Changes
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
