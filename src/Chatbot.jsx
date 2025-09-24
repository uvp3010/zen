import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

// Helper delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Chatbot = ({ isOpen, setChatOpen }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, I'm Lisa. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Append user's message
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    // Append temporary "typing" message
    const typingMsg = { sender: "bot", text: "Lisa is typing...", temp: true };
    setMessages((prev) => [...prev, typingMsg]);

    setLoading(true);

    // Wait for 3 seconds before fetching the response
    await delay(3000);

    try {
      const response = await fetch("https://zenback.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Send session data
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        const errData = await response.json();
        setMessages((prev) =>
          prev.filter((msg) => !msg.temp).concat({
            sender: "bot",
            text: errData.error || "An error occurred.",
          })
        );
      } else {
        const data = await response.json();
        setMessages((prev) =>
          prev.filter((msg) => !msg.temp).concat({
            sender: "bot",
            text: data.response,
          })
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) =>
        prev.filter((msg) => !msg.temp).concat({
          sender: "bot",
          text: "Sorry, I'm having trouble responding right now.",
        })
      );
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // Container animation variants
  const containerVariants = {
    open: {
      width: 350,
      height: 500,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      width: 60,
      height: 60,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={containerVariants}
      className="fixed bottom-5 right-5 z-50 bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden"
    >
      {/* Closed State */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="closedContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center"
          >
            <motion.button
              onClick={() => setChatOpen(true)}
              className="w-14 h-14 rounded-full focus:outline-none"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <img
                src="https://imgcdn.stablediffusionweb.com/2024/3/31/a07c234b-ab97-4ad4-96b1-e1e88ec45e45.jpg"
                alt="Chatbot Avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Open State */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="openContent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            {/* Chatbot Header */}
            <div className="bg-slate-700 p-3 flex justify-between items-center rounded-t-xl">
              <div className="flex items-center">
                <img
                  src="https://imgcdn.stablediffusionweb.com/2024/3/31/a07c234b-ab97-4ad4-96b1-e1e88ec45e45.jpg"
                  alt="Chatbot Avatar"
                  className="w-10 h-10 rounded-full mr-2 object-cover border border-slate-600"
                />
                <div>
                  <h3 className="text-white font-semibold">Lisa</h3>
                  <p className="text-slate-300 text-xs">Your virtual companion</p>
                </div>
              </div>
              <button
                className="text-white text-xl focus:outline-none"
                onClick={() => setChatOpen(false)}
              >
                ✖
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={chatBoxRef} className="flex-1 p-3 overflow-y-auto bg-slate-900">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.sender === "bot" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-2 flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-[80%] text-sm ${
                      msg.sender === "bot"
                        ? "bg-slate-700 text-white"
                        : "bg-emerald-400 text-slate-900"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-700 p-3 bg-slate-800 flex">
              <input
                type="text"
                value={input}
                placeholder="Type your message..."
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded-l-md text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="px-4 bg-emerald-400 text-slate-900 rounded-r-md hover:bg-emerald-500 focus:outline-none"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Chatbot;
