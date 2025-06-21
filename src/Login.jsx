import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState(""); // Using username as expected by the backend
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://zenback-3.onrender.com/login",
        { username, password },
        { withCredentials: true } // Credentials are included
      );
      setMessage(response.data.message);
      navigate("/dashboard");  // Redirect to the dashboard after login
    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
        <h2 className="text-3xl font-semibold mb-4 text-center text-white">
          Log In to Zen
        </h2>
        {message && (
          <p className="mb-4 text-center text-red-500">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-slate-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring focus:ring-emerald-400"
              placeholder="yourUsername"
              required
            />
          </div>
          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring focus:ring-emerald-400"
              placeholder="Your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-emerald-400 text-slate-900 rounded-md hover:bg-emerald-500 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
      {/* Link to Sign Up */}
      <div className="mt-4">
        <p className="text-slate-300">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-emerald-400 hover:text-emerald-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
