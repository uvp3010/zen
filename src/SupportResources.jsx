
import React, { useState } from "react";
import { motion } from "framer-motion";
import Dcard from "./Dcard";
import Qna from "./Qna";
import HealthTips from "./HealthTips";
import Emergency from "./Emergency";
import Chatbot from "./Chatbot";
import Navbar from "./Navbar"; // Reusing the Dashboard navbar

const SupportResources = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Reusable Navbar with matching design */}
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-white">Support Hub</h1>
          <p className="text-slate-400 mt-2">
            Expert guidance, health tips, and emergency contacts at your fingertips.
          </p>
        </motion.header>

        {/* Consultation Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">
            Schedule Consultation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Dcard
              name="Dr. Rubina Gore"
              specialization="Psychiatrist"
              image="https://www.amritahospitals.org/_next/image?url=https%3A%2F%2Fadmin.amritahospitals.org%2Fsites%2Fdefault%2Ffiles%2F2023-06%2FDr%2520Pranathi%2520Sharma.jpg&w=3840&q=75"
              number="+918698194536"
              experience="15 yrs experience"
              bio="Passionate about heart health and advanced cardiac care."
            />
            <Dcard
              name="Dr. John Doe"
              specialization="Peer Specialist"
              image="https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png"
              number="+918698194536"
              experience="15 yrs experience"
              bio="Passionate about heart health and advanced cardiac care."
            />
          </div>
        </motion.section>

        {/* Q&A Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Health Q&amp;A
          </h2>
          <Qna />
        </motion.section>

        {/* Health Tips Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-4">
            Health Tips
          </h2>
          <HealthTips />
        </motion.section>

        {/* Emergency Contacts Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">
            Emergency Contacts
          </h2>
          <Emergency />
        </motion.section>
      </div>

      {/* Chatbot Component (assumed to match dashboard design) */}
      <Chatbot isOpen={chatOpen} setChatOpen={setChatOpen} />
    </div>
  );
};

export default SupportResources;
