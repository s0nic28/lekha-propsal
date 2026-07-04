import { motion } from 'framer-motion';
import Confetti from './Confetti';
import CatCharacter from './CatCharacter';
import SparkleEffect from './SparkleEffect';

interface YesExperienceProps {
  onBack: () => void;
}

const floatingItems = ['💜', '🌸', '✨', '💫', '🌺', '🦋', '💕', '🩷'];

export default function YesExperience({ onBack }: YesExperienceProps) {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20 animated-gradient-yes"
    >
      {/* Confetti */}
      <Confetti />

      {/* Floating emojis */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="fixed text-2xl pointer-events-none z-20"
          initial={{
            x: `${10 + (i * 12)}vw`,
            y: '110vh',
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        >
          {item}
        </motion.div>
      ))}

      <SparkleEffect count={14} />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, type: 'spring', stiffness: 120 }}
        className="relative z-30 flex flex-col items-center gap-8 max-w-2xl mx-auto text-center"
      >
        {/* Glow card */}
        <motion.div
          className="glass rounded-3xl p-10 md:p-14 shadow-2xl w-full"
          style={{
            boxShadow: '0 20px 60px rgba(201,184,240,0.4), 0 0 0 1px rgba(255,255,255,0.5)',
          }}
          animate={{
            boxShadow: [
              '0 20px 60px rgba(201,184,240,0.4), 0 0 0 1px rgba(255,255,255,0.5)',
              '0 25px 80px rgba(201,184,240,0.6), 0 0 0 1px rgba(255,255,255,0.7)',
              '0 20px 60px rgba(201,184,240,0.4), 0 0 0 1px rgba(255,255,255,0.5)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-5xl mb-6"
          >
            🎉
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif-display italic mb-4 leading-tight"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
              color: '#4a2d80',
            }}
          >
            Thank you for making me
            <br />
            <span className="text-shimmer font-playfair">the happiest person alive.</span>
            <span className="ml-2">💜</span>
          </motion.h2>

          <motion.div
            className="h-px my-6 mx-auto w-24"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(181,158,232,0.6), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6 }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-serif-display italic text-lg leading-relaxed mb-8"
            style={{ color: 'rgba(90,60,140,0.8)' }}
          >
            "I can't wait to create beautiful memories together."
          </motion.p>

          {/* Kiss cat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
            className="flex justify-center mb-4"
          >
            <CatCharacter variant="kiss" size={200} showHeart />
          </motion.div>

          {/* Floating hearts row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-2 flex-wrap"
          >
            {['💜', '🌸', '💕', '✨', '🦋', '💫', '🌺', '💜'].map((e, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5 + i * 0.2, delay: i * 0.15, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Secondary message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="glass rounded-2xl px-8 py-5 max-w-lg w-full"
        >
          <p
            className="font-serif-display italic text-center"
            style={{ color: 'rgba(90,60,140,0.7)', fontSize: '1.1rem' }}
          >
            ✨ From this moment on, every sunset is ours,<br />every song has a new meaning. 💜
          </p>
        </motion.div>

        {/* Back button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="text-sm tracking-wider mt-2"
          style={{ color: 'rgba(181,158,232,0.6)', cursor: 'none' }}
        >
          ← Back to the beginning
        </motion.button>
      </motion.div>
    </div>
  );
}
