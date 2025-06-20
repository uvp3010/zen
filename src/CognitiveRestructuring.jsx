import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const CognitiveRestructuring = ({ onComplete }) => {
  const [negativeThought, setNegativeThought] = useState("");
  const [evidence, setEvidence] = useState("");
  const [alternativeThought, setAlternativeThought] = useState("");

  const handleSubmit = () => {
    if (negativeThought.trim() === "" || alternativeThought.trim() === "") {
      alert("Please complete the required fields before finishing the session.");
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-500 to-orange-500">
      <div className="max-w-2xl w-full p-10 bg-black/70 backdrop-blur-xl rounded-xl border border-gray-700 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Cognitive Restructuring</h2>
        <p className="mb-6 text-center text-lg text-white">
          Identify a negative thought, examine its evidence, and form a positive alternative.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold text-white">Negative Thought:</label>
            <textarea 
              value={negativeThought}
              onChange={(e) => setNegativeThought(e.target.value)}
              placeholder="Write down a negative thought..."
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
              rows="3"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-white">Evidence (for/against):</label>
            <textarea 
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              placeholder="List any evidence..."
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
              rows="3"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-white">Alternative Positive Thought:</label>
            <textarea 
              value={alternativeThought}
              onChange={(e) => setAlternativeThought(e.target.value)}
              placeholder="Formulate a more balanced thought..."
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
              rows="3"
            />
          </div>
        </div>
        <motion.button 
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full py-3 bg-red-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2"
        >
          <FaCheckCircle className="text-xl" />
          <span>Complete Session</span>
        </motion.button>
      </div>
    </div>
  );
};

export default CognitiveRestructuring;
