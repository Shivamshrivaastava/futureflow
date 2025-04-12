import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NavbarFooter.css';
import heroImage from '../../assests/future-flow.png'; 

const DashboardLanding = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center space-y-10 text-center">
        {/* Transparent AI Image */}
        <motion.img
          src={heroImage}
          alt="FutureFlow Hero"
          className="w-[640px] max-w-full object-contain opacity-95 drop-shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />

        {/* Glowing Launch Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link
            to="/launch-dashboard"
            className="inline-block bg-yellow-400 text-gray-900 font-semibold text-lg py-3 px-7 rounded-md shadow-xl hover:bg-yellow-300 transition-all"
          >
            Launch Dashboard →
          </Link>
        </motion.div>

        {/* Floating Tagline / Feature */}
        <motion.div
          className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 text-sm text-white shadow-md hidden sm:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          💡 Powered by GeminiAI · Real-time financial projection & insight
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardLanding;
