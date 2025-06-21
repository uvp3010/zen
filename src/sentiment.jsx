// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { FaArrowLeft, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

// function Sentiment() {
//   const [inputText, setInputText] = useState('');
//   const [prediction, setPrediction] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [analysisMessage, setAnalysisMessage] = useState('');
//   const [isRecording, setIsRecording] = useState(false);

//   // Define the analysis steps messages (simulate a complex process)
//   const analysisSteps = [
//     "Initializing deep cognitive analysis...",
//     "Decomposing language structures...",
//     "Extracting semantic features...",
//     "Integrating contextual cues...",
//     "Synthesizing emotional signals...",
//     "Finalizing cognitive insight..."
//   ];

//   // Speech Recognition setup
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     if (SpeechRecognition) {
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onstart = () => {
//         console.log("Speech recognition started");
//       };

//       recognitionRef.current.onresult = (event) => {
//         const transcript = Array.from(event.results)
//           .map(result => result[0])
//           .map(result => result.transcript)
//           .join('');
//         console.log("Transcript received:", transcript);
//         setInputText(prev => prev + transcript);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error("Speech recognition error", event);
//         setIsRecording(false);
//       };

//       recognitionRef.current.onend = () => {
//         console.log("Speech recognition ended");
//         setIsRecording(false);
//       };
//     }
//   }, [SpeechRecognition]);

//   const startRecording = () => {
//     if (recognitionRef.current) {
//       try {
//         console.log("Starting speech recognition...");
//         recognitionRef.current.start();
//         setIsRecording(true);
//       } catch (err) {
//         console.error("Error starting recognition:", err);
//       }
//     }
//   };

//   const stopRecording = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setPrediction('');
//     setError('');
//     setLoading(true);
//     setCurrentStep(0);
//     setAnalysisMessage(analysisSteps[0]);

//     // Start the simulation of analysis steps
//     let stepIndex = 0;
//     const interval = setInterval(() => {
//       stepIndex++;
//       if (stepIndex < analysisSteps.length) {
//         setCurrentStep(stepIndex);
//         setAnalysisMessage(analysisSteps[stepIndex]);
//       } else {
//         clearInterval(interval);
//       }
//     }, 1000);

//     // After a delay, call the backend to get the prediction
//     setTimeout(async () => {
//       try {
//         const response = await fetch('http://localhost:5000/predict', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',  // Send session data
//           body: JSON.stringify({ text: inputText })
//         });

//         if (!response.ok) {
//           const errData = await response.json();
//           setError(errData.error || 'An error occurred');
//           setLoading(false);
//           clearInterval(interval);
//           return;
//         }

//         const data = await response.json();
//         setPrediction(data.prediction);
//       } catch (err) {
//         console.error('Error:', err);
//         setError('An error occurred while fetching the prediction.');
//       }
//       setLoading(false);
//       clearInterval(interval);
//     }, 6000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4 relative overflow-hidden">
//       {/* Background Element with pointer-events disabled */}
//       <motion.div 
//         className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"
//         animate={{ opacity: [0.1, 0.15, 0.1] }}
//         transition={{ duration: 8, repeat: Infinity }}
//       />
      
//       <motion.div
//         initial={{ opacity: 0, y: 50, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
//         className="w-full max-w-3xl bg-slate-900/70 backdrop-blur-2xl rounded-2xl border border-slate-700/50 shadow-2xl p-10 relative overflow-hidden"
//       >
//         {/* Accent Elements */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
//         <Link to="/dashboard" className="flex items-center text-emerald-400 hover:underline mb-6">
//           <FaArrowLeft className="mr-2" /> Back to Dashboard
//         </Link>
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-emerald-400 opacity-30" />
       
//         <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 text-center mb-10 tracking-tighter uppercase font-[650]">
//           Cognitive Insight Suite
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           <div className="relative">
//             <motion.div 
//               className="relative group"
//               whileHover={{ scale: 1.01 }}
//             >
//               {/* Overlay with pointer-events disabled */}
//               <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
//               <textarea
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//                 placeholder="Share your thoughts..."
//                 rows={5}
//                 className="w-full p-6 bg-slate-800/40 text-slate-200 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 border border-slate-700 transition-all duration-300 hover:border-emerald-400/30 resize-none backdrop-blur-sm text-lg font-light"
//               />
//             </motion.div>
//             {/* Speech-to-Text Button with increased z-index */}
//             {SpeechRecognition && (
//               <div className="relative z-10 flex items-center space-x-2 mt-4">
//                 <button 
//                   type="button" 
//                   onClick={isRecording ? stopRecording : startRecording}
//                   className="bg-slate-800/40 text-slate-200 p-2 rounded-full hover:bg-slate-700 transition-colors"
//                 >
//                   {isRecording ? <FaMicrophoneSlash className="w-6 h-6" /> : <FaMicrophone className="w-6 h-6" />}
//                 </button>
//                 <span className="text-slate-400">
//                   {isRecording ? 'Recording...' : 'Start Recording'}
//                 </span>
//               </div>
//             )}
//           </div>

//           <motion.button
//             type="submit"
//             className="w-full bg-gradient-to-r from-emerald-500/90 to-cyan-600 text-white py-5 rounded-xl font-medium tracking-wide transition-all hover:shadow-2xl hover:shadow-emerald-400/20 relative overflow-hidden group"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <span className="relative z-10 flex items-center justify-center space-x-3">
//               <motion.span 
//                 animate={loading ? { rotate: 360 } : {}}
//                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//                 className="inline-block"
//               >
//                 {loading ? '🌀' : '⚡'}
//               </motion.span>
//               <span>{loading ? 'Analyzing...' : 'Initiate Deep Analysis'}</span>
//             </span>
//             <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
//           </motion.button>
//         </form>

//         <AnimatePresence>
//           {loading && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="mt-10 p-8 rounded-xl backdrop-blur-lg bg-gradient-to-br from-emerald-900/30 to-slate-900/60 border border-emerald-400/20"
//             >
//               <p className="text-slate-300 text-lg font-medium">
//                 {analysisMessage}
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {(!loading && (prediction || error)) && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className={`mt-10 p-8 rounded-xl backdrop-blur-lg ${
//                 prediction
//                   ? 'bg-gradient-to-br from-emerald-900/30 to-slate-900/60 border border-emerald-400/20'
//                   : 'bg-gradient-to-br from-red-900/30 to-slate-900/60 border border-red-400/20'
//               }`}
//             >
//               <div className="flex items-start space-x-4">
//                 <div className={`p-3 rounded-lg ${prediction ? 'bg-emerald-400/10' : 'bg-red-400/10'}`}>
//                   {prediction ? (
//                     <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   ) : (
//                     <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                     </svg>
//                   )}
//                 </div>
//                 <div>
//                   <h3 className={`text-lg font-semibold mb-2 ${prediction ? 'text-emerald-400' : 'text-red-400'}`}>
//                     {prediction ? 'Cognitive Insights' : 'Analysis Error'}
//                   </h3>
//                   <p className="text-slate-300 leading-relaxed font-light">
//                     {prediction || error}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Ambient Glow */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
//           <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default Sentiment;
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaMicrophone, FaMicrophoneSlash, FaBrain } from 'react-icons/fa';

// New Visualization Component: AIThinkingVisualization
const AIThinkingVisualization = ({ currentStep, totalSteps, analysisMessage }) => {
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);
  return (
    <div className="p-8 bg-gradient-to-br from-indigo-500/10 to-slate-900/50 rounded-2xl border border-indigo-400/20 backdrop-blur-sm shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
          <FaBrain className="w-6 h-6" /> AI Assessment
        </h3>
        <span className="text-indigo-200 text-sm">{progress}%</span>
      </div>
      <div className="mb-4">
        <p className="text-indigo-300 text-lg font-semibold">{analysisMessage}</p>
        <div className="relative w-full h-3 bg-indigo-400/20 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-full bg-indigo-500/90 rounded-full"
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <ThinkingDots />
      </div>
    </div>
  );
};

const ThinkingDots = () => {
  return (
    <div className="flex space-x-2">
      <motion.div
        className="w-3 h-3 bg-indigo-500 rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      />
      <motion.div
        className="w-3 h-3 bg-indigo-500 rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.div
        className="w-3 h-3 bg-indigo-500 rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
    </div>
  );
};

function Sentiment() {
  const [inputText, setInputText] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // Simulated analysis steps
  const analysisSteps = [
    "Initializing deep cognitive analysis...",
    "Decomposing language structures...",
    "Extracting semantic features...",
    "Integrating contextual cues...",
    "Synthesizing emotional signals...",
    "Finalizing cognitive insight..."
  ];

  // Setup Speech Recognition if available
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => console.log("Speech recognition started");

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        console.log("Transcript received:", transcript);
        setInputText(prev => prev + transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        console.log("Speech recognition ended");
        setIsRecording(false);
      };
    }
  }, [SpeechRecognition]);

  const startRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error starting recognition:", err);
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction('');
    setError('');
    setLoading(true);
    setCurrentStep(0);
    setAnalysisMessage(analysisSteps[0]);

    // Simulate analysis steps
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < analysisSteps.length) {
        setCurrentStep(stepIndex);
        setAnalysisMessage(analysisSteps[stepIndex]);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    // Simulated backend call delay
    setTimeout(async () => {
      try {
        const response = await fetch('https://zenback-3.onrender.com/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ text: inputText })
        });

        if (!response.ok) {
          const errData = await response.json();
          setError(errData.error || 'An error occurred');
          setLoading(false);
          clearInterval(interval);
          return;
        }

        const data = await response.json();
        setPrediction(data.prediction);
      } catch (err) {
        console.error('Error:', err);
        setError('An error occurred while fetching the prediction.');
      }
      setLoading(false);
      clearInterval(interval);
    }, 6000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-indigo-900 to-black overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/70 rounded-full filter blur-3xl opacity-30 animate-pulse"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/70 rounded-full filter blur-3xl opacity-30 animate-pulse"
      />
      
      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        className="relative w-full max-w-2xl bg-gradient-to-br from-indigo-500/10 to-slate-900/50 p-8 rounded-2xl border border-indigo-400/20 backdrop-blur-sm shadow-xl"
      >
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="text-indigo-400 hover:text-indigo-300 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-400 text-center mb-8 uppercase tracking-wide">
          Cognitive Insight Suite
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.01 }}
            >
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={5}
                className="w-full p-4 md:p-6 bg-slate-800 bg-opacity-50 text-slate-200 rounded-xl border border-indigo-400/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 resize-none"
              />
            </motion.div>
            {SpeechRecognition && (
              <div className="flex items-center space-x-2 mt-3">
                <button 
                  type="button" 
                  onClick={isRecording ? stopRecording : startRecording}
                  className="bg-indigo-500/90 hover:bg-indigo-400 text-white p-2 rounded-full transition-colors"
                >
                  {isRecording ? <FaMicrophoneSlash className="w-6 h-6" /> : <FaMicrophone className="w-6 h-6" />}
                </button>
                <span className="text-indigo-200 text-sm">
                  {isRecording ? 'Recording...' : 'Start Recording'}
                </span>
              </div>
            )}
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 px-6 bg-indigo-500/90 hover:bg-indigo-400 text-white font-semibold rounded-xl shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center space-x-3">
              <motion.span 
                animate={loading ? { rotate: 360 } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                {loading ? '🌀' : '⚡'}
              </motion.span>
              <span>{loading ? 'Analyzing...' : 'Initiate Deep Analysis'}</span>
            </span>
          </motion.button>
        </form>

        {/* AI Thinking Visualization */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <AIThinkingVisualization 
                currentStep={currentStep} 
                totalSteps={analysisSteps.length} 
                analysisMessage={analysisMessage} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prediction / Error Output */}
        <AnimatePresence>
          {(!loading && (prediction || error)) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-8 p-6 rounded-xl border ${prediction ? 'bg-green-500/10 border-green-400/20' : 'bg-red-500/10 border-red-400/20'} shadow-lg`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${prediction ? 'bg-green-500 bg-opacity-20' : 'bg-red-500 bg-opacity-20'}`}>
                  {prediction ? (
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${prediction ? 'text-green-400' : 'text-red-400'}`}>
                    {prediction ? 'Cognitive Insights' : 'Analysis Error'}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {prediction || error}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Sentiment;
