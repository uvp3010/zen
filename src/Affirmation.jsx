import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const Affirmation = ({ onComplete }) => {
  const [affirmations, setAffirmations] = useState(["", "", "", "", ""]);

  const handleChange = (index, value) => {
    const newAffirmations = [...affirmations];
    newAffirmations[index] = value;
    setAffirmations(newAffirmations);
  };

  const handleSubmit = () => {
    // Require at least three affirmations entered
    const filled = affirmations.filter(a => a.trim() !== "");
    if (filled.length >= 3) {
      onComplete();
    } else {
      alert("Please fill at least three affirmations before completing.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-500 to-red-500">
      <div className="max-w-2xl w-full p-10 bg-black/70 backdrop-blur-xl rounded-xl border border-gray-700 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Daily Affirmations</h2>
        <p className="mb-6 text-center text-lg text-white">
          Recite or write down 5 positive affirmations to boost your mood. Here are some examples:
        </p>
        <ul className="mb-6 list-disc list-inside text-lg text-center text-white">
          <li>I am worthy of love and respect.</li>
          <li>I have the strength to overcome challenges.</li>
          <li>I am growing and learning every day.</li>
        </ul>
        <div className="space-y-4">
          {affirmations.map((a, index) => (
            <input
              key={index}
              type="text"
              value={a}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Affirmation ${index + 1}`}
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
            />
          ))}
        </div>
        <motion.button 
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full py-3 bg-pink-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2"
        >
          <FaCheckCircle className="text-xl" />
          <span>Complete Session</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Affirmation;
