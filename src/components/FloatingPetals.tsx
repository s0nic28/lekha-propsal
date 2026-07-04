import { useMemo } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  type: 'petal' | 'sparkle' | 'heart';
}

const COLORS = [
  'rgba(249,208,227,0.8)',
  'rgba(201,184,240,0.7)',
  'rgba(253,217,192,0.7)',
  'rgba(253,246,238,0.9)',
  'rgba(181,158,232,0.6)',
];

export default function FloatingPetals({ count = 12, include = ['petal', 'sparkle'] }: {
  count?: number;
  include?: Array<'petal' | 'sparkle' | 'heart'>;
}) {
  const petals: Petal[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 12,
      size: 8 + Math.random() * 14,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: include[Math.floor(Math.random() * include.length)],
    }));
  }, [count, include]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-5%',
            width: p.size,
            height: p.size,
            animationName: 'petal',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
          }}
        >
          {p.type === 'petal' && (
            <svg viewBox="0 0 24 24" fill={p.color}>
              <ellipse cx="12" cy="12" rx="6" ry="10" transform="rotate(45 12 12)" />
            </svg>
          )}
          {p.type === 'sparkle' && (
            <svg viewBox="0 0 24 24" fill={p.color}>
              <path d="M12 2 L13 10 L21 11 L13 12 L12 20 L11 12 L3 11 L11 10 Z" />
            </svg>
          )}
          {p.type === 'heart' && (
            <svg viewBox="0 0 24 24" fill={p.color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
