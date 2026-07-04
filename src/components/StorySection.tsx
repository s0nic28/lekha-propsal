import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SparkleEffect from './SparkleEffect';

interface StorySectionProps {
  index: number;
  quote: string;
  emoji: string;
  accent: string;
  side?: 'left' | 'right' | 'center';
}

const floatingHearts = ['💜', '🩷', '✨', '🌸', '💫'];

export function StorySection({ index, quote, emoji, accent, side = 'center' }: StorySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const slideDir = side === 'left' ? -60 : side === 'right' ? 60 : 0;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
      style={{ background: accent }}
    >
      <SparkleEffect count={6} />

      {/* Background number */}
      <div
        className="absolute font-playfair font-bold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(8rem, 25vw, 18rem)',
          color: 'rgba(255,255,255,0.25)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, x: slideDir }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        {/* Top decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px mb-10 mx-auto w-32"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(181,158,232,0.6), transparent)' }}
        />

        {/* Emoji */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 250 }}
          className="text-5xl mb-8 block"
        >
          {emoji}
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif-display italic leading-relaxed mb-10"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
            color: '#4a3070',
            textShadow: '0 2px 20px rgba(181,158,232,0.2)',
            lineHeight: 1.5,
          }}
        >
          "{quote}"
        </motion.blockquote>

        {/* Floating hearts row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center gap-3"
        >
          {floatingHearts.map((h, i) => (
            <motion.span
              key={i}
              className="text-xl"
              animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2 + i * 0.3, delay: i * 0.2, repeat: Infinity }}
            >
              {h}
            </motion.span>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-px mt-10 mx-auto w-32"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(249,208,227,0.6), transparent)' }}
        />
      </motion.div>

      {/* Side decorative elements */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 hidden lg:flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-purple-300"
          />
        ))}
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 hidden lg:flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, delay: i * 0.4 + 0.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-pink-300"
          />
        ))}
      </div>
    </section>
  );
}

const STORY_DATA = [
  {
    quote: "I didn't expect someone like you to become so important to me.",
    emoji: '🌸',
    accent: 'linear-gradient(160deg, #fce4f1 0%, #ede0f9 50%, #fdf6ee 100%)',
    side: 'left' as const,
  },
  {
    quote: 'You make ordinary days feel special.',
    emoji: '✨',
    accent: 'linear-gradient(160deg, #ede0f9 0%, #fdd9c0 50%, #fce4f1 100%)',
    side: 'right' as const,
  },
  {
    quote: 'Every conversation with you becomes one of my favorite memories.',
    emoji: '💜',
    accent: 'linear-gradient(160deg, #fdf6ee 0%, #fce4f1 50%, #ede0f9 100%)',
    side: 'center' as const,
  },
];

export default function StorySections() {
  return (
    <>
      {STORY_DATA.map((story, i) => (
        <StorySection key={i} index={i} {...story} />
      ))}
    </>
  );
}
