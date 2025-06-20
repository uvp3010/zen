// src/VideoLibrary.jsx
import { motion } from 'framer-motion';

const videos = [
  { id: 1, title: 'Video 1', url: 'https://www.youtube.com/embed/rkZl2gsLUp4?si=9tZzErnysNOr3dXQ' },
  { id: 2, title: 'Video 2', url: 'https://www.youtube.com/embed/tLRCS48Ens4?si=NqMG2YA855qoxFde' },
  { id: 3, title: 'Video 3', url: 'https://www.youtube.com/embed/CJIXbibQ0jI?si=D8MTeME29G099mtq' },
  { id: 4, title: 'Video 4', url: 'https://www.youtube.com/embed/FN0_ow76hU8?si=t5WPyStK5eqW47jf' },
  { id: 5, title: 'Video 5', url: 'https://www.youtube.com/embed/OTQJmkXC2EI?si=Zi1fx3KGZtOYo83v' },
  { id: 6, title: 'Video 6', url: 'https://www.youtube.com/embed/qq0DBeFdDlM?si=LtDUDBgkBg2VxrjE' },
];

const VideoLibrary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
        >
          <div className="relative">
            <iframe
              className="w-full h-56 object-cover"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 hover:opacity-50 transition duration-300"></div>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold text-white text-center">{video.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VideoLibrary;
