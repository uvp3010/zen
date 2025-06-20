import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const SocialConnection = ({ onComplete }) => {
  const [message, setMessage] = useState("");

  const conversationStarters = [
    "How have you been feeling lately?",
    "What’s something good that happened to you recently?",
    "How can I support you today?",
  ];

  const handleComplete = () => {
    if (message.trim() === "") {
      alert("Please share your plan or thoughts before completing.");
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-500 to-teal-500">
      <div className="max-w-2xl w-full p-10 bg-black/70 backdrop-blur-xl rounded-xl border border-gray-700 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Connect with Someone</h2>
        <p className="mb-6 text-center text-lg text-white">
          Social connection is key to well-being. Consider reaching out to someone you trust.
        </p>
        <p className="mb-4 text-center text-white">Here are some conversation starters:</p>
        <ul className="mb-6 list-disc list-inside text-lg text-center text-white">
          {conversationStarters.map((starter, index) => (
            <li key={index}>{starter}</li>
          ))}
        </ul>
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write down your plan or message to share..."
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 mb-4"
          rows="4"
        />
        <motion.button 
          onClick={handleComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2"
        >
          <FaCheckCircle className="text-xl" />
          <span>Complete Session</span>
        </motion.button>
      </div>
    </div>
  );
};

export default SocialConnection;
