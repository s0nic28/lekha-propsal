import { motion } from 'framer-motion';
import CatCharacter from './CatCharacter';
import SparkleEffect from './SparkleEffect';

interface NoExperienceProps {
  onBack: () => void;
}

export default function NoExperience({ onBack }: NoExperienceProps) {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20"
      style={{
        background: 'linear-gradient(160deg, #ede0f9 0%, #fdf6ee 50%, #e8d4ff 100%)',
      }}
    >
      <SparkleEffect count={6} />

      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,184,240,0.2) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-8 max-w-xl mx-auto text-center"
      >
        {/* Card */}
        <motion.div
          className="glass rounded-3xl p-10 md:p-14 shadow-xl w-full"
          style={{
            boxShadow: '0 16px 48px rgba(201,184,240,0.25), 0 0 0 1px rgba(255,255,255,0.5)',
          }}
        >
          {/* Sad cat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
            className="flex justify-center mb-6"
          >
            <CatCharacter variant="sad" size={150} showHeart={false} />
          </motion.div>

          {/* Main message */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-serif-display italic mb-4 leading-snug"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#5b3f8c',
            }}
          >
            Aww... thank you for
            <br />being honest. 💜
          </motion.h2>

          <motion.div
            className="h-px my-6 mx-auto w-24"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,184,240,0.6), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-serif-display italic leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: 'rgba(90,60,140,0.75)',
            }}
          >
            "I'll always appreciate you and wish you happiness."
          </motion.p>

          {/* Emoji row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center gap-3 mt-6"
          >
            {['🌸', '💜', '✨', '🩶', '🌿'].map((e, i) => (
              <motion.span
                key={i}
                className="text-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Secondary note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl px-8 py-5 max-w-md w-full"
        >
          <p
            className="font-serif-display italic text-center text-sm leading-relaxed"
            style={{ color: 'rgba(90,60,140,0.65)' }}
          >
            No matter what, your happiness matters most to me. 🌸<br />
            Thank you for taking the time to read this.
          </p>
        </motion.div>

        {/* Back button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="text-sm tracking-wider mt-2 px-8 py-3 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(201,184,240,0.4)',
            color: 'rgba(181,158,232,0.8)',
            cursor: 'none',
          }}
        >
          ← Back to the beginning
        </motion.button>
      </motion.div>
    </div>
  );
}
