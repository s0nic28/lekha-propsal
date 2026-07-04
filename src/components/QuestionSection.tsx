import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CatCharacter from './CatCharacter';
import SparkleEffect from './SparkleEffect';

interface QuestionSectionProps {
  onYes: () => void;
  onNo: () => void;
}

export default function QuestionSection({ onYes, onNo }: QuestionSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
      style={{
        background: 'linear-gradient(160deg, #fce4f1 0%, #e8d4ff 40%, #fdd9c0 80%, #fdf6ee 100%)',
      }}
    >
      <SparkleEffect count={10} />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,184,240,0.25) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-10 max-w-2xl mx-auto text-center"
      >
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-playfair tracking-[0.3em] text-sm uppercase"
          style={{ color: 'rgba(181,158,232,0.9)' }}
        >
          ✦ The Moment ✦
        </motion.p>

        {/* Main question */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.9, type: 'spring', stiffness: 120 }}
          className="font-serif-display italic leading-tight"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            color: '#4a2d80',
            textShadow: '0 4px 30px rgba(181,158,232,0.3)',
          }}
        >
          Will You Be My
          <br />
          <span className="text-shimmer font-playfair not-italic font-bold">Girlfriend?</span>
        </motion.h2>

        {/* Cat character */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 150 }}
        >
          <CatCharacter variant="happy" size={160} showHeart />
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center mt-2"
        >
          {/* YES Button */}
          <motion.button
            onClick={async () => { await fetch("/api/response",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answer:"yes"})}); onYes(); }}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-16 py-5 rounded-full text-lg font-bold tracking-wider overflow-hidden pulse-glow-btn"
            style={{
              background: 'linear-gradient(135deg, rgba(201,184,240,0.95), rgba(181,158,232,0.9))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.7)',
              color: '#fff',
              cursor: 'none',
              boxShadow: '0 8px 32px rgba(181,158,232,0.5), inset 0 1px 0 rgba(255,255,255,0.5)',
              minWidth: '180px',
            }}
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s linear infinite',
              }}
            />
            <span className="relative font-playfair">YES 💜</span>
          </motion.button>

          {/* NO Button */}
          <motion.button
            onClick={async () => { await fetch("/api/response",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answer:"no"})}); onNo(); }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="relative px-14 py-5 rounded-full text-lg font-medium tracking-wider"
            style={{
              background: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(201,184,240,0.4)',
              color: '#8c6bb1',
              cursor: 'none',
              boxShadow: '0 4px 20px rgba(201,184,240,0.2)',
              minWidth: '180px',
            }}
          >
            <span className="font-playfair">NO 🩶</span>
          </motion.button>
        </motion.div>

        {/* Small note below */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-xs tracking-wide"
          style={{ color: 'rgba(181,158,232,0.6)' }}
        >
          No pressure — whatever you decide, I'll always cherish you. 💜
        </motion.p>
      </motion.div>
    </section>
  );
}


