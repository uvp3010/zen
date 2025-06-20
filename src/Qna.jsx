
import React, { useState } from "react";

const Qna = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const qaData = [
    {
      question: "What are common signs of depression?",
      answer:
        "Depression may manifest as persistent sadness, loss of interest in activities, changes in sleep or appetite, fatigue, and feelings of hopelessness. Professional help can be beneficial."
    },
    {
      question: "How can I manage anxiety?",
      answer:
        "Managing anxiety can include practicing mindfulness, deep breathing exercises, maintaining a regular routine, and seeking support from mental health professionals."
    },
    {
      question: "What are effective strategies for improving mental health?",
      answer:
        "Effective strategies include engaging in regular physical activity, getting enough sleep, practicing self-care, connecting with supportive people, and consulting mental health experts when needed."
    },
    {
      question: "What are the benefits of therapy?",
      answer:
        "Therapy offers a safe space to explore feelings, develop coping strategies, improve communication, and work through challenging life events with professional guidance."
    },
    {
      question: "How do I cope with stress?",
      answer:
        "Coping with stress can involve regular exercise, maintaining social connections, practicing relaxation techniques, and, if needed, seeking professional advice for stress management."
    },
    {
      question: "How can I support a friend struggling with mental health issues?",
      answer:
        "Support a friend by listening non-judgmentally, encouraging them to seek professional help, staying connected, and educating yourself about mental health to better understand their experience."
    }
  ];

  const filteredQAs = qaData.filter((qa) =>
    qa.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 shadow-lg">
      <input
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-4 bg-slate-700 border border-slate-600 rounded-xl placeholder-slate-400 text-white"
      />
      {/* Scrollable container with custom scrollbar styling */}
      <div className="max-h-96 overflow-y-auto space-y-4 custom-scrollbar">
        {filteredQAs.length > 0 ? (
          filteredQAs.map((qa, index) => (
            <div
              key={index}
              className="p-4 bg-slate-700/50 rounded-xl border border-slate-600"
            >
              <h3 className="text-white font-semibold mb-2">{qa.question}</h3>
              <p className="text-slate-300">{qa.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-slate-400">No results found.</p>
        )}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4a5568;
          border-radius: 10px;
          border: 2px solid #1e293b;
        }
      `}</style>
    </div>
  );
};

export default Qna;
