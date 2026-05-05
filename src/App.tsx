import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  History, 
  PlusCircle, 
  Users, 
  BookOpen, 
  PenTool, 
  Presentation, 
  Star, 
  Medal,
  ChevronRight,
  TrendingUp,
  Award,
  Search,
  CheckCircle2,
  X
} from 'lucide-react';
import { cn } from './lib/utils';
import { 
  Student, 
  AwardHistory, 
  LeagueType, 
  LEAGUE_CONFIG, 
  CATEGORIES 
} from './types';

// API Configuration
const API_BASE = '/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [students, setStudents] = useState<Student[]>([]);
  const [mentees, setMentees] = useState<Student[]>([]);
  const [history, setHistory] = useState<AwardHistory[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial Data Fetch
  const fetchData = async () => {
    try {
      const [sRes, mRes, hRes] = await Promise.all([
        fetch(`${API_BASE}/students`),
        fetch(`${API_BASE}/mentees`),
        fetch(`${API_BASE}/history`)
      ]);
      const [sData, mData, hData] = await Promise.all([
        sRes.json(),
        mRes.json(),
        hRes.json()
      ]);
      setStudents(sData);
      setMentees(mData);
      setHistory(hData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] safe-area-bottom">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 px-8 py-6 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center text-white font-bold text-lg">Z</div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            ZEHNUTH <span className="text-slate-400 font-medium text-sm ml-1 uppercase tracking-widest hidden sm:inline">Achievement</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">Sarah Jenkins</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Mentor</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 p-0.5">
            <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-slate-400 font-black text-xs">SJ</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-24 px-6 max-w-md mx-auto w-full">
        {loading ? (
          <div className="space-y-4 pt-12">
            <div className="h-40 bg-slate-100 animate-pulse rounded-[32px]" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-20 bg-white border border-slate-100 rounded-[24px] animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'leaderboard' && (
              <motion.div key="leaderboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LeaderboardScreen students={students} />
              </motion.div>
            )}
            {activeTab === 'submit' && (
              <motion.div key="submit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SubmitPointScreen mentees={mentees} onRefresh={fetchData} />
              </motion.div>
            )}
            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <HistoryScreen history={history} />
              </motion.div>
            )}
            {activeTab === 'mentees' && (
              <motion.div key="mentees" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <MenteesScreen mentees={mentees} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* FAB - Quick Add */}
      {activeTab !== 'submit' && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setActiveTab('submit')}
          className="fixed bottom-28 right-6 w-14 h-14 rounded-2xl gold-gradient-bg text-white shadow-lg flex items-center justify-center z-50 hover:scale-105 active:scale-95 transition-transform"
        >
          <PlusCircle size={28} />
        </motion.button>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 pb-8 flex items-center justify-between z-40 shadow-[0_-1px_10px_rgba(0,0,0,0.02)] rounded-t-[32px]">
        <NavButton 
          active={activeTab === 'leaderboard'} 
          onClick={() => setActiveTab('leaderboard')} 
          icon={<Trophy size={22} />} 
          label="Leaderboard" 
        />
        <NavButton 
          active={activeTab === 'submit'} 
          onClick={() => setActiveTab('submit')} 
          icon={<PlusCircle size={22} />} 
          label="Submit" 
        />
        <NavButton 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')} 
          icon={<History size={22} />} 
          label="History" 
        />
        <NavButton 
          active={activeTab === 'mentees'} 
          onClick={() => setActiveTab('mentees')} 
          icon={<Users size={22} />} 
          label="Mentees" 
        />
      </nav>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-colors relative",
        active ? "text-amber-600" : "text-slate-400"
      )}
    >
      <div className={cn(
        "p-1 rounded-lg transition-colors",
        active ? "bg-amber-50" : "bg-transparent"
      )}>
        {icon}
      </div>
      <span className="text-[10px] font-medium tracking-wide uppercase">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-pill"
          className="absolute -top-1 w-1 h-1 rounded-full bg-amber-600"
        />
      )}
    </button>
  );
}

