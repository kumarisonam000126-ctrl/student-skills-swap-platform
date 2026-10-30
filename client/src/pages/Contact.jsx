import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MessageSquare, 
  Sparkles, 
  MapPin, 
  Clock, 
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General Question',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please complete all required fields.');
      return;
    }

    setLoading(true);

    // Simulate sending inquiry
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('Your message has been received! Our campus coordinators will reply within 24 hours.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'General Question',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700">
          <Mail className="w-3.5 h-3.5" /> Contact Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch With Us
        </h1>
        <p className="text-sm sm:text-base text-slate-500">
          Have an inquiry, university partnership request, or feedback on your skill swapping experience? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Contact Cards */}
        <div className="space-y-4">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Direct Student Email</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Reach out directly for account inquiries, bugs, or feature suggestions.
            </p>
            <p className="text-xs font-bold text-primary-600">support@skillswap.student</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Campus Ambassador Program</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Want to launch a SkillSwap chapter at your college or university?
            </p>
            <p className="text-xs font-bold text-purple-600">chapters@skillswap.student</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Fast Response Times</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our volunteer student council typically replies within 12 to 24 hours.
            </p>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Thank You For Your Message!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                We've received your inquiry and our support team will get back to you shortly at your student email.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-xs hover:bg-primary-700 transition"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Inquiry Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="General Question">General Question</option>
                    <option value="Campus Chapter">Campus Chapter / Ambassador</option>
                    <option value="Bug Report">Technical Bug Report</option>
                    <option value="Skill Suggestion">Skill Catalog Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    placeholder="Brief description..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
