import React, { useState } from 'react';

const Assessment = () => {
  const [answers, setAnswers] = useState(Array(9).fill(0));
  const [resultData, setResultData] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');

  const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving a lot more than usual",
    "Thoughts that you would be better off dead or of hurting yourself in some way",
  ];

  const options = [
    "Not at all",
    "Several days",
    "More than half the days",
    "Nearly every day"
  ];

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = parseInt(value);
    setAnswers(updated);
  };

  const calculateResults = (total) => {
    if (total <= 4) return { level: "Minimal depression", message: "Your mood seems stable. Keep maintaining your mental well-being!" };
    if (total <= 9) return { level: "Mild depression", message: "You may be experiencing some low mood. Try mindfulness or self-care." };
    if (total <= 14) return { level: "Moderate depression", message: "Consider reaching out to someone you trust or a counselor." };
    if (total <= 19) return { level: "Moderately severe depression", message: "It’s important to seek help. A doctor will be scheduled for you." };
    return { level: "Severe depression", message: "Immediate professional support is recommended." };
  };

  const saveAssessment = async (score, result) => {
    try {
      await fetch("https://zenback-3.onrender.com/save-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ score, result: result.level }),
      });
    } catch (error) {
      console.error("Error saving assessment:", error);
    }
  };

  const handleFinish = async () => {
    const totalScore = answers.reduce((sum, val) => sum + val, 0);
    const result = calculateResults(totalScore);
    setResultData(result);
    setShowResults(true);

    // Save the assessment
    await saveAssessment(totalScore, result);

    // If high severity, auto-schedule appointment
    if (totalScore >= 15) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD

      try {
        const response = await fetch("https://zenback-3.onrender.com/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ date: formattedDate }),
        });

        if (response.ok) {
          console.log("Appointment scheduled for", formattedDate);

          // Optional: WhatsApp alert to doctor
          await fetch("https://zenback-3.onrender.com/send-whatsapp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              doctor_number: "+91XXXXXXXXXX", // replace with actual doctor number
              message: `Urgent appointment requested for a patient with ${result.level}.`,
            }),
          });

          // Show popup after scheduling
          setAppointmentDate(formattedDate);
          setShowPopup(true);
        } else {
          console.error("Failed to schedule appointment");
        }
      } catch (error) {
        console.error("Error scheduling appointment:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">PHQ-9 Depression Assessment</h1>

        {!showResults ? (
          <>
            {questions.map((q, i) => (
              <div key={i} className="mb-6">
                <p className="font-medium mb-2 text-gray-800">{i + 1}. {q}</p>
                <div className="flex flex-wrap gap-3">
                  {options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerChange(i, idx)}
                      className={`px-4 py-2 rounded-full border ${
                        answers[i] === idx
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } transition`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center mt-6">
              <button
                onClick={handleFinish}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                Finish Assessment
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">{resultData.level}</h2>
            <p className="text-gray-700 mb-6">{resultData.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Take Again
            </button>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center w-96 transform scale-95 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Appointment Scheduled ✅</h2>
            <p className="text-gray-700 mb-2">Your mental health is important.</p>
            <p className="text-gray-600 mb-6">
              We’ve scheduled your session with a doctor for <b>{appointmentDate}</b>.
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

      {/* Animation */}
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

