import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMusic, FiVolumeX, FiVolume2, FiVolume1 } from 'react-icons/fi';

// Generate a soft piano-like tone using Web Audio API
function createAmbientMusic(ctx: AudioContext): () => void {
  const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C major scale
  const melody = [0, 2, 4, 7, 4, 2, 0, 5, 2, 4, 7, 9, 7, 4, 2, 0];
  let noteIndex = 0;
  let timerId: ReturnType<typeof setTimeout>;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
  masterGain.connect(ctx.destination);

  // Reverb-like effect with delay
  const delay = ctx.createDelay(0.5);
  delay.delayTime.setValueAtTime(0.3, ctx.currentTime);
  const feedbackGain = ctx.createGain();
  feedbackGain.gain.setValueAtTime(0.25, ctx.currentTime);
  delay.connect(feedbackGain);
  feedbackGain.connect(delay);
  delay.connect(masterGain);

  const playNote = () => {
    const freq = notes[melody[noteIndex % melody.length]];
    noteIndex++;

    // Main oscillator (sine for softness)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Harmonic overtone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);
    gain2.gain.setValueAtTime(0.06, ctx.currentTime);

    // Envelope
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

    osc.connect(gain);
    gain.connect(masterGain);
    gain.connect(delay);

    osc2.connect(gain2);
    gain2.connect(masterGain);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2);
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + 2);

    // Low bass pad occasionally
    if (noteIndex % 4 === 0) {
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bass.type = 'sine';
      bass.frequency.setValueAtTime(freq / 2, ctx.currentTime);
      bassGain.gain.setValueAtTime(0, ctx.currentTime);
      bassGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
      bassGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
      bass.connect(bassGain);
      bassGain.connect(masterGain);
      bass.start(ctx.currentTime);
      bass.stop(ctx.currentTime + 3);
    }

    timerId = setTimeout(playNote, 600 + Math.random() * 400);
  };

  playNote();

  return () => {
    clearTimeout(timerId);
    masterGain.disconnect();
  };
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showVolume, setShowVolume] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const start = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    // Create a master gain for volume control
    if (!masterGainRef.current) {
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      masterGainRef.current.connect(audioCtxRef.current.destination);
    }

    const stop = createAmbientMusic(audioCtxRef.current);
    stopRef.current = stop;
    setPlaying(true);
  };

  const stop = () => {
    if (stopRef.current) {
      stopRef.current();
      stopRef.current = null;
    }
    setPlaying(false);
  };

  const toggle = () => {
    if (playing) stop();
    else start();
  };

  useEffect(() => {
    return () => {
      if (stopRef.current) stopRef.current();
    };
  }, []);

  const VolumeIcon = volume === 0 ? FiVolumeX : volume < 0.5 ? FiVolume1 : FiVolume2;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      {/* Volume slider */}
      <AnimatePresence>
        {showVolume && playing && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="glass rounded-full px-4 py-2.5 flex items-center gap-2 shadow-lg"
          >
            <VolumeIcon className="text-purple-400" size={14} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-20 accent-purple-400 cursor-pointer"
              style={{ accentColor: '#b59ee8' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music toggle button */}
      <motion.button
        onClick={toggle}
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="glass rounded-full w-12 h-12 flex items-center justify-center shadow-lg relative overflow-hidden group"
        style={{ cursor: 'none' }}
        title={playing ? 'Mute music' : 'Play music'}
      >
        {/* Animated rings when playing */}
        {playing && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-purple-300"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-pink-300"
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}
        <FiMusic
          size={16}
          className={playing ? 'text-purple-500' : 'text-gray-400'}
          style={{
            animation: playing ? 'float 2s ease-in-out infinite' : 'none',
          }}
        />
      </motion.button>
    </motion.div>
  );
}
