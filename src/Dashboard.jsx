// Dashboard.jsx
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaSync } from 'react-icons/fa';
// import Navbar from './Navbar';

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch dashboard data from your Flask backend
//   const fetchDashboardData = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/dashboard', {
//         credentials: 'include'
//       });
//       const data = await response.json();
//       setDashboardData(data);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   // Refresh button handler
//   const handleRefresh = () => {
//     setLoading(true);
//     fetchDashboardData();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center">
//         <p className="text-slate-300">Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (!dashboardData) {
//     return (
//       <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center">
//         <p className="text-slate-300">Error loading dashboard data.</p>
//       </div>
//     );
//   }

//   // ------------------------------
//   // Helper Functions
//   // ------------------------------

//   const getTipsForPHQ9 = (score) => {
//     if (score === null || score === undefined) {
//       return "No recent assessment available. Please complete an assessment to receive personalized tips.";
//     }
//     if (score < 5) {
//       return "Excellent work! Continue your healthy routines and keep up your active lifestyle.";
//     } else if (score < 10) {
//       return "Your mood is fairly stable. Consider incorporating daily mindfulness or light exercise to maintain this balance.";
//     } else if (score < 15) {
//       return "Your score suggests some challenges. Try setting aside time for relaxation, journaling, or meditation.";
//     } else if (score < 20) {
//       return "It appears you are experiencing significant stress. Consider speaking with a trusted friend or professional, and explore stress-management techniques.";
//     } else {
//       return "Your score indicates severe distress. Please consider seeking immediate professional support and engage in self-care practices.";
//     }
//   };

//   // Derive a mood emoji from the PHQ‑9 score
//   const deriveMoodFromScore = (score) => {
//     if (score < 5) return "😊";
//     else if (score < 15) return "😐";
//     else return "😢";
//   };

//   // Generate mood tracker based on the last 7 assessments
//   const generateAssessmentMoodTracker = () => {
//     if (dashboardData.assessments && dashboardData.assessments.length > 0) {
//       // Get the last 7 assessments (oldest first)
//       const lastSeven = dashboardData.assessments.slice(-7);
//       return lastSeven.map(assessment => {
//         const mood =
//           assessment.responses && assessment.responses.mood
//             ? assessment.responses.mood
//             : deriveMoodFromScore(assessment.score);
//         return { date: assessment.date, mood };
//       });
//     }
//     // Fallback default if none exist.
//     const days = [];
//     const today = new Date();
//     for (let i = 0; i < 7; i++) {
//       let date = new Date();
//       date.setDate(today.getDate() - i);
//       const emoji = ["😊", "😐", "😢", "😌"][i % 4];
//       days.push({ date: date.toISOString().split('T')[0], mood: emoji });
//     }
//     return days.reverse();
//   };

//   // Map stress level text to a color class.
//   const getStressLevelColor = (level) => {
//     if (level === "Low") return "text-green-400";
//     if (level === "Moderate") return "text-yellow-400";
//     if (level === "High") return "text-red-400";
//     return "text-slate-400";
//   };

//   // Map assessment score to a color class for the indicator dot.
//   const getScoreColorClass = (score) => {
//     if (score < 5) return "bg-green-500";
//     if (score < 15) return "bg-yellow-500";
//     return "bg-red-500";
//   };

//   // ------------------------------
//   // Compute Dynamic Values
//   // ------------------------------
//   const latestAssessment =
//     dashboardData.assessments && dashboardData.assessments.length > 0
//       ? dashboardData.assessments[dashboardData.assessments.length - 1]
//       : null;
//   const latestScore = latestAssessment ? latestAssessment.score : null;
  
//   let stressLevel = "N/A";
//   if (latestScore !== null && latestScore !== undefined) {
//     if (latestScore < 5) stressLevel = "Low";
//     else if (latestScore < 15) stressLevel = "Moderate";
//     else stressLevel = "High";
//   }

//   const moodData = generateAssessmentMoodTracker();

