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
      const response = await axios.post("https://zenback.onrender.com/register", {
        username,
        password,
        age,
        gender,
        email,
      });
      setMessage("🎉 " + response.data.message + " Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const msg = error.response?.data?.message;

      if (msg?.toLowerCase().includes("username")) {
        setMessage("🚫 Username already exists. Try something more Zen 🧘‍♂️");
      } else if (msg?.toLowerCase().includes("email")) {
        setMessage("📧 That email is already registered. Maybe log in instead?");
      } else {
        setMessage("⚠️ Something went wrong. Please try again.");
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
            className={`mb-4 p-2 text-center text-sm rounded-md ${
              message.startsWith("🎉")
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
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
