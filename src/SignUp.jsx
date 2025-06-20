// // src/SignUp.jsx
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/register", {
//         username,
//         password,
//         age,
//         gender,
//         email,
//       });
//       setMessage(response.data.message);
//       // Redirect to login page after a short delay (optional)
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         setMessage(error.response.data.message);
//       } else {
//         setMessage("An unexpected error occurred.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-3xl font-semibold mb-4 text-center">Sign Up for Zen</h2>
//         <p className="text-center text-gray-700 mb-6">
//           Create an account to start your journey toward better mental health.
//         </p>
//         {/* Display success/error message */}
//         {message && (
//           <div className="mb-4 p-2 text-center text-sm rounded-md 
//             bg-green-200 text-green-800">
//             {message}
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           {/* Username */}
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-700 mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               placeholder="Your username"
//               required
//             />
//           </div>
//           {/* Email */}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               placeholder="you@example.com"
//               required
//             />
//           </div>
//           {/* Password */}
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               placeholder="Your password"
//               required
//             />
//           </div>
//           {/* Age */}
//           <div className="mb-4">
//             <label htmlFor="age" className="block text-gray-700 mb-2">
//               Age
//             </label>
//             <input
//               type="number"
//               id="age"
//               name="age"
//               min="18"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               placeholder="Your age"
//               required
//             />
//           </div>
//           {/* Gender */}
//           <div className="mb-6">
//             <label htmlFor="gender" className="block text-gray-700 mb-2">
//               Gender
//             </label>
//             <select
//               id="gender"
//               name="gender"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             >
//               <option value="">Select your gender</option>
//               <option value="female">Female</option>
//               <option value="male">Male</option>
//               <option value="non-binary">Non-binary</option>
//               <option value="prefer-not-to-say">Prefer not to say</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//       {/* Link to Login */}
//       <div className="mt-4">
//         <p className="text-gray-700">
//           Already have an account?{' '}
//           <Link to="/login" className="text-blue-600 hover:text-blue-800">
//             Log In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
// src/SignUp.jsx
// src/SignUp.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { motion } from "framer-motion";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        age,
        gender,
        email,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src="/mercedes-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <motion.div 
        className="relative z-10 w-full max-w-md p-8 bg-gray-900 bg-opacity-90 rounded-lg shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Sign Up for Zen
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Begin your journey to luxury mental wellness.
        </p>
        {message && (
          <motion.div 
            className="mb-4 p-2 text-center text-sm rounded-md bg-green-200 text-green-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Your username"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Your password"
              required
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-300 mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="18"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Your age"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-gray-300 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            >
              <option value="">Select your gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white rounded-md border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-gray-400 hover:text-gray-200 font-medium">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
