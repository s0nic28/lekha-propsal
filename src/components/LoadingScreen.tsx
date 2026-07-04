import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center animated-gradient"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Soft glow orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(201,184,240,0.5), rgba(249,208,227,0.3), transparent)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Logo / brand mark */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Icon */}
        <motion.div
          className="text-6xl"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💜
        </motion.div>

        {/* Brand text */}
        <motion.p
          className="font-playfair text-sm tracking-[0.5em] uppercase"
          style={{ color: 'rgba(181,158,232,0.9)' }}
        >
          ✦ loading ✦
        </motion.p>

        {/* Loading bar */}
        <div
          className="w-32 h-0.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(201,184,240,0.3)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #c9b8f0, #f9d0e3)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
            onAnimationComplete={onComplete}
          />
        </div>
      </motion.div>

      {/* Corner decorations */}
      {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} text-sm opacity-30`}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
        >
          ✦
        </motion.div>
      ))}
    </motion.div>
  );
}
