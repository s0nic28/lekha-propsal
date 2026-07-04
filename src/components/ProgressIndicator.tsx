import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export default function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <motion.div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === current ? 24 : 6,
            opacity: i <= current ? 1 : 0.3,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-1.5 rounded-full"
          style={{
            background: i === current
              ? 'linear-gradient(90deg, #c9b8f0, #f9d0e3)'
              : 'rgba(201,184,240,0.5)',
          }}
        />
      ))}
    </motion.div>
  );
}
