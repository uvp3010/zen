// import React, { useState } from "react";
// import axios from "axios";
// import './Dcard.css'

// const Dcard = ({ name, image, number, specialization, experience, bio }) => {
//   const [date, setDate] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSchedule = async () => {
//     if (!date) {
//       setMessage("Please select a date.");
//       return;
//     }
//     try {
//       const scheduleResponse = await axios.post(
//         "http://127.0.0.1:5000/schedule",
//         { date },
//         { withCredentials: true }
//       );

//       setMessage(scheduleResponse.data.message);

//       await axios.post(
//         "http://127.0.0.1:5000/send-whatsapp",
//         {
//           doctor_number: number,
//           message: `Appointment scheduled for ${date}.`,
//         },
//         { withCredentials: true }
//       );
//     } catch (error) {
//       setMessage(error.response?.data?.message || "An error occurred.");
//     }
//   };

//   return (
//     <div className="dcard">
//       <div className="dcard-header">
//         <img src={image} alt={name} className="profile-img" />
//         <div className="info">
//           <h2>{name}</h2>
//           <p className="specialization">{specialization}</p>
//         </div>
//       </div>
//       <div className="dcard-body">
//         <p className="experience">{experience}</p>
//         <p className="bio">{bio}</p>
//       </div>
//       <div className="appointment">
//         <label>Select Date:</label>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>
//       <button onClick={handleSchedule} className="schedule-btn">
//         Schedule Appointment
//       </button>
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default Dcard;
// Dcard.js
import React, { useState } from "react";
import axios from "axios";

const Dcard = ({ name, image, number, specialization, experience, bio }) => {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSchedule = async () => {
    if (!date) {
      setMessage("Please select a date.");
      return;
    }
    try {
      const scheduleResponse = await axios.post(
        "http://localhost:5000/schedule",
        { date },
        { withCredentials: true }
      );

      setMessage(scheduleResponse.data.message);

      await axios.post(
        "http://localhost:5000/send-whatsapp",
        {
          doctor_number: number,
          message: `Appointment scheduled for ${date}.`,
        },
        { withCredentials: true }
      );
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 shadow-lg flex flex-col">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-slate-400">{specialization}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-slate-300 mb-1">
          <span className="font-medium">Experience:</span> {experience}
        </p>
        <p className="text-slate-300">
          <span className="font-medium">Bio:</span> {bio}
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-slate-300 mb-1">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white"
        />
      </div>
      <button
        onClick={handleSchedule}
        className="w-full py-2 bg-emerald-400 text-slate-900 rounded-xl hover:bg-emerald-500 transition-all"
      >
        Schedule Appointment
      </button>
      {message && <p className="mt-2 text-sm text-slate-400">{message}</p>}
    </div>
  );
};

export default Dcard;
