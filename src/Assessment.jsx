import React, { useState, useEffect } from "react";

const Assessment = () => {
  const [answers, setAnswers] = useState(Array(9).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");

  const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead or of hurting yourself in some way",
  ];

  const handleOptionSelect = (questionIndex, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const calculateResult = (score) => {
    if (score <= 4) return "Minimal Depression";
    if (score <= 9) return "Mild Depression";
    if (score <= 14) return "Moderate Depression";
    if (score <= 19) return "Moderately Severe Depression";
    return "Severe Depression";
  };

  const handleSubmit = async () => {
    const score = answers.reduce((sum, val) => sum + (val ?? 0), 0);
    const resultText = calculateResult(score);

    setTotalScore(score);
    setResult(resultText);
    setShowResults(true);

    // Save assessment to backend
    await fetch("https://zenback-3.onrender.com/save-assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ score, result: resultText }),
    });

    // Auto schedule appointment for moderate to severe
    if (score >= 15) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toISOString().split("T")[0];

      try {
        const response = await fetch("https://zenback-3.onrender.com/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ date: formattedDate }),
        });

        if (response.ok) {
          setAppointmentDate(formattedDate);
          setShowPopup(true);
        } else {
          console.error("Failed to schedule appointment");
        }
      } catch (err) {
        console.error("Error scheduling appointment:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          PHQ-9 Depression Test
        </h1>

        {!showResults ? (
          <>
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="mb-6">
                <p className="font-medium text-gray-800 mb-3">
                  {qIndex + 1}. {question}
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Not at all", "Several days", "More than half the days", "Nearly every day"].map(
                    (label, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(qIndex, index)}
                        className={`px-4 py-2 rounded-full border transition ${
                          answers[qIndex] === index
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {label}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}

            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                disabled={answers.includes(null)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  answers.includes(null)
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
              {result}
            </h2>
            <p className="text-gray-700 mb-4">
              Your total score: <b>{totalScore}</b>
            </p>
            {totalScore >= 15 && (
              <p className="text-red-600 font-medium">
                Based on your responses, a doctor appointment has been scheduled automatically.
              </p>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Take Again
            </button>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-96 transform scale-95 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-green-700 mb-3">
              Appointment Scheduled ✅
            </h2>
            <p className="text-gray-700 mb-2">Your mental health matters.</p>
            <p className="text-gray-600 mb-6">
              Session scheduled for <b>{appointmentDate}</b>.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Assessment;


