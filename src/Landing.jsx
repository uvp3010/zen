
// import VideoLibrary from './VideoLibrary';
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const Landing = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
//       {/* Floating Navigation */}
//       <nav className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-xl shadow-xl">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <motion.h1
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-3xl font-bold"
//           >
//             <Link 
//               to="/" 
//               className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hover:from-cyan-400 hover:to-emerald-400 transition-all"
//             >
//               ZEN
//             </Link>
//           </motion.h1>
//         </div>
//       </nav>

//       {/* Hero Section - Full Screen Parallax Effect */}
//       <motion.section 
//         className="relative h-screen flex items-center justify-center overflow-hidden"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <div className="absolute inset-0 z-0">
//           <img 
//             src="https://www.theraserena.com/sites/theraserena/files/styles/articles_reference/public/2018-01/comment%20ne%20pas%20stresser.jpg.webp?itok=rnT7-zJC" 
//             alt="Serene meditation environment"
//             className="w-full h-full object-cover opacity-40"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/30"></div>
//         </div>

//         <div className="relative z-10 text-center px-4">
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
//               Mental Wellness Redefined
//             </h2>
//             <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
//               Experience personalized mental health support through AI-driven assessments, 
//               curated resources, and expert-guided mindfulness practices.
//             </p>
//             <Link to="/signup">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
//               >
//                 Begin Your Journey →
//               </motion.button>
//             </Link>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Features Section - Cards with Hover Effects */}
//       <section className="relative py-24 bg-slate-800/50 backdrop-blur-lg">
//         <div className="container mx-auto px-6">
//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-3 gap-8"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//           >
//             {/* Feature Card 1 */}
//             <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700/50 hover:border-emerald-400/30 transition-all group">
//               <div className="mb-6">
//                 <div className="w-16 h-16 bg-emerald-400/10 rounded-xl flex items-center justify-center mb-4">
//                   <span className="text-3xl text-emerald-400">🧘</span>
//                 </div>
//                 <h3 className="text-2xl font-semibold text-slate-100 mb-3">Mindful Assessments</h3>
//                 <p className="text-slate-400 leading-relaxed">
//                   AI-powered evaluations that adapt to your emotional state, providing 
//                   personalized insights and recommendations.
//                 </p>
//               </div>
//             </div>

//             {/* Feature Card 2 */}
//             <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-400/30 transition-all group">
//               <div className="mb-6">
//                 <div className="w-16 h-16 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-4">
//                   <span className="text-3xl text-cyan-400">📈</span>
//                 </div>
//                 <h3 className="text-2xl font-semibold text-slate-100 mb-3">Progress Tracking</h3>
//                 <p className="text-slate-400 leading-relaxed">
//                   Visualize your mental health journey with interactive dashboards 
//                   and smart analytics.
//                 </p>
//               </div>
//             </div>

//             {/* Feature Card 3 */}
//             <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700/50 hover:border-purple-400/30 transition-all group">
//               <div className="mb-6">
//                 <div className="w-16 h-16 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4">
//                   <span className="text-3xl text-purple-400">🎥</span>
//                 </div>
//                 <h3 className="text-2xl font-semibold text-slate-100 mb-3">Expert Content</h3>
//                 <p className="text-slate-400 leading-relaxed">
//                   Access a premium library of guided sessions from certified 
//                   mental health professionals.
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Video Library Section - Full Width Carousel */}
//       <section className="relative py-24 bg-slate-900">
//         <div className="container mx-auto px-6">
//           <motion.div 
//             className="mb-16 text-center"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent mb-4">
//               Transformative Content
//             </h3>
//             <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//               Explore our curated collection of mindfulness exercises, expert talks, 
//               and therapeutic practices.
//             </p>
//           </motion.div>
//           <VideoLibrary />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Landing;
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/" 
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
            >
              zen
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-x-6"
          >
            <a href="#features" className="hover:text-gray-300 transition">Features</a>
            <a href="#about" className="hover:text-gray-300 transition">About</a>
            <a href="#video-library" className="hover:text-gray-300 transition">Videos</a>
            <a href="#contact" className="hover:text-gray-300 transition">Contact</a>
            <Link 
              to="/login" 
              className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:shadow-lg transition"
            >
              Login
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-transparent opacity-75"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
          >
            Unlock Your Inner Strength
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-xl mx-auto text-lg md:text-xl text-gray-300 mb-8"
          >
            Discover personalized mental health assessments powered by AI and ML.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link to="/signup">
              <button className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 font-bold rounded-full hover:shadow-xl transition">
                Get Started
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Our Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience cutting-edge mental health assessments, data-driven insights, and personalized guidance—all powered by AI and ML.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Feature Card 1 */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-md hover:shadow-xl transition duration-300">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Driven Assessments</h3>
                <p className="text-gray-400">
                  Utilize advanced algorithms to evaluate your mental health with precision.
                </p>
              </div>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-md hover:shadow-xl transition duration-300">
              <div className="mb-4">
                <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Data-Driven Insights</h3>
                <p className="text-gray-400">
                  Track your progress with real-time analytics and interactive dashboards.
                </p>
              </div>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-md hover:shadow-xl transition duration-300">
              <div className="mb-4">
                <div className="w-16 h-16 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">💡</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Personalized Guidance</h3>
                <p className="text-gray-400">
                  Receive tailored recommendations and resources to support your mental well-being.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              About Us
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              At zen, we are dedicated to transforming mental health care through technology.
              Our platform uses AI and ML to perform advanced mental health assessments,
              enabling you to gain personalized insights and guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Library Section */}
      <section id="video-library" className="py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Video Library
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our curated collection of mental wellness videos and guided sessions.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Video Card 1 */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
              <iframe 
                width="100%" 
                height="225" 
                src="https://www.youtube.com/embed/ScMzIvxBSi4" 
                title="Mindfulness Meditation" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full"
              ></iframe>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Mindfulness Meditation</h3>
                <p className="text-gray-400 text-sm">
                  A guided meditation session to help you relax and focus.
                </p>
              </div>
            </div>
            {/* Video Card 2 */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
              <iframe 
                width="100%" 
                height="225" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Stress Relief Techniques" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full"
              ></iframe>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Stress Relief Techniques</h3>
                <p className="text-gray-400 text-sm">
                  Discover techniques to reduce stress and improve well-being.
                </p>
              </div>
            </div>
            {/* Video Card 3 */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
              <iframe 
                width="100%" 
                height="225" 
                src="https://www.youtube.com/embed/3fumBcKC6RE" 
                title="Guided Breathing Exercise" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full"
              ></iframe>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Guided Breathing Exercise</h3>
                <p className="text-gray-400 text-sm">
                  Follow along with a calming breathing exercise to ease anxiety.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have questions or need support? We'd love to hear from you.
            </p>
          </motion.div>
          <motion.div
            className="max-w-lg mx-auto bg-gray-800 rounded-2xl p-8 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <form>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 font-bold rounded-full hover:shadow-xl transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            Ready to Transform Your Mental Health?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Link to="/signup">
              <button className="px-10 py-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:shadow-2xl transition">
                Join zen Today
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} zen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
