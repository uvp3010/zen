// src/ComplexBreathingExercise.js
import React, { useState, useEffect } from "react";

// Define the breathing phases and their durations (in milliseconds).
const phases = [
  { name: "inhale", duration: 4000 },
  { name: "hold", duration: 2000 },
  { name: "exhale", duration: 4000 },
];

const Breath = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  // A key to force re‑mount of the animated circle for every phase change.
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    let timer;
    if (isStarted) {
      timer = setTimeout(() => {
        setPhaseIndex((prev) => (prev + 1) % phases.length);
        setAnimationKey((prev) => prev + 1);
      }, phases[phaseIndex].duration);
    }
    return () => clearTimeout(timer);
  }, [isStarted, phaseIndex]);

  const currentPhase = phases[phaseIndex].name;

  // Determine the correct animation class for the central circle.
  const getAnimationClass = () => {
    if (currentPhase === "inhale") return "animate-inhale";
    if (currentPhase === "hold") return "animate-hold";
    if (currentPhase === "exhale") return "animate-exhale";
    return "";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated shifting background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-purple-800 to-pink-800 animate-bgShift"></div>

      {/* Subtle shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_200%] animate-shimmer"></div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Introductory screen */}
        {!isStarted && (
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white animate-fadeIn">
              Breathe Deeply
            </h1>
            <p className="text-lg md:text-2xl text-white/80 animate-fadeIn delay-200">
              A mindful journey for inner peace and renewal.
            </p>
            <button
              onClick={() => setIsStarted(true)}
              className="mt-4 px-6 py-3 bg-white text-blue-900 font-semibold rounded-full shadow-lg hover:bg-white/90 transition duration-300 animate-fadeIn delay-400"
            >
              Start Session
            </button>
          </div>
        )}

        {/* Breathing exercise session */}
        {isStarted && (
          <div className="flex flex-col items-center space-y-8">
            {/* Title and phase indicator */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white animate-fadeIn">
                {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}
              </h2>
              <p className="mt-2 text-sm md:text-base text-white/70 animate-fadeIn delay-200">
                Follow the rhythm of your breath
              </p>
            </div>

            {/* Breathing circle with multiple layers */}
            <div className="relative">
              {/* Outer rotating dashed ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 border-4 border-dashed border-white/50 rounded-full animate-rotate"></div>
              </div>

              {/* Central breathing circle (re‑mounted on phase change) */}
              <div
                key={animationKey}
                className={`w-80 h-80 rounded-full bg-white opacity-20 ${getAnimationClass()}`}
              ></div>

              {/* Inner pulsing dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white animate-pulse"></div>
              </div>
            </div>

            {/* Instructional text */}
            <div className="max-w-md">
              <p className="text-white text-lg md:text-xl animate-fadeIn">
                Inhale slowly, hold for a moment, and then exhale gently.
              </p>
              <p className="mt-2 text-white/80 text-sm animate-fadeIn delay-200">
                Let each cycle bring calm and clarity to your mind.
              </p>
            </div>

            {/* Button to end the session */}
            <button
              onClick={() => {
                setIsStarted(false);
                setPhaseIndex(0);
              }}
              className="mt-6 px-4 py-2 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-400 transition duration-300 animate-fadeIn delay-400"
            >
              End Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Breath;
