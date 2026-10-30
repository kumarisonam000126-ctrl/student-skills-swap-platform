import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  GraduationCap, 
  Sparkles, 
  X, 
  Compass, 
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { profileAPI, matchAPI } from '../services/api';
import StudentCard from '../components/StudentCard';
import { useAuth } from '../context/AuthContext';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated, user } = useAuth();

  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [skillsCatalog, setSkillsCatalog] = useState([]);
  const [matchesMap, setMatchesMap] = useState({});

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCollege, setSelectedCollege] = useState(searchParams.get('college') || 'All');
  const [selectedSkill, setSelectedSkill] = useState(searchParams.get('skill') || 'All');
  const [mutualOnly, setMutualOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load colleges and skills catalogs
  useEffect(() => {
    profileAPI.getColleges()
      .then(res => {
        if (res.data.success) setColleges(res.data.colleges);
      })
      .catch(() => {});

    profileAPI.getSkillsCatalog()
      .then(res => {
        if (res.data.success) setSkillsCatalog(res.data.skills);
      })
      .catch(() => {});
  }, []);

  // Load matches if logged in
  useEffect(() => {
    if (isAuthenticated) {
      matchAPI.getSmartMatches()
        .then(res => {
          if (res.data.success && res.data.matches) {
            const map = {};
            res.data.matches.forEach(m => {
              map[m.student.id] = m;
            });
            setMatchesMap(map);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated, user]);

  // Load students with current filters
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const params = {};
        if (searchQuery.trim()) params.search = searchQuery.trim();
        if (selectedCollege !== 'All') params.college = selectedCollege;
        if (selectedSkill !== 'All') params.skill = selectedSkill;

        const res = await profileAPI.getAll(params);
        if (res.data.success) {
          setStudents(res.data.profiles);
        }
      } catch (err) {
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [searchQuery, selectedCollege, selectedSkill]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCollege('All');
    setSelectedSkill('All');
    setMutualOnly(false);
    setSearchParams({});
  };

  // Filter list with mutual matches if checked
  let displayedStudents = students;
  if (mutualOnly && isAuthenticated) {
    displayedStudents = displayedStudents.filter(s => {
      const match = matchesMap[s.id];
      return match && match.matchScore >= 90;
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 mb-2">
          <Compass className="w-3.5 h-3.5" /> Peer Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Student Partners
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-2xl">
          Discover students ready to swap skills. Match with peers who complement your learning goals.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search by student name, college, degree, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          
          {/* College Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              College / University
            </label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white text-slate-700 outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Universities ({colleges.length})</option>
              {colleges.map((col, idx) => (
                <option key={idx} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Skill Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Filter By Skill
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white text-slate-700 outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Skills</option>
              {skillsCatalog.map((sk) => (
                <option key={sk.id} value={sk.name}>{sk.name}</option>
              ))}
            </select>
          </div>

          {/* Mutual Swap Toggle (if logged in) */}
          <div className="flex flex-col justify-end">
            {isAuthenticated ? (
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                <input
                  type="checkbox"
                  checked={mutualOnly}
                  onChange={(e) => setMutualOnly(e.target.checked)}
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1 truncate">
                  <Sparkles className="w-3.5 h-3.5 text-primary-600" /> Mutual Matches Only
                </span>
              </label>
            ) : (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 truncate">
                Sign in to view match scores
              </div>
            )}
          </div>

          {/* Reset Filters */}
          <div className="flex flex-col justify-end">
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-600 flex items-center justify-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          </div>

        </div>

      </div>

      {/* Results Count & Badges */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <p>Showing <span className="font-bold text-slate-900">{displayedStudents.length}</span> student profiles</p>
      </div>

      {/* Grid of Student Cards */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-500">Finding students...</p>
        </div>
      ) : displayedStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedStudents.map(student => {
            const matchInfo = matchesMap[student.id];
            return (
              <StudentCard
                key={student.id}
                student={student}
                matchScore={matchInfo?.matchScore}
                matchType={matchInfo?.matchType}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No student partners found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn't find any students matching your exact search criteria. Try loosening your filters or resetting the search.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-xs hover:bg-primary-700 transition"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
}
