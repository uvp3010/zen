
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
// import MindfulBreathing from "./MindfulBreathing";
// import GratitudeJournaling from "./GratitudeJournaling";
// import ProgressiveMuscleRelaxation from "./ProgressiveMuscleRelaxation";
// import Badge from "./Badge";
// import { 
//   FaLeaf, 
//   FaBookOpen, 
//   FaSpa, 
//   FaCheckCircle, 
//   FaArrowLeft,
//   FaArrowRight,  // Added FaArrowRight here
//   FaTrophy,
//   FaChartLine
// } from "react-icons/fa";

// import { GiSpiralBottle } from "react-icons/gi";

// const Task = () => {
//    // State to store tasks fetched from the backend
//    const [tasks, setTasks] = useState([]);
//    // State to store the currently active task (for the overlay)
//    const [activeTask, setActiveTask] = useState(null);
 
//    // Fetch tasks from the backend on component mount
//    useEffect(() => {
//      fetch("http://localhost:5000/tasks", {
//        credentials: "include",
//      })
//        .then((res) => {
//          if (!res.ok) {
//            throw new Error(`HTTP error! status: ${res.status}`);
//          }
//          return res.json();
//        })
//        .then((data) => {
//          // Ensure data.tasks is defined and is an array before updating state.
//          if (data && Array.isArray(data.tasks)) {
//            setTasks(data.tasks);
//          } else {
//            setTasks([]); // Fallback to an empty array.
//          }
//        })
//        .catch((error) => {
//          console.error("Error fetching tasks:", error);
//          setTasks([]); // Prevent further errors.
//        });
//    }, []);
 
//    // Open the selected task overlay
//    const openTask = (task) => {
//      console.log("Opening task:", task);
//      setActiveTask(task);
//    };
 
//    // Mark the active task as complete, update backend, and then update local state
//    const completeTask = () => {
//      if (activeTask && !activeTask.completed) {
//        // Remove any trailing space from the URL!
//        fetch("http://127.0.0.1:5000/complete-task", {
//          method: "POST",
//          credentials: "include",
//          headers: {
//            "Content-Type": "application/json",
//          },
//          // Note: Use "taskId" as the key per our backend configuration.
//          body: JSON.stringify({ taskId: activeTask.id }),
//        })
//          .then((res) => res.json())
//          .then((data) => {
//            // Once confirmed by backend, update the tasks state to mark the task as completed.
//            setTasks(
//              tasks.map((t) =>
//                t.id === activeTask.id ? { ...t, completed: true } : t
//              )
//            );
//            setActiveTask(null);
//          })
//          .catch((error) => {
//            console.error("Error completing task:", error);
//          });
//      } else {
//        setActiveTask(null);
//      }
//    };
 
//    // Determine if all tasks have been completed
//    const allCompleted =
//      tasks.length > 0 && tasks.every((task) => task.completed);

//   return (
//     <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
//       <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         {/* Enhanced Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
//             Wellness Journey
//           </h1>
//           <p className="text-xl text-slate-300 max-w-2xl mx-auto">
//             Follow your personalized path to mental wellness. Complete activities to unlock achievements and track your progress.
//           </p>
//         </motion.div>

//         {/* Timeline Container */}
//         <div className="relative">
//           {/* Decorative Timeline */}
//           <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-emerald-400/20 to-transparent transform -translate-x-1/2" />
//           <div className="absolute left-1/2 top-0 w-4 h-4 bg-emerald-400 rounded-full transform -translate-x-1/2 -translate-y-2" />

//           <div className="space-y-24 relative">
//             {tasks.map((task, index) => {
//               const isLeft = index % 2 === 0;
//               const Icon = {
//                 mindfulBreathing: FaLeaf,
//                 gratitudeJournaling: FaBookOpen,
//                 pmr: GiSpiralBottle
//               }[task.type] || FaSpa;

//               return (
//                 <motion.div
//                   key={task.id}
//                   initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true, margin: "0px 0px -100px 0px" }}
//                   transition={{ duration: 0.6, ease: "easeOut" }}
//                   className={`relative w-full flex ${isLeft ? "justify-start pr-8" : "justify-end pl-8"}`}
//                 >
//                   <div className="w-full max-w-md relative group">
//                     {/* Timeline Connector */}
//                     <div className={`absolute top-1/2 ${isLeft ? "right-full" : "left-full"} transform -translate-y-1/2`}>
//                       <div className="w-8 h-8 bg-emerald-400/10 rounded-full flex items-center justify-center">
//                         <Icon className="text-emerald-400 text-lg" />
//                       </div>
//                     </div>