//   // Combine assessments and predictions for Recent Activities.
//   let recentActivities = [];
//   if (dashboardData.assessments) {
//     recentActivities = recentActivities.concat(
//       dashboardData.assessments.map(item => ({ ...item, type: 'assessment' }))
//     );
//   }
//   if (dashboardData.predictions) {
//     recentActivities = recentActivities.concat(
//       dashboardData.predictions.map(item => ({ ...item, type: 'prediction' }))
//     );
//   }
//   // Sort by full datetime in descending order.
//   recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
//   recentActivities = recentActivities.slice(0, 3);

//   return (
//     <div className="min-h-screen bg-slate-900 pt-20">
//       <Navbar />
      
//       <div className="container mx-auto px-6 py-12">
//         {/* Dashboard Header with Refresh Button */}
//         <div className="flex justify-between items-center mb-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
//               Dashboard
//             </h1>
//           </motion.div>
//           <motion.button 
//             onClick={handleRefresh}
//             whileHover={{ scale: 1.1 }}
//             className="p-2 rounded-full bg-slate-800/50 text-emerald-400 hover:bg-slate-700"
//           >
//             <FaSync className="w-6 h-6" />
//           </motion.button>
//         </div>

//         {/* Mental Health Overview Stats Grid */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-slate-700/50 mb-8 backdrop-blur-lg grid grid-cols-1 md:grid-cols-4 gap-6"
//         >
//           {/* Current Streak */}
//           <div className="bg-slate-800/30 p-6 rounded-xl border border-emerald-400/20">
//             <h3 className="text-emerald-400 mb-2">Current Streak</h3>
//             <p className="text-4xl font-bold text-white">{dashboardData.assessmentCount || 0} Days</p>
//             <span className="text-slate-400 text-sm">Consistent check-ins</span>
//           </div>
//           {/* Latest Stress Level */}
//           <div className="bg-slate-800/30 p-6 rounded-xl border border-cyan-400/20">
//             <h3 className="text-cyan-400 mb-2">Latest Stress Level</h3>
//             <p className={`text-4xl font-bold ${getStressLevelColor(stressLevel)}`}>{stressLevel}</p>
//             <span className="text-slate-400 text-sm">
//               Last assessment: {latestAssessment
//                 ? new Date(latestAssessment.date).toLocaleDateString()
//                 : 'N/A'}
//             </span>
//           </div>
//           {/* PHQ‑9 Score */}
//           <div className="bg-slate-800/30 p-6 rounded-xl border border-purple-400/20">
//             <h3 className="text-purple-400 mb-2">PHQ‑9 Score</h3>
//             <p className="text-4xl font-bold text-white">
//               {latestScore !== null && latestScore !== undefined ? latestScore : "N/A"}
//             </p>
//             <span className="text-slate-400 text-sm">out of 27</span>
//           </div>
//           {/* Latest Model Prediction */}
//           <div className="bg-slate-800/30 p-6 rounded-xl border border-indigo-400/20">
//             <h3 className="text-indigo-400 mb-2">Latest Model Prediction</h3>
//             <p className="text-4xl font-bold text-white">{dashboardData.latestPrediction || "N/A"}</p>
//             <span className="text-slate-400 text-sm">Model-based assessment</span>
//           </div>
//         </motion.div>

//         {/* Upcoming Appointments */}
//         {dashboardData.appointments && dashboardData.appointments.length > 0 && (
//           <div className="mb-8">
//             <h3 className="text-2xl font-bold text-cyan-400 mb-4">Upcoming Appointments</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {dashboardData.appointments.map((appt) => (
//                 <div key={appt.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
//                   <p className="text-slate-300">{new Date(appt.date).toLocaleDateString()}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Tip Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 flex flex-col items-start mb-8"
//         >
//           <h3 className="text-2xl font-bold text-yellow-400 mb-2">Tip for Today</h3>
//           <p className="text-slate-300">{getTipsForPHQ9(latestScore)}</p>
//         </motion.div>

