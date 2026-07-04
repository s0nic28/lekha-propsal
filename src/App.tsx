import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import FloatingPetals from './components/FloatingPetals';
import Butterflies from './components/Butterflies';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import StorySections from './components/StorySection';
import QuestionSection from './components/QuestionSection';
import YesExperience from './components/YesExperience';
import NoExperience from './components/NoExperience';
import ProgressIndicator from './components/ProgressIndicator';
import LoadingScreen from './components/LoadingScreen';

type Stage = 'loading' | 'hero' | 'story' | 'question' | 'yes' | 'no';

const PAGE_TRANSITIONS = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

const STORY_STEPS = 5;

function getProgressIndex(stage: Stage): number {
  switch (stage) {
    case 'hero':     return 0;
    case 'story':    return 2;
    case 'question': return 4;
    default:         return 4;
  }
}

export default function App() {
  const [stage, setStage] = useState<Stage>('loading');
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollTop = () => {
    setTimeout(() => {
      mainRef.current?.scrollTo({ top: 0, behavior: 'instant' });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 50);
  };

  const goToHero     = () => { setStage('hero');     scrollTop(); };
  const goToStory    = () => { setStage('story');    scrollTop(); };
  const goToQuestion = () => { setStage('question'); scrollTop(); };
  const goToYes      = () => { setStage('yes');      scrollTop(); };
  const goToNo       = () => { setStage('no');       scrollTop(); };

  const isAmbient = stage !== 'yes' && stage !== 'no' && stage !== 'loading';
  const showProgress = stage === 'story' || stage === 'question';

  return (
    <div ref={mainRef} className="relative" style={{ minHeight: '100dvh' }}>
      {/* Custom cursor — desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Ambient floating elements */}
      {isAmbient && (
        <>
          <FloatingPetals count={12} include={['petal', 'sparkle']} />
          <Butterflies count={3} />
        </>
      )}

      {/* YES experience extra flourishes */}
      {stage === 'yes' && (
        <>
          <FloatingPetals count={10} include={['heart', 'petal']} />
          <Butterflies count={5} />
        </>
      )}

      {/* Progress indicator */}
      <AnimatePresence>
        {showProgress && (
          <ProgressIndicator
            current={getProgressIndex(stage)}
            total={STORY_STEPS}
          />
        )}
      </AnimatePresence>

      {/* Music player */}
      {stage !== 'loading' && <MusicPlayer />}

      {/* ── Page routing with transitions ── */}
      <AnimatePresence mode="wait">

        {stage === 'loading' && (
          <motion.div key="loading" className="fixed inset-0 z-[200]">
            <LoadingScreen onComplete={goToHero} />
          </motion.div>
        )}

        {stage === 'hero' && (
          <motion.div
            key="hero"
            {...PAGE_TRANSITIONS}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroSection onOpen={goToStory} />
          </motion.div>
        )}

        {stage === 'story' && (
          <motion.div
            key="story"
            {...PAGE_TRANSITIONS}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <StorySections />
            <StoryEndButton onContinue={goToQuestion} />
          </motion.div>
        )}

        {stage === 'question' && (
          <motion.div
            key="question"
            {...PAGE_TRANSITIONS}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <QuestionSection onYes={goToYes} onNo={goToNo} />
          </motion.div>
        )}

        {stage === 'yes' && (
          <motion.div
            key="yes"
            {...PAGE_TRANSITIONS}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <YesExperience onBack={goToHero} />
          </motion.div>
        )}

        {stage === 'no' && (
          <motion.div
            key="no"
            {...PAGE_TRANSITIONS}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <NoExperience onBack={goToHero} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

/* ─── Story-End "Continue" section ──────────────────────── */
function StoryEndButton({ onContinue }: { onContinue: () => void }) {
  return (
    <section
      className="relative flex flex-col items-center justify-center gap-8 px-6 py-24"
      style={{
        background: 'linear-gradient(160deg, #fdf6ee 0%, #fce4f1 50%, #ede0f9 100%)',
        minHeight: '45vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-7 text-center"
      >
        {/* Decorative line */}
        <div
          className="h-px w-36 mx-auto"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,184,240,0.7), transparent)' }}
        />

        {/* Prompt text */}
        <p
          className="font-serif-display italic"
          style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.7rem)',
            color: 'rgba(90,60,140,0.8)',
          }}
        >
          Are you ready for what comes next? ✨
        </p>

        {/* Dot pulse loader */}
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#c9b8f0' }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.4, delay: i * 0.25, repeat: Infinity }}
            />
          ))}
        </div>

        {/* Continue button */}
        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.07, y: -4 }}
          whileTap={{ scale: 0.96 }}
          className="relative group px-14 py-5 rounded-full font-semibold tracking-wider overflow-hidden pulse-glow-btn"
          style={{
            background: 'linear-gradient(135deg, rgba(201,184,240,0.92), rgba(249,208,227,0.9))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.7)',
            color: '#5b3f8c',
            cursor: 'none',
            boxShadow: '0 8px 32px rgba(201,184,240,0.4), inset 0 1px 0 rgba(255,255,255,0.6)',
            fontSize: '1.05rem',
          }}
        >
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite',
            }}
          />
          <span className="relative font-playfair">Continue →</span>
        </motion.button>

        {/* Decorative line */}
        <div
          className="h-px w-36 mx-auto"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(249,208,227,0.7), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
