
// import { useState } from 'react';
// import { motion } from 'framer-motion';

// const GratitudeJournaling = () => {
//   const [journalEntry, setJournalEntry] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [charCount, setCharCount] = useState(0);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setJournalEntry(value);
//     setCharCount(value.length);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add saving logic here if needed
//     setSubmitted(true);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-black p-6">
//       <div className="w-full max-w-lg">
//         {!submitted ? (
//           <form
//             onSubmit={handleSubmit}
//             className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl"
//           >
//             <h2 className="text-3xl font-bold text-center text-white mb-6">
//               Gratitude Journal
//             </h2>
//             <p className="mb-4 text-lg text-gray-300 text-center">
//               Write down three things you are grateful for today:
//             </p>
//             <motion.textarea
//               className="w-full p-4 mb-4 rounded-xl border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
//               placeholder="I am grateful for..."
//               value={journalEntry}
//               onChange={handleChange}
//               rows={5}
//               whileFocus={{ scale: 1.02 }}
//               required
//             />
//             <p className="text-sm text-gray-400 mb-4 text-right">
//               Character Count: {charCount}
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="w-full py-3 bg-emerald-500 text-black rounded-xl font-semibold transition-colors hover:bg-emerald-600"
//             >
//               Submit
//             </motion.button>
//           </form>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, ease: 'easeInOut' }}
//             className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl text-center"
//           >
//             <h2 className="text-3xl font-bold text-emerald-400">
//               Well Done!
//             </h2>
//             <p className="mt-4 text-xl text-white">
//               Your gratitude has been recorded.
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GratitudeJournaling;
// GratitudeJournaling.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiQuillPenLine } from 'react-icons/ri';

const GratitudeJournaling = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 p-6">
      <div className="w-full max-w-2xl">
        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="p-10 bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-xl rounded-[40px] border-2 border-white/10 shadow-2xl"
          >
            <div className="flex flex-col items-center mb-8">
              <RiQuillPenLine className="text-4xl text-purple-400 mb-4" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gratitude Journal
              </h2>
              <p className="mt-4 text-lg text-slate-300 text-center max-w-md">
                Cultivate positivity by reflecting on today's blessings
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative mb-6"
            >
              <textarea
                className="w-full p-6 text-lg bg-slate-800/30 rounded-2xl border-2 border-white/10 focus:border-purple-400/50 focus:ring-0 text-white placeholder-slate-400 resize-none transition-all"
                placeholder="Today, I'm grateful for..."
                value={journalEntry}
                onChange={(e) => {
                  setJournalEntry(e.target.value);
                  setCharCount(e.target.value.length);
                }}
                rows={6}
                required
              />
              <div className={`absolute bottom-4 right-4 text-sm ${
                charCount > 50 ? 'text-emerald-400' : 'text-slate-400'
              }`}>
                {charCount}/500
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all"
            >
              Save Reflection
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 bg-gradient-to-br from-emerald-800/50 to-teal-900/50 backdrop-blur-xl rounded-[40px] border-2 border-white/10 shadow-2xl text-center"
          >
            <div className="text-6xl mb-6">🌟</div>
            <h2 className="text-3xl font-bold text-emerald-400 mb-4">
              Reflection Saved
            </h2>
            <p className="text-lg text-slate-300">
              Your gratitude has been recorded in the cosmos of positivity
            </p>
            <motion.button
              onClick={() => setSubmitted(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 bg-slate-700/50 text-white rounded-xl flex items-center gap-2 mx-auto hover:bg-slate-700/70 transition-all"
            >
              <RiQuillPenLine />
              Write Another
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GratitudeJournaling;