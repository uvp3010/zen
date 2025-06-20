import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const PhysicalActivity = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600 seconds)
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer;
    if (active && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      onComplete();
    }
    return () => clearTimeout(timer);
  }, [active, timeLeft, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-500 to-yellow-500">
      <div className="max-w-2xl w-full p-10 bg-black/70 backdrop-blur-xl rounded-xl border border-gray-700 shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Physical Activity</h2>
        <p className="mb-6 text-lg text-white">
          Engage in a brisk 10-minute walk or any physical activity that gets your heart rate up.
        </p>
        {active ? (
          <div className="text-2xl font-bold mb-6 text-white">
            {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)} remaining
          </div>
        ) : (
          <motion.button 
            onClick={() => setActive(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2"
          >
            <FaCheckCircle className="text-xl" />
            <span>Start Activity</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default PhysicalActivity;
