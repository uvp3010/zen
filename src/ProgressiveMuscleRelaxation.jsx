
// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { motion } from "framer-motion";

// const muscleGroups = [
//   "Hands: Clench your fists tightly.",
//   "Shoulders: Shrug your shoulders up to your ears.",
//   "Face: Scrunch your face tightly.",
//   "Arms: Flex your biceps.",
//   "Stomach: Squeeze your abdominal muscles.",
//   "Legs: Tighten your thigh muscles.",
//   "Feet: Curl your toes downward.",
// ];

// const ProgressiveMuscleRelaxation = ({ onComplete }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [countdown, setCountdown] = useState(10);
//   const [stepCompleted, setStepCompleted] = useState(false);

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setStepCompleted(true);
//     }
//   }, [countdown]);

//   const handleNextStep = () => {
//     if (currentStep < muscleGroups.length - 1) {
//       setCurrentStep(currentStep + 1);
//       setCountdown(10);
//       setStepCompleted(false);
//     } else {
//       onComplete();
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl text-center">
//       <h2 className="text-2xl font-bold text-white mb-4">Progressive Muscle Relaxation</h2>
//       <p className="text-lg text-gray-300 mb-6">
//         Follow the instructions below to relax your muscles.
//       </p>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="text-xl font-semibold text-white mb-4"
//       >
//         {muscleGroups[currentStep]}
//       </motion.div>
//       <div className="text-5xl font-bold text-emerald-500">{countdown}</div>
//       <p className="mt-4 text-sm text-gray-400">
//         Hold the tension, then release and feel the relaxation.
//       </p>
//       <div className="mt-6">
//         <button
//           onClick={handleNextStep}
//           disabled={!stepCompleted}
//           className={`px-6 py-3 rounded-xl transition ${
//             stepCompleted
//               ? "bg-emerald-500 text-black hover:bg-emerald-600"
//               : "bg-gray-600 text-gray-300 cursor-not-allowed"
//           }`}
//         >
//           {currentStep < muscleGroups.length - 1 ? "Next Step" : "Finish"}
//         </button>
//       </div>
//     </div>
//   );
// };

// ProgressiveMuscleRelaxation.propTypes = {
//   onComplete: PropTypes.func.isRequired,
// };

// export default ProgressiveMuscleRelaxation;
// ProgressiveMuscleRelaxation.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GiMuscleUp } from "react-icons/gi";

// Define the muscle groups with their respective instructions and icons
const muscleGroups = [
  { name: "Hands", instruction: "Clench fists tightly", icon: "🤲" },
  { name: "Shoulders", instruction: "Shrug towards ears", icon: "👔" },
  { name: "Face", instruction: "Scrunch facial muscles", icon: "😠" },
  { name: "Arms", instruction: "Flex biceps firmly", icon: "💪" },
  { name: "Core", instruction: "Engage abdomen", icon: "🦵" },
  { name: "Legs", instruction: "Tighten thigh muscles", icon: "🦵" },
  { name: "Feet", instruction: "Curl toes downward", icon: "👣" },
];

// Fallback color scheme (amber-based) if none is provided via props
const defaultColors = { primary: "#F59E0B", secondary: "#D97706" };

const ProgressiveMuscleRelaxation = ({ onComplete, colors }) => {
  // Use provided colors or fallback to defaults
  const appliedColors = colors || defaultColors;

  const [currentStep, setCurrentStep] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const [stepCompleted, setStepCompleted] = useState(false);

  // Countdown effect for each step
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setStepCompleted(true);
    }
  }, [countdown]);

  // Proceed to the next muscle group or finish the session
  const handleNextStep = () => {
    if (currentStep < muscleGroups.length - 1) {
      setCurrentStep(currentStep + 1);
      setCountdown(10);
      setStepCompleted(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-amber-900 to-orange-900">
      <div className="max-w-2xl w-full p-10 bg-slate-900/50 backdrop-blur-xl rounded-[40px] border-2 border-white/10 shadow-2xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <GiMuscleUp className="text-5xl mx-auto mb-4" style={{ color: appliedColors.primary }} />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Muscle Relaxation
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Systematic tension and release for deep relaxation
          </p>
        </div>

        {/* Muscle Group and Progress Section */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center space-y-8"
        >
          <div className="text-8xl mb-6">
            {muscleGroups[currentStep].icon}
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-2" style={{ color: appliedColors.primary }}>
              {muscleGroups[currentStep].name}
            </h3>
            <p className="text-xl text-slate-300">
              {muscleGroups[currentStep].instruction}
            </p>
          </div>

          {/* Animated Countdown Progress Circle */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-slate-700/50"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-current"
                style={{ color: appliedColors.primary }}
                strokeWidth="8"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset={283 * (1 - countdown / 10)}
                initial={{ strokeDashoffset: 283 }}
                transition={{ duration: 1 }}
              />
            </svg>
            <div
              className="absolute inset-0 flex items-center justify-center text-3xl font-bold"
              style={{ color: appliedColors.primary }}
            >
              {countdown}
            </div>
          </div>

          {/* Next/Finish Button with dynamic colors */}
          <motion.button
            onClick={handleNextStep}
            disabled={!stepCompleted}
            whileHover={{ scale: stepCompleted ? 1.05 : 1 }}
            whileTap={{ scale: stepCompleted ? 0.95 : 1 }}
            style={{ 
              backgroundColor: appliedColors.primary, 
              color: appliedColors.secondary 
            }}
            className={`px-8 py-4 rounded-2xl text-lg font-semibold transition-all w-full max-w-xs mx-auto ${
              stepCompleted ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
          >
            {currentStep < muscleGroups.length - 1 ? "Next Step" : "Finish"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressiveMuscleRelaxation;