//                     {/* Task Card */}
//                     <div className={`relative bg-gradient-to-br ${task.completed ? 'from-emerald-400/10 to-emerald-600/10' : 'from-slate-800/50 to-slate-900/50'} p-6 rounded-2xl border border-slate-700/30 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30`}>
//                       <div className="flex items-start space-x-4">
//                         <div className={`p-3 rounded-lg ${task.completed ? 'bg-emerald-400/20' : 'bg-slate-700/30'}`}>
//                           <Icon className={`text-2xl ${task.completed ? 'text-emerald-400' : 'text-slate-400'}`} />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="text-2xl font-semibold mb-2">{task.title}</h3>
//                           <p className="text-slate-300 mb-4">{task.description}</p>
//                           {task.completed ? (
//                             <div className="inline-flex items-center text-emerald-400 space-x-2">
//                               <FaCheckCircle />
//                               <span>Completed</span>
//                             </div>
//                           ) : (
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => openTask(task)}
//                               className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 rounded-xl font-semibold flex items-center space-x-2"
//                             >
//                               <span>Begin Practice</span>
//                               <FaArrowRight className="text-lg" />
//                             </motion.button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}

//             {/* Achievement Section */}
//             {allCompleted && (
//               <motion.div
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 100 }}
//                 className="flex flex-col items-center mt-24 text-center"
//               >
//                 <div className="relative mb-8">
//                   <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full" />
//                   <FaTrophy className="text-6xl text-emerald-400 mb-6 relative" />
//                 </div>
//                 <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
//                   Journey Complete!
//                 </h3>
//                 <p className="text-xl text-slate-300 mb-8 max-w-2xl">
//                   You've mastered your wellness practices and earned the ultimate recognition of your dedication.
//                 </p>
//                 <Badge text="Wellness Master" className="scale-125" />
//                 <div className="mt-8 animate-pulse">
//                   <span className="text-emerald-400">✨ Congratulations! ✨</span>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Task Overlay */}
//       <AnimatePresence>
//         {activeTask && (
//           <motion.div
//             key="overlay"
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 20, stiffness: 100 }}
//             className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-50 flex justify-end"
//           >
//             <div className="w-full max-w-2xl h-full bg-gradient-to-br from-slate-900 to-slate-800 p-8 overflow-y-auto relative">
//               <button
//                 onClick={() => setActiveTask(null)}
//                 className="group mb-8 flex items-center text-slate-300 hover:text-emerald-400 transition-colors"
//               >
//                 <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
//                 Return to Journey
//               </button>

//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="space-y-8"
//               >
//                 <div className="mb-8">
//                   <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
//                     {activeTask.title}
//                   </h2>
//                   <p className="text-slate-300 text-lg">{activeTask.description}</p>
//                 </div>

//                 {/* Task Content */}
//                 <div className="space-y-8">
//                   {activeTask.type === "mindfulBreathing" ? (
//                     <MindfulBreathing />
//                   ) : activeTask.type === "gratitudeJournaling" ? (
//                     <GratitudeJournaling />
//                   ) : activeTask.type === "pmr" ? (
//                     <ProgressiveMuscleRelaxation onComplete={completeTask} />
//                   ) : (
//                     <div className="space-y-6">
//                       <textarea
//                         className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
//                         placeholder="Share your reflections..."
//                         rows="5"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {activeTask.type !== "pmr" && (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={completeTask}
//                     className="w-full py-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 rounded-xl font-bold text-lg flex items-center justify-center space-x-2"
//                   >
//                     <FaCheckCircle className="text-xl" />
//                     <span>Complete Activity</span>
//                   </motion.button>
//                 )}
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Floating Progress Button */}
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="fixed bottom-8 right-8"
//       >
//         <Link
//           to="/progress-tracking"
//           className="px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-full shadow-2xl flex items-center space-x-2"
//         >
//           <FaChartLine />
//           <span>View Progress</span>
//         </Link>
//       </motion.div>
//     </div>
//   );
// };


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import MindfulBreathing from "./MindfulBreathing";
import GratitudeJournaling from "./GratitudeJournaling";
import ProgressiveMuscleRelaxation from "./ProgressiveMuscleRelaxation";
import Badge from "./Badge";

