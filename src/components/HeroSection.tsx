import { motion } from 'framer-motion';
import SparkleEffect from './SparkleEffect';

interface HeroSectionProps {
  onOpen: () => void;
}

export default function HeroSection({ onOpen }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden animated-gradient">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Radial glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(201,184,240,0.6) 0%, rgba(249,208,227,0.3) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Sparkles */}
      <SparkleEffect count={12} />

      {/* Top decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
        className="absolute top-16 left-1/2 -translate-x-1/2 h-px w-48"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,184,240,0.7), transparent)' }}
      />

      {/* Decorative subtitle above */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="font-playfair text-sm tracking-[0.4em] uppercase mb-8 z-10"
        style={{ color: 'rgba(181,158,232,0.9)' }}
      >
        ✦ A message for you ✦
      </motion.p>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif-display text-center leading-tight z-10 px-6"
        style={{
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          color: '#5b3f8c',
          textShadow: '0 4px 30px rgba(181,158,232,0.3)',
        }}
      >
        I Have Something
        <br />
        <span className="text-shimmer font-playfair italic">To Tell You</span>
        <span className="ml-3">💜</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="font-serif-display italic text-center mt-6 z-10 px-6"
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: 'rgba(140,107,177,0.85)',
        }}
      >
        "There's something I've wanted to say..."
      </motion.p>

      {/* Decorative dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="flex gap-2 mt-8 z-10"
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#c9b8f0' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* Open button */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.8, type: 'spring', stiffness: 200 }}
        className="mt-14 z-10"
      >
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.07, y: -3 }}
          whileTap={{ scale: 0.96 }}
          className="relative group px-14 py-5 rounded-full font-semibold text-lg tracking-widest overflow-hidden pulse-glow-btn"
          style={{
            background: 'linear-gradient(135deg, rgba(201,184,240,0.9), rgba(249,208,227,0.9))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.7)',
            color: '#5b3f8c',
            cursor: 'none',
            boxShadow: '0 8px 32px rgba(201,184,240,0.4), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          {/* Inner shimmer */}
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite',
            }}
          />
          <span className="relative flex items-center gap-3 font-playfair">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✉️
            </motion.span>
            Open
          </span>
        </motion.button>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 h-px w-48"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,208,227,0.7), transparent)' }}
      />

      {/* Corner sparkles */}
      {[
        'top-12 left-12 text-pink-300',
        'top-20 right-16 text-purple-300',
        'bottom-24 left-16 text-peach-300',
        'bottom-16 right-12 text-pink-200',
      ].map((cls, i) => (
        <motion.span
          key={i}
          className={`absolute ${cls} text-lg pointer-events-none hidden md:block`}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
          transition={{ duration: 3 + i, delay: i * 0.8, repeat: Infinity }}
          style={{ opacity: 0.4 }}
        >
          ✦
        </motion.span>
      ))}

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(181,158,232,0.6)' }}>
          tap to open
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-6 rounded-full flex items-start justify-center pt-1"
          style={{ border: '1px solid rgba(181,158,232,0.4)' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: 'rgba(181,158,232,0.5)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
