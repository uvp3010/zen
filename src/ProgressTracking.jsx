import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { 
  FaMedal, 
  FaClipboardList, 
  FaChartLine, 
  FaTrophy, 
  FaRegSadTear,
  FaCalendarAlt,
  FaChartBar
} from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressTracking = () => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProgressData = async () => {
    try {
      const response = await fetch('http://localhost:5000/progress-tracking', {
        credentials: 'include'
      });
      const data = await response.json();
      setProgressData(data);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  const getProgressColor = (score) => {
    const hue = ((1 - (score / 27)) * 120).toString();
    return `hsl(${hue}, 70%, 50%)`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full"
        />
      </div>
    );
  }

  if (!progressData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20 flex items-center justify-center">
        <p className="text-slate-300">Error loading progress data.</p>
      </div>
    );
  }

  const { totalAssessments, averageScore, bestScore, worstScore, timeline, badges } = progressData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20 overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Cosmic Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="mb-16 text-center relative"
        >
          <div className="inline-block bg-gradient-to-br from-slate-800/60 to-slate-900/80 px-12 py-8 rounded-3xl border border-slate-700/50 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 left-1/2 -translate-x-1/2"
            >
              <GiProgression className="text-6xl text-cyan-400/80 drop-shadow-xl" />
            </motion.div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-3 mt-6 tracking-tighter">
              Progress Nexus
            </h1>
            <p className="text-slate-300/80 text-lg font-medium max-w-2xl mx-auto">
              Navigate your growth journey with precision. Lower scores indicate mastery – aim for the stars! 🌠
            </p>
          </div>
        </motion.div>

        {/* Floating Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: FaClipboardList, title: "Total Assessments", value: totalAssessments, color: "emerald" },
            { icon: FaChartLine, title: "Average Score", value: averageScore.toFixed(1), color: "cyan" },
            { icon: FaTrophy, title: "Best Score", value: bestScore, color: "green" },
            { icon: FaRegSadTear, title: "Worst Score", value: worstScore, color: "rose" }
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group bg-gradient-to-br from-slate-800/60 to-slate-900/80 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-lg hover:border-cyan-400/30 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center space-x-5">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className={`p-4 rounded-xl bg-gradient-to-br from-${metric.color}-500/20 to-${metric.color}-600/20 shadow-inner`}
                >
                  <metric.icon className={`text-3xl text-${metric.color}-400`} />
                </motion.div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400/90 mb-1">{metric.title}</h3>
                  <p className="text-4xl font-black text-white tracking-tight">{metric.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Timeline Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-lg shadow-2xl shadow-cyan-500/10 mb-20"
        >
          <div className="absolute top-0 left-8 -translate-y-1/2 bg-slate-900 px-4 py-2 rounded-full border border-slate-700/50 flex items-center space-x-3">
            <FaCalendarAlt className="text-xl text-cyan-400/80" />
            <span className="text-sm font-medium text-cyan-300/90">Progress Evolution</span>
          </div>
          
          <div className="h-64 mt-6">
            {timeline.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeline}>
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#94a3b8' }}
                    tickFormatter={(str) => new Date(str).toLocaleDateString()}
                  />
                  <YAxis tick={{ fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{ 
                      background: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={{ fill: '#22d3ee', r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="mb-6 text-slate-500"
                >
                  <FaChartBar className="text-5xl opacity-50" />
                </motion.div>
                <p className="text-slate-400/90 font-medium">Your progress canvas is empty</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Achievements Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-lg shadow-2xl shadow-purple-500/10"
        >
          <div className="absolute top-0 left-8 -translate-y-1/2 bg-slate-900 px-4 py-2 rounded-full border border-slate-700/50 flex items-center space-x-3">
            <FaMedal className="text-xl text-amber-400/80" />
            <span className="text-sm font-medium text-amber-300/90">Achievements Hall</span>
          </div>

          {badges?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, rotate: 3 }}
                  className="relative bg-gradient-to-br from-purple-600/20 to-pink-500/20 p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
                  <div className="relative flex flex-col items-center space-y-4">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="p-4 rounded-2xl bg-gradient-to-br from-amber-400/10 to-yellow-500/10 shadow-inner"
                    >
                      <FaMedal className="text-4xl text-amber-400/90" />
                    </motion.div>
                    <span className="text-center font-medium text-slate-200/90">{badge}</span>
                    <div className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                      UNLOCKED 🎉
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block transform rotate-12"
              >
                <FaRegSadTear className="text-6xl text-slate-500/50 mb-6" />
              </motion.div>
              <p className="text-slate-400/90 font-medium">No trophies in your showcase yet</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <Link to="/Task">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl shadow-2xl shadow-cyan-500/20 font-bold text-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center space-x-3">
                  <span>Continue Learning Journey</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 animate-pulse" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressTracking;