// New dedicated task components
import Affirmation from "./Affirmation";
import SocialConnection from "./SocialConnection";
import NatureWalk from "./NatureWalk";
import GuidedMeditation from "./GuidedMeditation";
import ArtTherapy from "./ArtTherapy";
import CognitiveRestructuring from "./CognitiveRestructuring";
import PhysicalActivity from "./PhysicalActivity";

import { 
  FaLeaf, 
  FaBookOpen, 
  FaSpa, 
  FaCheckCircle, 
  FaArrowLeft,
  FaArrowRight,
  FaTrophy,
  FaChartLine,
  FaSmile,
  FaComments,
  FaTree,
  FaPalette,
  FaBrain,
  FaRunning
} from "react-icons/fa";
import { GiSpiralBottle, GiMeditation } from "react-icons/gi";

// Updated color scheme mapping for each task type
const taskTypeColors = {
  mindfulBreathing: { primary: '#0ea5e9', secondary: '#0369a1' },
  gratitudeJournaling: { primary: '#8b5cf6', secondary: '#6d28d9' },
  pmr: { primary: '#f59e0b', secondary: '#d97706' },
  affirmation: { primary: '#f472b6', secondary: '#ec4899' },
  socialConnection: { primary: '#34d399', secondary: '#10b981' },
  natureWalk: { primary: '#4ade80', secondary: '#22c55e' },
  guidedMeditation: { primary: '#60a5fa', secondary: '#3b82f6' },
  artTherapy: { primary: '#a78bfa', secondary: '#8b5cf6' },
  cognitiveRestructuring: { primary: '#f87171', secondary: '#ef4444' },
  physicalActivity: { primary: '#f97316', secondary: '#ea580c' }
};

// Fallback colors if task type not found
const fallbackColors = { primary: '#6b7280', secondary: '#4b5563' };

