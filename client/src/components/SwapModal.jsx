import React, { useState } from 'react';
import { X, ArrowRightLeft, Sparkles, Send, GraduationCap } from 'lucide-react';
import { swapAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

export default function SwapModal({ student, isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const toast = useToast();

  const [offeredSkill, setOfferedSkill] = useState('');
  const [wantedSkill, setWantedSkill] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !student) return null;

  const myTeachSkills = user?.skills?.teach || [];
  const studentTeachSkills = student?.skills?.teach || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!offeredSkill) {
      toast.error('Please select or specify a skill you can teach.');
      return;
    }
    if (!wantedSkill) {
      toast.error('Please select or specify the skill you wish to learn.');
      return;
    }

    setLoading(true);
    try {
      const res = await swapAPI.sendRequest({
        receiver_id: student.id,
        offered_skill: offeredSkill,
        wanted_skill: wantedSkill,
        message: message.trim() || `Hi ${student.full_name}, I would love to swap skills with you!`
      });

      if (res.data.success) {
        toast.success(`Swap request sent to ${student.full_name}!`);
        // Trigger celebratory confetti
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
        if (onSuccess) onSuccess(res.data.request);
        onClose();
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send swap request.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={student.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.id}`}
            alt={student.full_name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-100"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 mb-1">
              <ArrowRightLeft className="w-3 h-3" /> Skill Exchange Proposal
            </div>
            <h3 className="text-xl font-bold text-slate-900">Swap with {student.full_name}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> {student.college}
            </p>
          </div>
        </div>

        {/* Swap Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Skill you offer */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Skill You Can Teach / Offer
            </label>
            {myTeachSkills.length > 0 ? (
              <select
                value={offeredSkill}
                onChange={(e) => setOfferedSkill(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              >
                <option value="">-- Choose from your teaching skills --</option>
                {myTeachSkills.map((s, idx) => (
                  <option key={idx} value={s.name}>
                    {s.name} ({s.level || 'Intermediate'})
                  </option>
                ))}
              </select>
            ) : null}
            <input
              type="text"
              placeholder={myTeachSkills.length > 0 ? "Or type a custom skill you offer..." : "e.g., React.js, Python, UI Design"}
              value={offeredSkill}
              onChange={(e) => setOfferedSkill(e.target.value)}
              className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Skill you want */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Skill You Want to Learn from {student.full_name.split(' ')[0]}
            </label>
            {studentTeachSkills.length > 0 ? (
              <select
                value={wantedSkill}
                onChange={(e) => setWantedSkill(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              >
                <option value="">-- Choose what they can teach --</option>
                {studentTeachSkills.map((s, idx) => (
                  <option key={idx} value={s.name}>
                    {s.name} ({s.level || 'Expert'})
                  </option>
                ))}
              </select>
            ) : null}
            <input
              type="text"
              placeholder={studentTeachSkills.length > 0 ? "Or type what you want to learn..." : "e.g., Machine Learning, Flutter"}
              value={wantedSkill}
              onChange={(e) => setWantedSkill(e.target.value)}
              className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Introduction & Mutual Goal Message
            </label>
            <textarea
              rows={3}
              placeholder="Hi! I'd love to pair up. Let's exchange sessions weekly to practice projects together..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Swap Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
