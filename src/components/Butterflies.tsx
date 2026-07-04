import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ButterflyItem {
  id: number;
  startX: number;
  startY: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

const BUTTERFLY_COLORS = [
  ['#f9d0e3', '#e8b4d4'],
  ['#c9b8f0', '#a896d8'],
  ['#fdd9c0', '#f0c0a0'],
  ['#b59ee8', '#9880d0'],
  ['#ffe4f0', '#ffc8e0'],
];

function ButterflyShape({ color1, color2, size }: { color1: string; color2: string; size: number }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 60 42" fill="none">
      {/* Left wings */}
      <ellipse cx="20" cy="18" rx="18" ry="12" fill={color1} opacity="0.85" transform="rotate(-20 20 18)"/>
      <ellipse cx="18" cy="30" rx="12" ry="8" fill={color2} opacity="0.7" transform="rotate(10 18 30)"/>
      {/* Right wings */}
      <ellipse cx="40" cy="18" rx="18" ry="12" fill={color1} opacity="0.85" transform="rotate(20 40 18)"/>
      <ellipse cx="42" cy="30" rx="12" ry="8" fill={color2} opacity="0.7" transform="rotate(-10 42 30)"/>
      {/* Body */}
      <ellipse cx="30" cy="21" rx="2.5" ry="10" fill={color2} opacity="0.9"/>
      {/* Antennae */}
      <line x1="28" y1="11" x2="22" y2="4" stroke={color2} strokeWidth="1.2" opacity="0.7"/>
      <circle cx="22" cy="4" r="1.5" fill={color1} opacity="0.8"/>
      <line x1="32" y1="11" x2="38" y2="4" stroke={color2} strokeWidth="1.2" opacity="0.7"/>
      <circle cx="38" cy="4" r="1.5" fill={color1} opacity="0.8"/>
    </svg>
  );
}

export default function Butterflies({ count = 4 }: { count?: number }) {
  const butterflies: ButterflyItem[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: Math.random() * 80 + 10,
      startY: Math.random() * 80 + 10,
      color: BUTTERFLY_COLORS[i % BUTTERFLY_COLORS.length][0],
      size: 28 + Math.random() * 24,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 4,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {butterflies.map((b, i) => {
        const [c1, c2] = BUTTERFLY_COLORS[i % BUTTERFLY_COLORS.length];
        return (
          <motion.div
            key={b.id}
            className="absolute"
            style={{ left: `${b.startX}%`, top: `${b.startY}%` }}
            animate={{
              x: [0, 40, -30, 20, -10, 0],
              y: [0, -30, 20, -15, 10, 0],
              scaleX: [1, -1, 1, -1, 1],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              animate={{ scaleX: [1, 0.6, 1, 0.6, 1] }}
              transition={{ duration: 0.4, repeat: Infinity }}
            >
              <ButterflyShape color1={c1} color2={c2} size={b.size} />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
