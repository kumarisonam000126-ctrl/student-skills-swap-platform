import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRightLeft, 
  Sparkles, 
  GraduationCap, 
  Users, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Star,
  Layers,
  Compass
} from 'lucide-react';
import { statsAPI, profileAPI } from '../services/api';
import StudentCard from '../components/StudentCard';

export default function Home() {
  const [stats, setStats] = useState({
    totalStudents: 125,
    activeExchanges: 89,
    completedSwaps: 68,
    totalSkills: 42,
    satisfactionRate: '99%'
  });
  const [featuredStudents, setFeaturedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    statsAPI.getGlobalStats()
      .then(res => {
        if (res.data.success) setStats(res.data.stats);
      })
      .catch(() => {});

    profileAPI.getAll()
      .then(res => {
        if (res.data.success) {
          setFeaturedStudents(res.data.profiles.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const popularSkills = [
    { name: 'React.js', category: 'Frontend', count: '48 students' },
    { name: 'Python & ML', category: 'Data & AI', count: '52 students' },
    { name: 'UI/UX Design', category: 'Design', count: '39 students' },
    { name: 'Node.js', category: 'Backend', count: '41 students' },
    { name: 'Flutter', category: 'Mobile', count: '29 students' },
    { name: 'Data Structures', category: 'Core CS', count: '60 students' },
    { name: 'Digital Marketing', category: 'Business', count: '24 students' },
    { name: 'Spoken English', category: 'Languages', count: '35 students' }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 lg:pt-20 pb-16">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/20 via-indigo-300/20 to-purple-400/20 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold mb-8 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Zero Tuition Fees • 100% Peer-to-Peer College Skill Swap
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Trade What You Know, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Master What You Don't.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connect with students from top universities to exchange tech, design, and academic skills. 
            No money involved — just pure peer learning and mutual portfolio building.
          </p>

          {/* Interactive Search Bar */}
          <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto">
            <div className="relative flex items-center p-2 rounded-2xl bg-white shadow-xl shadow-blue-500/5 border border-slate-200">
              <Search className="w-5 h-5 text-slate-400 ml-3" />
              <input
                type="text"
                placeholder="Search skills (e.g., React, Python, UI/UX, Flutter)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition transform active:scale-95 shrink-0"
              >
                Find Partner
              </button>
            </div>
          </form>

          {/* CTAs & Social Proof */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-lg shadow-slate-900/10 flex items-center gap-2 transition"
            >
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/explore"
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm transition"
            >
              Explore All Students
            </Link>
          </div>

          {/* Student Avatars Stack */}
          <div className="mt-12 flex items-center justify-center gap-3 text-xs font-medium text-slate-500">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Alex" />
              <img className="w-8 h-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Priya" />
              <img className="w-8 h-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Marcus" />
              <img className="w-8 h-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Zainab" />
            </div>
            <span>Joined by <strong>{stats.totalStudents}+</strong> student peers across top campuses</span>
          </div>

        </div>
      </section>

      {/* 2. STATS COUNTER STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="pt-4 md:pt-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600">{stats.totalStudents}+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Active Students</p>
          </div>
          <div className="pt-4 md:pt-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-purple-600">{stats.activeExchanges}+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Skill Swaps Initiated</p>
          </div>
          <div className="pt-4 md:pt-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">{stats.totalSkills}+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Unique Skills Taught</p>
          </div>
          <div className="pt-4 md:pt-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600">{stats.satisfactionRate}</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Peer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Simple 3-Step Process</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">How Skill Swapping Works</h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Forget expensive bootcamps and solitary tutorials. Learn 1-on-1 with an accountable peer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm relative group hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition">
              01
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">List What You Know & Want</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Create your student profile. Tag the skills you can teach (e.g. React, Figma) and skills you are eager to learn (e.g. Python, Docker).
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm relative group hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition">
              02
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Discover Matching Peers</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our smart match engine finds students who teach what you want, and want what you can teach. Filter by college, course, or tech stack.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm relative group hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition">
              03
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Swap Sessions & Chat</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Send a swap proposal. Once accepted, chat in real-time, coordinate practice sessions, and level up your careers mutually!
            </p>
          </div>

        </div>
      </section>

      {/* 4. POPULAR SKILLS DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">In-Demand Knowledge</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Trending Swap Categories</h2>
          </div>
          <Link to="/explore" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
            Browse all categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularSkills.map((sk, idx) => (
            <Link
              key={idx}
              to={`/explore?skill=${encodeURIComponent(sk.name)}`}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-primary-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {sk.category}
                </span>
                <ArrowRightLeft className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition" />
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition">{sk.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{sk.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. FEATURED STUDENT PROFILES */}
      {featuredStudents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Meet The Community</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Featured Student Partners</h2>
            </div>
            <Link to="/explore" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View all students <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStudents.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </section>
      )}

      {/* 6. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 sm:p-14 text-white shadow-xl">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Our Core Values</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Why College Students Love SkillSwap</h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3">
              We eliminate commercial barriers to education by enabling direct exchange of technical skills and academic mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">100% Free Forever</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                No credit cards, no monthly charges. Your currency is the expertise and enthusiasm you bring to the table.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Verified University Peers</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Collaborate with peers from recognized colleges who understand your academic challenges and career deadlines.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Hands-On Portfolio Proof</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Build real applications, practice code reviews, and prepare for technical interviews together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/20">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Swap Your First Skill?</h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mt-4 mb-8">
            Create your student profile in 60 seconds, list your superpowers, and start learning from fellow university students today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-lg transition transform active:scale-95"
            >
              Join Student Skills Swap
            </Link>
            <Link
              to="/explore"
              className="px-8 py-3.5 rounded-2xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-sm border border-white/20 transition"
            >
              Browse Active Partners
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
