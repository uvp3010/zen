import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const ArtTherapy = ({ onComplete }) => {
  const [artDescription, setArtDescription] = useState("");

  const handleSubmit = () => {
    if (artDescription.trim() === "") {
      alert("Please describe your art expression before completing.");
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-500 to-pink-600">
      <div className="max-w-2xl w-full p-10 bg-black/70 backdrop-blur-xl rounded-xl border border-gray-700 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Art Therapy</h2>
        <p className="mb-6 text-center text-lg text-white">
          Express your feelings through art. Draw, paint, or describe your creative process.
        </p>
        <textarea 
          value={artDescription}
          onChange={(e) => setArtDescription(e.target.value)}
          placeholder="Describe your art or feelings..."
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 mb-4"
          rows="6"
        />
        <motion.button 
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-purple-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2"
        >
          <FaCheckCircle className="text-xl" />
          <span>Complete Session</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ArtTherapy;
