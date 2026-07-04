import { useMemo } from 'react';

const CONFETTI_COLORS = [
  '#f9d0e3', '#c9b8f0', '#fdd9c0', '#b59ee8',
  '#ffe4f0', '#d4b8f0', '#ffc8d8', '#e8d4ff',
  '#ffb3c6', '#c8b3ff',
];
const SHAPES = ['circle', 'rect', 'heart'];

interface Piece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  shape: string;
  rotate: number;
}

export default function Confetti() {
  const pieces: Piece[] = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4,
      size: 6 + Math.random() * 10,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotate: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-10px',
            animationName: 'confettiFall',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
          }}
        >
          {p.shape === 'circle' && (
            <div
              style={{
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: p.color,
              }}
            />
          )}
          {p.shape === 'rect' && (
            <div
              style={{
                width: p.size,
                height: p.size * 0.5,
                background: p.color,
                transform: `rotate(${p.rotate}deg)`,
                borderRadius: 2,
              }}
            />
          )}
          {p.shape === 'heart' && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
