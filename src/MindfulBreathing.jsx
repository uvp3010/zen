

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MindfulBreathing = () => {
  const totalTime = 5 * 60; // 5 minutes in seconds
  const cycleDuration = 16; // 16 seconds per cycle (4s Inhale, 4s Hold, 4s Exhale, 4s Hold)
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [started, timeLeft]);

  const elapsed = totalTime - timeLeft;
  const cycleTime = elapsed % cycleDuration;
  let phase = '';
  if (cycleTime < 4) {
    phase = 'Inhale';
  } else if (cycleTime < 8) {
    phase = 'Hold';
  } else if (cycleTime < 12) {
    phase = 'Exhale';
  } else {
    phase = 'Hold';
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/mercedes-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Centered Glassmorphism Content Card */}
      <div className="relative z-10 max-w-2xl mx-auto p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl text-center">
        {!started ? (
          <>
            <h1 className="text-4xl font-bold text-white mb-6">Guided Breathing</h1>
            <p className="text-xl text-gray-300 mb-8">
              Relax with this 5‑minute breathing exercise.
            </p>
            <motion.button
              onClick={() => {
                setStarted(true);
                setTimeLeft(totalTime);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            >
              Start
            </motion.button>
          </>
        ) : (
          <>
            {timeLeft > 0 ? (
              <>
                <motion.h2
                  className="text-4xl font-bold mb-4 text-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {phase}
                </motion.h2>
                <motion.div
                  className="mx-auto mb-6 w-48 h-48 rounded-full border-4 border-blue-500"
                  animate={{ scale: [1, 1.6, 1.6, 1, 1] }}
                  transition={{ duration: cycleDuration, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="text-4xl font-semibold text-white mb-2">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-gray-400">Remaining Time</p>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-green-400 mb-4">
                  Well done!
                </h2>
                <motion.button
                  onClick={() => {
                    setStarted(false);
                    setTimeLeft(totalTime);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Restart
                </motion.button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MindfulBreathing;

