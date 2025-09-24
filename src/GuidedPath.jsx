import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import MindfulBreathing from "./MindfulBreathing";
import GratitudeJournaling from "./GratitudeJournaling";
import ProgressiveMuscleRelaxation from "./ProgressiveMuscleRelaxation"; // Ensure this component exists
import Badge from "./Badge";

const Task = () => {
  // State to store tasks fetched from the backend
  const [tasks, setTasks] = useState([]);
  // State to store the task (activity) that is currently active (for the overlay)
  const [activeTask, setActiveTask] = useState(null);

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    fetch("https://zenback.onrender.com/tasks", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // Expects the backend to return { tasks: [ ... ] }
        setTasks(data.tasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Open the selected task overlay
  const openTask = (task) => {
    setActiveTask(task);
  };

  // Mark the active task as complete, update backend, and then update local state
  const completeTask = () => {
    if (activeTask && !activeTask.completed) {
      fetch("http://localhost:5000/complete-task", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // Note: Use "taskId" as the key per our backend configuration.
        body: JSON.stringify({ taskId: activeTask.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Once confirmed by backend, update the tasks state so that the task is marked as completed.
          setTasks(
            tasks.map((t) =>
              t.id === activeTask.id ? { ...t, completed: true } : t
            )
          );
          setActiveTask(null);
        })
        .catch((error) => {
          console.error("Error completing task:", error);
        });
    } else {
      setActiveTask(null);
    }
  };

  // Determine if all tasks have been completed
  const allCompleted = tasks.length > 0 && tasks.every((task) => task.completed);

  return (
    <div className="relative w-full h-screen overflow-y-scroll bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Your Guided Mental Wellness Path
        </h1>
        <p className="text-center mb-12 text-gray-400">
          Complete each activity to earn your Wellness Achiever Badge.
        </p>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central vertical timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-600"></div>

          <div className="space-y-16 relative">
            {tasks.map((task, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`relative w-full flex ${
                    isLeft ? "justify-start pr-8" : "justify-end pl-8"
                  }`}
                >
                  <div className="w-80">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-xl relative">
                      <h3 className="text-2xl font-semibold mb-2">{task.title}</h3>
                      <p className="text-gray-300 mb-4">{task.description}</p>
                      {task.completed ? (
                        <span className="text-emerald-400 font-bold">
                          Completed
                        </span>
                      ) : (
                        <button
                          onClick={() => openTask(task)}
                          className="px-4 py-2 bg-emerald-500 text-slate-900 rounded-md hover:bg-emerald-600 transition"
                        >
                          Start
                        </button>
                      )}
                    </div>
                    {/* Connector from card to timeline */}
                    <div
                      className={`absolute top-1/2 transform -translate-y-1/2 ${
                        isLeft ? "right-full mr-4" : "left-full ml-4"
                      }`}
                    >
                      <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Achievement Section */}
            {allCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-center mt-16"
              >
                <h3 className="text-3xl font-bold mb-4">Congratulations!</h3>
                <p className="text-xl mb-4">
                  You have completed your guided path and earned the{" "}
                  <span className="font-bold">Wellness Achiever Badge</span>.
                </p>
                <Badge text="Wellness Achiever Badge" />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Task Content Overlay */}
      <AnimatePresence>
        {activeTask && (
          <motion.div
            key="overlay"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 right-0 w-full md:w-1/2 h-full bg-slate-900/95 backdrop-blur-lg p-8 overflow-y-auto z-50"
          >
            <button
              onClick={() => setActiveTask(null)}
              className="mb-8 text-emerald-400 hover:text-emerald-300 transition-colors text-lg"
            >
              ← Back to Path
            </button>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                {activeTask.title}
              </h2>
              {/* Render the corresponding activity based on task.type */}
              {activeTask.type === "mindfulBreathing" ? (
                <div>
                  <MindfulBreathing />
                  <button
                    onClick={completeTask}
                    className="mt-4 px-4 py-2 bg-emerald-500 text-slate-900 rounded-md hover:bg-emerald-600 transition"
                  >
                    Mark as Complete
                  </button>
                </div>
              ) : activeTask.type === "gratitudeJournaling" ? (
                <div>
                  <GratitudeJournaling />
                  <button
                    onClick={completeTask}
                    className="mt-4 px-4 py-2 bg-emerald-500 text-slate-900 rounded-md hover:bg-emerald-600 transition"
                  >
                    Mark as Complete
                  </button>
                </div>
              ) : activeTask.type === "pmr" ? (
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Progressive Muscle Relaxation
                  </h3>
                  <ProgressiveMuscleRelaxation onComplete={completeTask} />
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {activeTask.title}
                  </h3>
                  <p className="mb-4">{activeTask.description}</p>
                  <textarea
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Write your reflection here..."
                  ></textarea>
                  <button
                    onClick={completeTask}
                    className="mt-4 px-4 py-2 bg-emerald-500 text-slate-900 rounded-md hover:bg-emerald-600 transition"
                  >
                    Mark as Complete
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Go to Progress Tracking Button */}
      <Link
        to="/progress"
        className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 rounded-full text-white shadow-lg hover:bg-blue-600 transition"
      >
        View Progress
      </Link>
    </div>
  );
};

export default Task;
