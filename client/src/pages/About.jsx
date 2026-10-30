import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRightLeft, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Code2, 
  Database, 
  Cpu, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'Is the platform really 100% free for students?',
      a: 'Yes, absolutely! The fundamental core principle of SkillSwap is zero monetary exchange. Students pay with their time and knowledge: Student A coaches Student B on React, and in return, Student B guides Student A in Python or Machine Learning.'
    },
    {
      q: 'How does the skill matching algorithm work?',
      a: 'Our smart matching engine analyzes the skills you list in your "Can Teach" portfolio against what other students have listed in their "Want to Learn" wishlist (and vice versa). When two students have mutual complementary needs, the platform flags it as a 95%+ "Mutual Swap Perfect Match".'
    },
    {
      q: 'What if I am only a beginner and feel I have nothing to teach?',
      a: 'Every student knows something valuable! Even if you are just starting in Web Development, you might be proficient in spoken languages, digital marketing, Figma wireframing, or introductory programming syntax. Peer learning works across all difficulty levels.'
    },
    {
      q: 'How do students conduct the actual swap sessions?',
      a: 'Once both students accept a swap request, they connect in real-time chat. From there, you can exchange code snippets, share GitHub repositories, and coordinate video call sessions via Zoom, Google Meet, or Discord.'
    }
  ];

  return (
    <div className="space-y-16 py-10 sm:py-16">
      
      {/* 1. Header Banner */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
          <Sparkles className="w-3.5 h-3.5" /> Our Mission & Vision
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Democratizing Peer Learning <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Across Universities Worldwide
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          SkillSwap was founded on a simple premise: University students possess immense technical talent, 
          yet are constantly held back by expensive subscriptions and isolating tutorial hell.
        </p>
      </section>

      {/* 2. Three Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Zero Monetary Cost</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Knowledge shouldn't be locked behind paywalls. Every swap proposal represents equal, reciprocal value between curious student minds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">True Peer Accountability</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tutorials don't talk back, but peers do. Learning 1-on-1 fosters genuine commitment, mutual review, and real-world project building.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Campus Collaboration</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cross-pollinate ideas across engineering departments, design colleges, and business faculties to form formidable startup teams.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Tech Stack Architecture Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Engineering Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">Built With Industry-Standard Technologies</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Clean, modular, enterprise-grade codebase engineered for rapid scalability and responsive reliability.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <Code2 className="w-7 h-7 text-blue-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">React & Vite</h4>
              <p className="text-[11px] text-slate-400">Blazing fast SPA client with Tailwind CSS styling</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <Cpu className="w-7 h-7 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">Node.js & Express</h4>
              <p className="text-[11px] text-slate-400">Robust RESTful API with smart scoring engine</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <Database className="w-7 h-7 text-purple-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">Supabase PostgreSQL</h4>
              <p className="text-[11px] text-slate-400">Relational schemas, foreign keys & RLS security</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <Heart className="w-7 h-7 text-rose-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">Real-time Messaging</h4>
              <p className="text-[11px] text-slate-400">Direct peer communication and instant swap notifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-500 mt-1">Everything you need to know about swapping skills on campus.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-800 text-sm sm:text-base hover:text-primary-600 transition"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-blue-50 border border-blue-200/60 text-blue-950 space-y-4">
          <h3 className="text-2xl font-bold">Have questions or feedback?</h3>
          <p className="text-xs sm:text-sm text-blue-800 max-w-md mx-auto">
            Our student community team is eager to assist your campus chapter.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs transition shadow-sm"
            >
              Contact Support Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