// Updated icon mapping for new and existing task types
const iconMapping = {
  mindfulBreathing: FaLeaf,
  gratitudeJournaling: FaBookOpen,
  pmr: GiSpiralBottle,
  affirmation: FaSmile,
  socialConnection: FaComments,
  natureWalk: FaTree,
  guidedMeditation: GiMeditation,
  artTherapy: FaPalette,
  cognitiveRestructuring: FaBrain,
  physicalActivity: FaRunning
};

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  // Fetch tasks from the backend on mount
  useEffect(() => {
    fetch("https://zenback-3.onrender.com/tasks", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          setTasks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      });
  }, []);

  // Open the selected task overlay
  const openTask = (task) => {
    setActiveTask(task);
  };

  // Mark the active task as complete, update backend, and update local state
  const completeTask = () => {
    if (activeTask && !activeTask.completed) {
      fetch("https://zenback-3.onrender.com/complete-task", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: activeTask.id }),
      })
        .then((res) => res.json())
        .then(() => {
          setTasks(tasks.map((t) => (t.id === activeTask.id ? { ...t, completed: true } : t)));
          setActiveTask(null);
        })
        .catch((error) => {
          console.error("Error completing task:", error);
        });
    } else {
      setActiveTask(null);
    }
  };

  // Check if all tasks have been completed
  const allCompleted = tasks.length > 0 && tasks.every((task) => task.completed);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Wellness Journey
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Follow your personalized path to mental wellness. Complete activities to unlock achievements and track your progress.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-emerald-400/20 to-transparent transform -translate-x-1/2" />
          <div className="absolute left-1/2 top-0 w-4 h-4 bg-emerald-400 rounded-full transform -translate-x-1/2 -translate-y-2" />

          <div className="space-y-24 relative">
            {tasks.map((task, index) => {
              const colors = taskTypeColors[task.type] || fallbackColors;
              const isLeft = index % 2 === 0;
              const Icon = iconMapping[task.type] || FaSpa;
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`relative w-full flex ${isLeft ? "justify-start pr-8" : "justify-end pl-8"}`}
                >
                  <div className="w-full max-w-md relative group">
                    {/* Timeline Dot */}
                    <div className={`absolute top-1/2 ${isLeft ? "right-full" : "left-full"} transform -translate-y-1/2`}>
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: colors.primary }}
                      >
                        <div className="w-3 h-3 rounded-full bg-white" />
                      </div>
                    </div>
                    {/* Task Card */}
                    <div className={`relative p-6 rounded-2xl border shadow-2xl ${
                      task.completed 
                        ? 'bg-slate-800/30 border-slate-700/50' 
                        : `bg-gradient-to-br ${colors.primary}/20 to-slate-900/50 border-slate-700/30`
                    }`}>
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${task.completed ? 'bg-emerald-400/20' : 'bg-slate-700/30'}`}>
                          <Icon className={`text-2xl ${task.completed ? 'text-emerald-400' : 'text-slate-400'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold mb-2">{task.title}</h3>
                          <p className="text-slate-300 mb-4">{task.description}</p>
                          {task.completed ? (
                            <div className="inline-flex items-center text-emerald-400 space-x-2">
                              <FaCheckCircle />
                              <span>Completed</span>
                            </div>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openTask(task)}
                              className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 rounded-xl font-semibold flex items-center space-x-2"
                            >
                              <span>Begin Practice</span>
                              <FaArrowRight className="text-lg" />
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Achievement Section */}
            {allCompleted && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="flex flex-col items-center mt-24 text-center"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full" />
                  <FaTrophy className="text-6xl text-emerald-400 mb-6 relative" />
                </div>
                <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Journey Complete!
                </h3>
                <p className="text-xl text-slate-300 mb-8 max-w-2xl">
                  You've mastered your wellness practices and earned the ultimate recognition of your dedication.
                </p>
                <Badge text="Wellness Master" className="scale-125" />
                <div className="mt-8 animate-pulse">
                  <span className="text-emerald-400">✨ Congratulations! ✨</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Task Overlay */}
      <AnimatePresence>
  {activeTask && (
    <motion.div
      key="overlay"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-50 flex justify-end"
    >
      <div 
        className="w-full md:w-3/4 lg:w-2/3 h-full p-8 overflow-y-auto"
        style={{ background: `linear-gradient(45deg, ${(taskTypeColors[activeTask.type] || fallbackColors).primary}15, ${(taskTypeColors[activeTask.type] || fallbackColors).secondary}15)` }}
      >
        <button
          onClick={() => setActiveTask(null)}
          className="group mb-8 flex items-center text-slate-300 hover:text-emerald-400 transition-colors"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Return to Journey
        </button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              {activeTask.title}
            </h2>
            <p className="text-slate-300 text-lg">{activeTask.description}</p>
          </div>

          {/* Render the dedicated component based on task type */}
          <div className="space-y-8">
            {activeTask.type === "mindfulBreathing" ? (
              <MindfulBreathing />
            ) : activeTask.type === "gratitudeJournaling" ? (
              <GratitudeJournaling />
            ) : activeTask.type === "pmr" ? (
              <ProgressiveMuscleRelaxation onComplete={completeTask} />
            ) : activeTask.type === "affirmation" ? (
              <Affirmation onComplete={completeTask} />
            ) : activeTask.type === "socialConnection" ? (
              <SocialConnection onComplete={completeTask} />
            ) : activeTask.type === "natureWalk" ? (
              <NatureWalk onComplete={completeTask} />
            ) : activeTask.type === "guidedMeditation" ? (
              <GuidedMeditation onComplete={completeTask} />
            ) : activeTask.type === "artTherapy" ? (
              <ArtTherapy onComplete={completeTask} />
            ) : activeTask.type === "cognitiveRestructuring" ? (
              <CognitiveRestructuring onComplete={completeTask} />
            ) : activeTask.type === "physicalActivity" ? (
              <PhysicalActivity onComplete={completeTask} />
            ) : (
              <div>Task content coming soon</div>
            )}
          </div>

          {/* Global "Mark as Complete" Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={completeTask}
            className="w-full py-4 mt-6 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 rounded-xl font-bold text-lg flex items-center justify-center space-x-2"
          >
            <FaCheckCircle className="text-xl" />
            <span>Mark as Complete</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


      {/* Floating Progress Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8"
      >
        <Link
          to="/progress-tracking"
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-full shadow-2xl flex items-center space-x-2"
        >
          <FaChartLine />
          <span>View Progress</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default Task;
