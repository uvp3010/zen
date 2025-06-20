import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const GuidedMeditation = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 60-second meditation session
  const [meditating, setMeditating] = useState(false);

  useEffect(() => {
    let timer;
    if (meditating && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      onComplete();
    }
    return () => clearTimeout(timer);
  }, [meditating, timeLeft, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="max-w-2xl w-full p-10 bg-black/70 backdrop-blur-xl rounded-xl border border-gray-700 shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Guided Meditation</h2>
        <p className="mb-6 text-lg text-white">
          Sit comfortably, close your eyes, and focus on your breath. When ready, press "Start Meditation".
        </p>
        {meditating ? (
          <div className="text-2xl font-bold mb-6 text-white">
            {timeLeft} seconds remaining
          </div>
        ) : (
          <motion.button 
            onClick={() => setMeditating(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2"
          >
            <FaCheckCircle className="text-xl" />
            <span>Start Meditation</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default GuidedMeditation;
