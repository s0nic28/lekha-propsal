import { useMemo } from 'react';

interface SparkleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const SPARKLE_COLORS = ['#c9b8f0', '#f9d0e3', '#fdd9c0', '#b59ee8', '#ffe4f0'];

export default function SparkleEffect({ count = 8 }: { count?: number }) {
  const sparkles: SparkleItem[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 6 + Math.random() * 12,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
      color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map(s => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationName: 'sparkle',
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        >
          <svg
            width={s.size}
            height={s.size}
            viewBox="0 0 24 24"
            fill={s.color}
          >
            <path d="M12 2 L13.5 9.5 L21 11 L13.5 12.5 L12 20 L10.5 12.5 L3 11 L10.5 9.5 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