//         {/* Take Assessment Container */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 flex flex-col items-center shadow-lg">
//             <h3 className="text-2xl font-bold text-emerald-400 mb-4">Take Traditional Assessment</h3>
//             <Link to="/assessment">
//               <button className="w-full py-3 px-6 text-lg bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-md hover:from-green-600 hover:to-green-700 transition-all">
//                 Start Assessment →
//               </button>
//             </Link>
//           </div>
//           <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 flex flex-col items-center shadow-lg">
//             <h3 className="text-2xl font-bold text-indigo-400 mb-4">Take Model-based Assessment</h3>
//             <Link to="/sentiment">
//               <button className="w-full py-3 px-6 text-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full shadow-md hover:from-indigo-600 hover:to-blue-600 transition-all">
//                 Start Model Assessment →
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Mood Tracker */}
//         <motion.div 
//           whileHover={{ scale: 1.02 }}
//           className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-400/30 transition-all mb-8"
//         >
//           <h3 className="text-2xl font-bold text-cyan-400 mb-6">Mood Tracker (Last 7 Assessments)</h3>
//           <div className="space-y-2">
//             {moodData.map((entry, i) => (
//               <div key={i} className="flex items-center justify-between p-2 border-b border-slate-700">
//                 <span className="text-sm text-slate-400">{new Date(entry.date).toLocaleDateString()}</span>
//                 <span className="text-2xl">{entry.mood}</span>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Recent Activities */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50"
//         >
//           <h3 className="text-2xl font-bold text-purple-400 mb-6">Recent Activities</h3>
//           <div className="space-y-4">
//             {recentActivities.length > 0 ? (
//               recentActivities.map((activity, index) => (
//                 <div
//                   key={index}
//                   className="p-4 rounded-xl flex flex-col bg-slate-800/30 hover:bg-slate-700/50 transition-all"
//                 >
//                   {activity.type === "assessment" ? (
//                     <>
//                       <div className="flex items-center justify-between">
//                         <h4 className="text-white font-bold">Mental Assessment</h4>
//                         <span className={`w-3 h-3 rounded-full ${getScoreColorClass(activity.score)}`}></span>
//                       </div>
//                       <p className="text-slate-400 text-sm">Score: {activity.score} / 27</p>
//                       <p className="text-slate-400 text-xs">Date: {new Date(activity.date).toLocaleDateString()}</p>
//                     </>
//                   ) : (
//                     <>
//                       <div className="flex items-center justify-between">
//                         <h4 className="text-white font-bold">Model Prediction</h4>
//                       </div>
//                       <p className="text-slate-400 text-sm">Prediction: {activity.prediction}</p>
//                       <p className="text-slate-400 text-xs">Date: {new Date(activity.date).toLocaleDateString()}</p>
//                     </>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div className="text-slate-400">No recent activities available.</div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSync, FaRegSmile, FaRegChartBar, FaHeartbeat, FaBrain } from 'react-icons/fa';
import { GiBrain } from 'react-icons/gi';
import Navbar from './Navbar';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data from your Flask backend
  const fetchDashboardData = async () => {
    try {
      const response = await fetch('https://zenback-3.onrender.com/dashboard', {
        credentials: 'include'
      });
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Refresh button handler
  const handleRefresh = () => {
    setLoading(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center">
        <p className="text-slate-300">Loading dashboard...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center">
        <p className="text-slate-300">Error loading dashboard data.</p>
      </div>
    );
  }

  // ------------------------------
  // Helper Functions
  // ------------------------------

  const getTipsForPHQ9 = (score) => {
    if (score === null || score === undefined) {
      return "No recent assessment available. Please complete an assessment to receive personalized tips.";
    }
    if (score < 5) {
      return "Excellent work! Continue your healthy routines and keep up your active lifestyle.";
    } else if (score < 10) {
      return "Your mood is fairly stable. Consider incorporating daily mindfulness or light exercise to maintain this balance.";
    } else if (score < 15) {
      return "Your score suggests some challenges. Try setting aside time for relaxation, journaling, or meditation.";
    } else if (score < 20) {
      return "It appears you are experiencing significant stress. Consider speaking with a trusted friend or professional, and explore stress-management techniques.";
    } else {
      return "Your score indicates severe distress. Please consider seeking immediate professional support and engage in self-care practices.";
    }
  };

  // Derive a mood emoji from the PHQ‑9 score
  const deriveMoodFromScore = (score) => {
    if (score < 5) return "😊";
    else if (score < 15) return "😐";
    else return "😢";
  };

  // Generate mood tracker based on the last 7 assessments
  const generateAssessmentMoodTracker = () => {
    if (dashboardData.assessments && dashboardData.assessments.length > 0) {
      // Get the last 7 assessments (oldest first)
      const lastSeven = dashboardData.assessments.slice(-7);
      return lastSeven.map(assessment => {
        const mood =
          assessment.responses && assessment.responses.mood
            ? assessment.responses.mood
            : deriveMoodFromScore(assessment.score);
        return { date: assessment.date, mood };
      });
    }
    // Fallback default if none exist.
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(today.getDate() - i);
      const emoji = ["😊", "😐", "😢", "😌"][i % 4];
      days.push({ date: date.toISOString().split('T')[0], mood: emoji });
    }
    return days.reverse();
  };

  // Map stress level text to a color class.
  const getStressLevelColor = (level) => {
    if (level === "Low") return "text-green-400";
    if (level === "Moderate") return "text-yellow-400";
    if (level === "High") return "text-red-400";
    return "text-slate-400";
  };

  // Map assessment score to a color class for the indicator dot.
  const getScoreColorClass = (score) => {
    if (score < 5) return "bg-green-500";
    if (score < 15) return "bg-yellow-500";
    return "bg-red-500";
  };

  // ------------------------------
  // Compute Dynamic Values
  // ------------------------------
  const latestAssessment =
    dashboardData.assessments && dashboardData.assessments.length > 0
      ? dashboardData.assessments[dashboardData.assessments.length - 1]
      : null;
  const latestScore = latestAssessment ? latestAssessment.score : null;
  
  let stressLevel = "N/A";
  if (latestScore !== null && latestScore !== undefined) {
    if (latestScore < 5) stressLevel = "Low";
    else if (latestScore < 15) stressLevel = "Moderate";
    else stressLevel = "High";
  }

  const moodData = generateAssessmentMoodTracker();

  // Combine assessments and predictions for Recent Activities.
  let recentActivities = [];
  if (dashboardData.assessments) {
    recentActivities = recentActivities.concat(
      dashboardData.assessments.map(item => ({ ...item, type: 'assessment' }))
    );
  }
  if (dashboardData.predictions) {
    recentActivities = recentActivities.concat(
      dashboardData.predictions.map(item => ({ ...item, type: 'prediction' }))
    );
  }
  // Sort by full datetime in descending order.
  recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
  recentActivities = recentActivities.slice(0, 3);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Mental Wellness Dashboard
            </h1>
            <p className="text-slate-400 mt-2">Your holistic health overview</p>
          </motion.div>
          <motion.button 
            onClick={handleRefresh}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-cyan-400/40 transition-all"
          >
            <FaSync className="w-6 h-6 text-cyan-400" />
          </motion.button>
        </div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {/* Current Streak */}
          <div className="bg-slate-800/30 p-6 rounded-2xl border border-emerald-400/20 backdrop-blur-sm hover:border-emerald-400/40 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-400/10 rounded-lg">
                <FaHeartbeat className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 mb-1">Current Streak</p>
                <p className="text-3xl font-bold text-white">{dashboardData.assessmentCount || 0} Days</p>
              </div>
            </div>
          </div>

          {/* Stress Level */}
          <div className="bg-slate-800/30 p-6 rounded-2xl border border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-400/10 rounded-lg">
                <GiBrain className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <p className="text-slate-400 mb-1">Stress Level</p>
                <p className={`text-3xl font-bold ${getStressLevelColor(stressLevel)}`}>{stressLevel}</p>
              </div>
            </div>
          </div>

          {/* PHQ-9 Score */}
          <div className="bg-slate-800/30 p-6 rounded-2xl border border-purple-400/20 backdrop-blur-sm hover:border-purple-400/40 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-400/10 rounded-lg">
                <FaRegChartBar className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 mb-1">PHQ-9 Score</p>
                <p className="text-3xl font-bold text-white">
                  {latestScore ?? "N/A"}
                  <span className="text-sm text-slate-400 ml-2">/27</span>
                </p>
              </div>
            </div>
          </div>

          {/* Model Prediction */}
          <div className="bg-slate-800/30 p-6 rounded-2xl border border-indigo-400/20 backdrop-blur-sm hover:border-indigo-400/40 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-400/10 rounded-lg">
                <FaBrain className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <p className="text-slate-400 mb-1">AI Prediction</p>
                <p className="text-3xl font-bold text-white">{dashboardData.latestPrediction || "N/A"}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Assessment Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-gradient-to-br from-emerald-500/10 to-slate-900/50 p-8 rounded-2xl border border-emerald-400/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <FaRegSmile className="w-6 h-6" /> Traditional Assessment
                </h3>
                <p className="text-slate-400 mb-6">Complete the standardized PHQ-9 questionnaire for a detailed analysis.</p>
                <Link to="/assessment">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 px-6 text-lg bg-emerald-500/90 hover:bg-emerald-400 text-white rounded-xl transition-all"
                  >
                    Start Assessment →
                  </motion.button>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/10 to-slate-900/50 p-8 rounded-2xl border border-indigo-400/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
                  <FaBrain className="w-6 h-6" /> AI Assessment
                </h3>
                <p className="text-slate-400 mb-6">Get instant insights using our advanced machine learning model.</p>
                <Link to="/sentiment">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 px-6 text-lg bg-indigo-500/90 hover:bg-indigo-400 text-white rounded-xl transition-all"
                  >
                    Start AI Analysis →
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Mood Timeline */}
            <motion.div 
              className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm"
              whileHover={{ scale: 1.005 }}
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-6">Mood Timeline</h3>
              <div className="flex justify-between items-center gap-4">
                {moodData.map((entry, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className="h-24 bg-gradient-to-t from-cyan-400/10 to-transparent rounded-xl p-2">
                      <span className="text-3xl">{entry.mood}</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">
                      {new Date(entry.date).toLocaleDateString('en', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Personalized Tips */}
            <motion.div 
              className="bg-gradient-to-br from-purple-500/10 to-slate-900/50 p-6 rounded-2xl border border-purple-400/20 backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-xl font-bold text-purple-400 mb-4">Personalized Recommendations</h3>
              <p className="text-slate-300 leading-relaxed">
                {getTipsForPHQ9(latestScore)}
              </p>
            </motion.div>

            {/* Recent Activities */}
            <motion.div 
              className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-semibold ${
                          activity.type === 'assessment' ? 'text-emerald-400' : 'text-indigo-400'
                        }`}>
                          {activity.type === 'assessment' ? 'Assessment' : 'AI Analysis'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                      </div>
                      {activity.type === 'assessment' ? (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Score: {activity.score}</span>
                          <div className={`w-2 h-2 rounded-full ${getScoreColorClass(activity.score)}`} />
                        </div>
                      ) : (
                        <p className="text-slate-300">Prediction: {activity.prediction}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-4">No recent activities</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Appointments Section */}
        {/* Appointments Section */}
{dashboardData.appointments && dashboardData.appointments.length > 0 && (
  <motion.div 
    className="mt-12 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h3 className="text-xl font-bold text-emerald-400 mb-4">Upcoming Appointments</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {dashboardData.appointments.map((appt) => (
        <div key={appt.id} className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/30 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 font-medium">{appt.title}</p>
              <p className="text-slate-400 text-sm">{appt.description}</p>
            </div>
            <p className="text-slate-400 text-sm">
              {new Date(appt.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          {appt.location && (
            <div className="mt-2 flex items-center gap-2 text-slate-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {appt.location}
            </div>
          )}
        </div>
      ))}
    </div>
  </motion.div>
)}
      </div>
    </div>
  );
};

export default Dashboard;
