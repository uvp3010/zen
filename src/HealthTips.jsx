// HealthTips.js
import React from "react";

const HealthTips = () => {
  const tips = [
    {
      title: "Stay Hydrated",
      description:
        "Drink at least 8 glasses of water daily to keep your body functioning optimally."
    },
    {
      title: "Eat a Balanced Diet",
      description:
        "Include fruits, vegetables, lean proteins, and whole grains in your meals."
    },
    {
      title: "Exercise Regularly",
      description:
        "Aim for at least 30 minutes of physical activity each day to boost your health."
    }
  ];

  return (
    <div className="space-y-4">
      {tips.map((tip, index) => (
        <div
          key={index}
          className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 shadow-md"
        >
          <h3 className="text-lg font-bold text-emerald-400 mb-2">
            {tip.title}
          </h3>
          <p className="text-slate-300">{tip.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HealthTips;