function LeagueBadge({ league }: { league: LeagueType }) {
  const config = LEAGUE_CONFIG[league];
  return (
    <div className={cn(
      "px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1 uppercase tracking-widest",
      config.color
    )}>
      <span>{config.icon}</span>
      <span>{league}</span>
    </div>
  );
}

// --- SCREENS ---

function LeaderboardScreen({ students }: { students: Student[] }) {
  const top3 = students.slice(0, 3);
  const others = students.slice(3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-12"
    >
      <div className="flex justify-between items-center px-2">
        <h2 className="text-lg font-bold">Leaderboard</h2>
        <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest border border-amber-100/50">Global League</span>
      </div>

      {/* Podium Section */}
      <div className="flex items-end justify-center gap-4 py-4 mb-4">
        {/* 2nd place */}
        {top3[1] && (
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 mb-2 border-2 border-slate-200 flex items-center justify-center text-slate-400 font-black">
              {top3[1].name.charAt(0)}
            </div>
            <div className="w-20 h-24 bg-slate-50 rounded-t-[20px] flex flex-col items-center justify-start pt-3 border-t border-x border-slate-100">
              <span className="text-2xl font-black text-slate-200">2</span>
            </div>
            <p className="text-[10px] font-bold mt-2 text-slate-500 uppercase tracking-tight">{top3[1].name.split(' ')[0]}</p>
          </div>
        )}

        {/* 1st place */}
        {top3[0] && (
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl animate-bounce">👑</div>
              <div className="w-20 h-20 rounded-full bg-amber-50 mb-2 border-2 border-amber-400 flex items-center justify-center text-amber-500 font-black text-xl shadow-premium">
                {top3[0].name.charAt(0)}
              </div>
            </div>
            <div className="w-24 h-36 bg-amber-50 rounded-t-[24px] border-t border-x border-amber-200 flex flex-col items-center justify-start pt-4">
              <span className="text-4xl font-black text-amber-500">1</span>
              <p className="text-[10px] font-black text-amber-600/40 uppercase mt-4">{top3[0].points} PTS</p>
            </div>
            <p className="text-xs font-black mt-2 uppercase tracking-wide">{top3[0].name.split(' ')[0]}</p>
          </div>
        )}

        {/* 3rd place */}
        {top3[2] && (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-800/5 mb-2 border-2 border-amber-800/10 flex items-center justify-center text-amber-800/30 font-black">
              {top3[2].name.charAt(0)}
            </div>
            <div className="w-20 h-16 bg-amber-800/5 rounded-t-[20px] flex flex-col items-center justify-start pt-3 border-t border-x border-amber-800/10">
              <span className="text-xl font-bold text-amber-800/20">3</span>
            </div>
            <p className="text-[10px] font-bold mt-2 text-slate-500 uppercase tracking-tight">{top3[2].name.split(' ')[0]}</p>
          </div>
        )}
      </div>

      {/* List Section */}
      <div className="space-y-3 pb-8">
        {others.map((student, idx) => (
          <motion.div 
            key={student.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between p-4 rounded-3xl bg-white shadow-premium border border-slate-50"
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-300 w-4">{idx + 4}</span>
              <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-sm">
                {student.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{student.name}</p>
                <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">{student.league} LEAGUE</p>
              </div>
            </div>
            <p className="font-black text-sm text-slate-700">{student.points} pts</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SubmitPointScreen({ mentees, onRefresh }: { mentees: Student[]; onRefresh: () => void }) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedPoints, setSelectedPoints] = useState<number | null>(null);
  const [bonusPoints, setBonusPoints] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!selectedStudent || !selectedCategory) return;
    
    const finalPoints = selectedCategory.isCustom ? parseInt(bonusPoints) : (selectedPoints || 0);
    if (!finalPoints || isNaN(finalPoints)) return;

    setSubmitting(true);
    try {
      await fetch('/api/award', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudent.id,
          category: selectedCategory.id,
          points: finalPoints,
          mentorId: 'm1'
        })
      });
      setShowSuccess(true);
      onRefresh();
    } catch (error) {
      console.error('Submit failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedStudent(null);
    setSelectedCategory(null);
    setSelectedPoints(null);
    setBonusPoints('');
    setShowSuccess(false);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen size={20} />;
      case 'PenTool': return <PenTool size={20} />;
      case 'Presentation': return <Presentation size={20} />;
      case 'Trophy': return <Trophy size={20} />;
      case 'Medal': return <Medal size={20} />;
      case 'Star': return <Star size={20} />;
      default: return <Award size={20} />;
    }
  };

  if (showSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center space-y-8 py-12"
      >
        <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 border-2 border-emerald-100">
          <CheckCircle2 size={48} />
        </div>
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-black text-slate-800">Points Awarded!</h3>
          <p className="text-sm text-slate-400 max-w-[200px] mx-auto leading-relaxed">The achievements have been successfully recorded for {selectedStudent?.name}.</p>
        </div>
        <button 
          onClick={resetForm}
          className="w-full bg-slate-900 text-white rounded-3xl py-5 font-black uppercase text-sm tracking-widest shadow-xl shadow-slate-200"
        >
          Award Another Student
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-10"
    >
      {/* 1. Mentee Selection */}
      <section className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">
          1. Select Mentee
        </label>
        <div className="relative group">
          <select 
            className="w-full p-5 bg-white border border-slate-100 rounded-[28px] text-sm font-bold appearance-none shadow-premium outline-none group-focus-within:border-amber-400 transition-all"
            onChange={(e) => setSelectedStudent(mentees.find(m => m.id === e.target.value) || null)}
            value={selectedStudent?.id || ''}
          >
            <option value="" disabled>Choose a student...</option>
            {mentees.map(m => (
              <option key={m.id} value={m.id}>{m.name} ({m.points} pts)</option>
            ))}
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
            <ChevronRight size={20} className="rotate-90" />
          </div>
        </div>
      </section>

      {/* 2. Category Selection */}
      <motion.section 
        className={cn("space-y-4 transition-opacity duration-500", !selectedStudent && "opacity-30 pointer-events-none")}
      >
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">
          2. Category
        </label>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedPoints(null);
              }}
              className={cn(
                "p-6 rounded-[32px] border flex flex-col items-center justify-center gap-2 transition-all group",
                selectedCategory?.id === cat.id 
                  ? "bg-amber-400 border-amber-400 text-white shadow-xl shadow-amber-200/50 scale-[1.02]" 
                  : "bg-white border-slate-100 text-slate-600 hover:border-amber-100 shadow-premium"
              )}
            >
              <div className={cn(
                "p-3 rounded-2xl transition-colors",
                selectedCategory?.id === cat.id ? "bg-white/20" : "bg-slate-50 group-hover:bg-amber-50"
              )}>
                <span className="text-2xl">{cat.id === 'Exam' ? '📝' : cat.id === 'Writings' ? '✍️' : cat.id === 'Presentation' ? '🗣️' : cat.id === 'Achievements' ? '🏆' : cat.id === 'Competitions' ? '🎯' : '✨'}</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
            </button>
          ))}
        </div>
      </motion.section>

      {/* 3. Point Selection */}
      <motion.section 
        className={cn("space-y-4 transition-all duration-500", !selectedCategory && "opacity-30 pointer-events-none")}
      >
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">
          3. Score Awarded
        </label>
        {selectedCategory?.isCustom ? (
          <div className="p-2">
            <input 
              type="number"
              value={bonusPoints}
              onChange={(e) => setBonusPoints(e.target.value)}
              placeholder="00"
              className="w-full py-8 bg-transparent text-5xl font-black text-center text-amber-500 outline-none placeholder:text-slate-100"
              autoFocus
            />
            <div className="w-12 h-1 bg-amber-100 mx-auto rounded-full" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {selectedCategory?.values.map((v: number) => (
              <button
                key={v}
                onClick={() => setSelectedPoints(v)}
                className={cn(
                  "flex-1 min-w-[70px] py-4 rounded-2xl border font-black text-sm transition-all",
                  selectedPoints === v 
                    ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200 scale-105" 
                    : "bg-white border-slate-100 text-slate-500 shadow-premium"
                )}
              >
                +{v}
              </button>
            ))}
          </div>
        )}
      </motion.section>

      {/* Submit Button */}
      <div className="pt-6 pb-12">
        <button
          disabled={submitting || (!selectedStudent || !selectedCategory || (!selectedPoints && !bonusPoints))}
          onClick={handleSubmit}
          className={cn(
            "w-full py-5 rounded-[28px] font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2",
            submitting || (!selectedStudent || !selectedCategory || (!selectedPoints && !bonusPoints))
              ? "bg-slate-100 text-slate-300 cursor-not-allowed" 
              : "bg-slate-900 text-white hover:scale-[1.02] active:scale-95 shadow-slate-200"
          )}
        >
          {submitting ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full" />
          ) : (
            <>Award Points <span>✨</span></>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function HistoryScreen({ history }: { history: AwardHistory[] }) {
  const totalPoints = history.reduce((acc, curr) => acc + curr.points, 0);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[32px] shadow-premium border border-slate-50 space-y-1">
          <p className="text-3xl font-bold text-slate-900">{totalPoints}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Awarded</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] shadow-premium border border-slate-50 space-y-1">
          <p className="text-3xl font-bold text-slate-900">{history.length}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submissions</p>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-800 px-2 flex items-center gap-2">
        <History size={16} className="text-amber-500" /> Recent Activity
      </h3>

      <div className="space-y-3 pb-8">
        {history.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full mx-auto flex items-center justify-center text-slate-200">
              <History size={40} />
            </div>
            <p className="text-slate-400 font-medium font-sm">No activity recorded yet.</p>
          </div>
        ) : (
          history.map((h, idx) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-6 rounded-[28px] shadow-premium border border-slate-50 flex items-center justify-between"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                  {h.category === 'Exam' && <BookOpen size={24} />}
                  {h.category === 'Writings' && <PenTool size={24} />}
                  {h.category === 'Presentation' && <Presentation size={24} />}
                  {h.category === 'Achievements' && <Trophy size={24} />}
                  {h.category === 'Competitions' && <Medal size={24} />}
                  {h.category === 'Bonus' && <Star size={24} />}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800 leading-none mb-1">{h.studentName}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {h.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-amber-500">+{h.points}</p>
                <p className="text-[10px] text-slate-300 font-bold uppercase">
                  {new Date(h.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function MenteesScreen({ mentees }: { mentees: Student[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="px-2">
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Your Mentees</h2>
        <p className="text-xs text-slate-400 font-medium mt-1">Nurturing excellence through consistent guidance.</p>
      </div>

      <div className="space-y-6 pb-12">
        {mentees.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="premium-card p-8 flex flex-col gap-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[20px] bg-slate-900 border border-slate-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-slate-200">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-black text-slate-800 leading-none mb-2">{m.name}</p>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em]",
                    LEAGUE_CONFIG[m.league].color.split(' ')[0]
                  )}>{m.league} League</span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-100 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Progress</p>
                  <p className="text-sm font-black text-slate-800">{m.points}<span className="text-slate-300 mx-1">/</span>1000</p>
                </div>
                <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (m.points / 1000) * 100)}%` }}
                    className={cn(
                      "h-full rounded-full",
                      m.league === 'Diamond' ? 'bg-blue-500' : 
                      m.league === 'Platinum' ? 'bg-slate-500' :
                      m.league === 'Emerald' ? 'bg-emerald-500' :
                      m.league === 'Gold' ? 'bg-amber-500' : 'bg-orange-500'
                    )}
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <TrendingUp size={16} className="text-emerald-500" />
                  <p className="text-2xl font-black text-slate-800">#{idx + 1}</p>
                </div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Rank</p>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="p-8 rounded-[32px] bg-slate-900 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative z-10">
            <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em] mb-2">Platform Goal</p>
            <h3 className="text-3xl font-black">Elevating Minds</h3>
            <p className="text-[10px] font-medium opacity-60 mt-4 leading-relaxed max-w-[200px]">Empowering the next generation of leaders through merit-based growth.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
