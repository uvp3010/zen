import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const NatureWalk = ({ onComplete }) => {
  const [checklist, setChecklist] = useState({
    freshAir: false,
    greenery: false,
    birds: false,
    water: false,
  });

  const handleCheckboxChange = (item) => {
    setChecklist({ ...checklist, [item]: !checklist[item] });
  };

  const handleComplete = () => {
    // Require at least two observations checked
    const checked = Object.values(checklist).filter(val => val).length;
    if (checked < 2) {
      alert("Please check off at least two observations from your walk.");
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-lime-500 to-green-600">
      <div className="max-w-2xl w-full p-10 bg-black/70 backdrop-blur-xl rounded-xl border border-gray-700 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Nature Walk</h2>
        <p className="mb-6 text-center text-lg text-white">
          Take a 10-minute walk outside. As you walk, notice your surroundings.
        </p>
        <p className="mb-4 text-center text-white">Observations to check:</p>
        <div className="mb-6 space-y-2 text-white">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={checklist.freshAir} onChange={() => handleCheckboxChange("freshAir")} />
            <span>Fresh air</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={checklist.greenery} onChange={() => handleCheckboxChange("greenery")} />
            <span>Greenery/nature</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={checklist.birds} onChange={() => handleCheckboxChange("birds")} />
            <span>Birds or animals</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={checklist.water} onChange={() => handleCheckboxChange("water")} />
            <span>Water/sky</span>
          </label>
        </div>
        <motion.button 
          onClick={handleComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-lime-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2"
        >
          <FaCheckCircle className="text-xl" />
          <span>Complete Session</span>
        </motion.button>
      </div>
    </div>
  );
};

export default NatureWalk;
