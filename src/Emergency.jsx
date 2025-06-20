
// import React from "react";
// import "./Emergency.css";

// const Emergency = () => {
//   return (
//     <div className="emergency">
//       <ul>
//         <li>
//           <strong>Medical Services:</strong> 911
//         </li>
//         <li>
//           <strong>City General Hospital:</strong> (535) 123-4567
//         </li>
//         <li>
//           <strong>Urgent Care:</strong> (535) 987-6543
//         </li>
//         <li>
//           <strong>Ambulance:</strong> (535) 555-0000
//         </li>
//       </ul>
//       <p className="emergency-note">
//         In case of emergency, please call immediately.
//       </p>
//     </div>
//   );
// };

// export default Emergency;
// Emergency.js
import React from "react";

const Emergency = () => {
  return (
    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-lg">
      <ul className="space-y-2 text-slate-300">
        <li>
          <strong className="text-white">Medical Services:</strong> 911
        </li>
        <li>
          <strong className="text-white">City General Hospital:</strong>{" "}
          (535) 123-4567
        </li>
        <li>
          <strong className="text-white">Urgent Care:</strong> (535) 987-6543
        </li>
        <li>
          <strong className="text-white">Ambulance:</strong> (535) 555-0000
        </li>
      </ul>
      <p className="mt-4 text-sm text-slate-400">
        In case of emergency, please call immediately.
      </p>
    </div>
  );
};

export default Emergency;
