import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const defaultAvatar = "/avatars/default.jpg";

const getAvatarUrl = (path) => {
  if (!path) return defaultAvatar;
  if (path.startsWith('http')) return path;
  return `${window.location.origin}${path}`;
};

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const navigate = useNavigate();

  // Fetch the profile data (including avatar) from the dashboard endpoint
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://zenback.onrender.com/dashboard', {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.user) {
          setAvatar(data.user.avatar || defaultAvatar);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

const handleLogout = async () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (!confirmLogout) return;

  try {
    const response = await fetch('https://zenback.onrender.com/logout', {
      method: 'POST',
      credentials: 'include', // Important: keeps session cookie context
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message || "Logged out successfully.");

      // 🧹 Clear anything stored client-side (if any)
      sessionStorage.clear(); 
      localStorage.clear(); // if you used it for any user info

      // 🚪 Redirect to homepage or login
      navigate('/');
    } else {
      alert("Logout failed. Please try again.");
    }
  } catch (err) {
    console.error("Logout error:", err);
    alert("Something went wrong during logout.");
  }
};

  return (
    <nav className="bg-slate-900/80 backdrop-blur-xl fixed w-full top-0 z-50 shadow-xl">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold"
        >
          <Link
            to="/Dashboard"
            className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hover:from-cyan-400 hover:to-emerald-400 transition-all"
          >
            ZEN
          </Link>
        </motion.h1>

        <div className="flex items-center space-x-4">
          {/* Profile Picture with a circular gradient frame */}
          <Link to="/Profile">
            <div className="p-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400">
              <img
                src={getAvatarUrl(avatar)}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
            </div>
          </Link>

          {/* Dashboard Menu Button */}
          <div className="relative">
            <motion.button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative px-6 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-slate-300 hover:text-white hover:border-emerald-400/30 transition-all"
            >
              <AnimatePresence mode="wait">
                {dropdownOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    ✕
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    ☰
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-3 w-56 bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-2xl z-50"
              >
                <ul className="py-3 space-y-2">
                  <li className="hover:bg-slate-700/30 transition-colors">
                    <Link
                      to="/assessment"
                      onClick={() => setDropdownOpen(false)}
                      className="px-4 py-2 flex items-center text-slate-300 hover:text-emerald-400"
                    >
                      <span className="mr-2">📊</span> Mental Assessment
                    </Link>
                  </li>
                  <li className="hover:bg-slate-700/30 transition-colors">
                    <Link
                      to="/progress-tracking"
                      onClick={() => setDropdownOpen(false)}
                      className="px-4 py-2 flex items-center text-slate-300 hover:text-cyan-400"
                    >
                      <span className="mr-2">📈</span> Progress Analytics
                    </Link>
                  </li>
                  <li className="hover:bg-slate-700/30 transition-colors">
                    <Link
                      to="/support-resources"
                      onClick={() => setDropdownOpen(false)}
                      className="px-4 py-2 flex items-center text-slate-300 hover:text-purple-400"
                    >
                      <span className="mr-2">💬</span> Support Network
                    </Link>
                  </li>
                  <li className="hover:bg-slate-700/30 transition-colors">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="px-4 py-2 flex items-center w-full text-slate-300 hover:text-red-400"
                    >
                      <span className="mr-2">🚪</span> Logout
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
