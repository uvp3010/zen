import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import {
  FaBirthdayCake,
  FaVenusMars,
  FaPen,
  FaSave,
  FaTimes,
  FaMagic,
  FaGem,
  FaArrowLeft
} from 'react-icons/fa';

const defaultAvatar = "/avatars/default.jpg";
const avatarOptions = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar8.png",
  "/avatars/avatar9.png",
  "/avatars/avatar10.png",

];

const getAvatarUrl = (path) => {
  if (!path) return defaultAvatar;
  if (path.startsWith('http')) return path;
  return `${window.location.origin}${path}`;
};

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    gender: '',
    avatar: defaultAvatar,
  });

  // Fetch profile data from the backend
  const fetchProfileData = async () => {
    try {
      const response = await fetch('https://zenback-3.onrender.com/dashboard', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.user) {
        setProfileData(data.user);
        setFormData({
          username: data.user.username,
          email: data.user.email,
          age: data.user.age,
          gender: data.user.gender,
          avatar: data.user.avatar || defaultAvatar,
        });
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (avatarPath) => {
    setFormData(prev => ({ ...prev, avatar: avatarPath }));
    setShowAvatarModal(false);
  };

  const handleSave = async () => {
    let avatarToSave = formData.avatar;
    if (avatarToSave.startsWith(window.location.origin)) {
      avatarToSave = avatarToSave.substring(window.location.origin.length);
    }
    const payload = { ...formData, avatar: avatarToSave };

    try {
      const response = await fetch('https://zenback-3.onrender.com/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setProfileData(data.user);
        setEditMode(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-4 border-emerald-400 rounded-full"
        />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20 flex items-center justify-center">
        <p className="text-slate-300">Error loading profile data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative pt-20">
      

      {/* Back to Dashboard Button */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <Link
          to="/Dashboard"
          className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors"
        >
          <FaArrowLeft className="mr-2 text-xl" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-4 sm:mx-auto bg-slate-800/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50"
      >
        {/* Enhanced Cover Image with Gradient */}
        <div className="relative h-56 bg-gradient-to-r from-purple-500/20 to-teal-500/20">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-emerald-300">
            <FaGem className="text-xl" />
            <span className="font-medium">Premium Member</span>
          </div>
        </div>

        {/* Floating Avatar Container */}
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-36 h-36 rounded-full border-4 border-emerald-400/80 shadow-2xl 
                       bg-gradient-to-br from-purple-500 to-teal-500 p-1"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <img
                src={getAvatarUrl(formData.avatar)}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
              {editMode && (
                <motion.button
                  onClick={() => setShowAvatarModal(true)}
                  className="absolute inset-0 bg-slate-900/70 flex items-center justify-center"
                  whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.5)' }}
                >
                  <FaMagic className="text-3xl text-emerald-300 animate-pulse" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-8 pt-24">
          <div className="text-center space-y-6">
            {editMode ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Enhanced Input Fields */}
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full max-w-md px-5 py-3 pt-6 bg-slate-800/70 text-slate-100 rounded-xl
                               border-2 border-slate-700 focus:border-emerald-400 focus:ring-0
                               transition-all duration-300"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-1 px-2 text-slate-400 text-sm 
                                  bg-slate-800/70 pointer-events-none transition-all duration-300">
                    Username
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full max-w-md px-5 py-3 pt-6 bg-slate-800/70 text-slate-100 rounded-xl
                               border-2 border-slate-700 focus:border-cyan-400 focus:ring-0
                               transition-all duration-300"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-1 px-2 text-slate-400 text-sm 
                                  bg-slate-800/70 pointer-events-none transition-all duration-300">
                    Email
                  </label>
                </div>

                <div className="flex justify-center space-x-6">
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-24 px-5 py-3 pt-6 bg-slate-800/70 text-slate-100 rounded-xl
                               border-2 border-slate-700 focus:border-teal-400 focus:ring-0
                               transition-all duration-300"
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-1 px-2 text-slate-400 text-sm 
                                    bg-slate-800/70 pointer-events-none transition-all duration-300">
                      Age
                    </label>
                  </div>

                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-32 px-5 py-3 pt-6 bg-slate-800/70 text-slate-100 rounded-xl
                               border-2 border-slate-700 focus:border-indigo-400 focus:ring-0
                               transition-all duration-300"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <label className="absolute left-4 top-1 px-2 text-slate-400 text-sm 
                                    bg-slate-800/70 pointer-events-none transition-all duration-300">
                      Gender
                    </label>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 
                              bg-clip-text text-transparent">
                  {profileData.username}
                </h1>
                <p className="text-lg text-slate-300 font-light">
                  {profileData.email}
                </p>
                <div className="flex justify-center space-x-8 mt-4">
                  <div className="flex items-center space-x-3 bg-slate-800/50 px-4 py-2 rounded-xl">
                    <FaBirthdayCake className="text-2xl text-emerald-400" />
                    <span className="text-slate-300 font-medium">
                      {profileData.age} years
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-800/50 px-4 py-2 rounded-xl">
                    <FaVenusMars className="text-2xl text-purple-400" />
                    <span className="text-slate-300 font-medium">
                      {profileData.gender}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons with Gradient */}
            <div className="mt-8 flex justify-center space-x-4">
              {editMode ? (
                <>
                  <motion.button
                    onClick={handleSave}
                    className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 
                            text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30
                            transition-all duration-300"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSave className="mr-2 text-lg" />
                    Save Changes
                  </motion.button>
                  <motion.button
                    onClick={() => setEditMode(false)}
                    className="flex items-center px-8 py-3 bg-slate-700/50 border border-slate-600 
                            text-slate-300 rounded-xl hover:bg-slate-700/70
                            transition-all duration-300"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTimes className="mr-2 text-lg" />
                    Discard
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => setEditMode(true)}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 
                          text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30
                          transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPen className="mr-2 text-lg" />
                  Edit Profile
                </motion.button>
              )}
            </div>

            {/* Member Since Badge */}
            <div className="mt-6 inline-flex items-center space-x-2 bg-slate-800/50 px-4 py-2 
                           rounded-full border border-slate-700">
              <span className="text-sm text-slate-400">Member since</span>
              <span className="text-sm font-medium text-emerald-400">
                {profileData.joinDate || 'Jan 2023'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Avatar Modal with Glassmorphism Effect */}
      <AnimatePresence>
        {showAvatarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full mx-4
                       border border-slate-700/50 shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-center text-emerald-400 mb-6">
                Choose Your Avatar
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {avatarOptions.map((avatarPath) => (
                  <motion.div
                    key={avatarPath}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleAvatarSelect(avatarPath)}
                  >
                    <div className={`rounded-full overflow-hidden border-2 ${formData.avatar === avatarPath ? 'border-emerald-400' : 'border-transparent'} w-20 h-20`}>
                      <img
                        src={getAvatarUrl(avatarPath)}
                        alt="Avatar Option"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <motion.button
                  onClick={() => setShowAvatarModal(false)}
                  className="px-6 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 
                            rounded-xl hover:bg-slate-700/70 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
