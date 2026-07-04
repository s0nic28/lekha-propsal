import { motion } from 'framer-motion';

interface CatCharacterProps {
  variant?: 'happy' | 'sad' | 'kiss';
  size?: number;
  showHeart?: boolean;
}

// Pure CSS/SVG animated cat - no image required
function HappyCatSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Body */}
      <ellipse cx="60" cy="85" rx="32" ry="28" fill="#fff5f8" stroke="#f9d0e3" strokeWidth="1.5"/>
      {/* Head */}
      <circle cx="60" cy="52" r="28" fill="#fff5f8" stroke="#f9d0e3" strokeWidth="1.5"/>
      {/* Ears */}
      <polygon points="35,30 28,10 48,26" fill="#fff5f8" stroke="#f9d0e3" strokeWidth="1.5"/>
      <polygon points="85,30 92,10 72,26" fill="#fff5f8" stroke="#f9d0e3" strokeWidth="1.5"/>
      {/* Inner ears */}
      <polygon points="36,28 30,14 46,27" fill="#ffc8e0"/>
      <polygon points="84,28 90,14 74,27" fill="#ffc8e0"/>
      {/* Eyes - with blink animation */}
      <g className="cat-eyes">
        <ellipse cx="50" cy="50" rx="5" ry="6" fill="#8c6bb1"/>
        <ellipse cx="70" cy="50" rx="5" ry="6" fill="#8c6bb1"/>
        {/* Pupils */}
        <ellipse cx="51" cy="50" rx="2.5" ry="3.5" fill="#3d2b6b"/>
        <ellipse cx="71" cy="50" rx="2.5" ry="3.5" fill="#3d2b6b"/>
        {/* Eye shine */}
        <circle cx="52" cy="48" r="1.2" fill="white"/>
        <circle cx="72" cy="48" r="1.2" fill="white"/>
      </g>
      {/* Nose */}
      <ellipse cx="60" cy="58" rx="3" ry="2" fill="#f9a8c9"/>
      {/* Mouth smile */}
      <path d="M55 62 Q60 67 65 62" stroke="#f9a8c9" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Whiskers */}
      <line x1="30" y1="56" x2="52" y2="58" stroke="#c9b8f0" strokeWidth="1" opacity="0.7"/>
      <line x1="30" y1="60" x2="52" y2="60" stroke="#c9b8f0" strokeWidth="1" opacity="0.7"/>
      <line x1="68" y1="58" x2="90" y2="56" stroke="#c9b8f0" strokeWidth="1" opacity="0.7"/>
      <line x1="68" y1="60" x2="90" y2="60" stroke="#c9b8f0" strokeWidth="1" opacity="0.7"/>
      {/* Blush */}
      <ellipse cx="43" cy="62" rx="7" ry="4" fill="#ffc8e0" opacity="0.5"/>
      <ellipse cx="77" cy="62" rx="7" ry="4" fill="#ffc8e0" opacity="0.5"/>
      {/* Tail */}
      <path d="M92 90 Q105 80 100 70 Q96 62 90 68" stroke="#f9d0e3" strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* Paws */}
      <ellipse cx="45" cy="106" rx="10" ry="7" fill="#fff0f5" stroke="#f9d0e3" strokeWidth="1"/>
      <ellipse cx="75" cy="106" rx="10" ry="7" fill="#fff0f5" stroke="#f9d0e3" strokeWidth="1"/>
    </svg>
  );
}

function SadCatSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Body */}
      <ellipse cx="60" cy="85" rx="32" ry="28" fill="#f0eaff" stroke="#c9b8f0" strokeWidth="1.5"/>
      {/* Head */}
      <circle cx="60" cy="52" r="28" fill="#f0eaff" stroke="#c9b8f0" strokeWidth="1.5"/>
      {/* Ears - droopy */}
      <polygon points="35,32 26,12 46,28" fill="#f0eaff" stroke="#c9b8f0" strokeWidth="1.5"/>
      <polygon points="85,32 94,12 74,28" fill="#f0eaff" stroke="#c9b8f0" strokeWidth="1.5"/>
      <polygon points="36,30 28,15 45,28" fill="#ddd0ff"/>
      <polygon points="84,30 92,15 75,28" fill="#ddd0ff"/>
      {/* Sad eyes */}
      <ellipse cx="50" cy="52" rx="5" ry="4" fill="#8c6bb1"/>
      <ellipse cx="70" cy="52" rx="5" ry="4" fill="#8c6bb1"/>
      {/* Downward eyebrows for sadness */}
      <path d="M44 44 Q50 46 56 44" stroke="#8c6bb1" strokeWidth="2" fill="none"/>
      <path d="M64 44 Q70 46 76 44" stroke="#8c6bb1" strokeWidth="2" fill="none"/>
      {/* Pupils */}
      <ellipse cx="50" cy="52" rx="2.5" ry="2.5" fill="#3d2b6b"/>
      <ellipse cx="70" cy="52" rx="2.5" ry="2.5" fill="#3d2b6b"/>
      {/* Tear drops */}
      <ellipse cx="47" cy="60" rx="2" ry="3" fill="#b0c8ff" opacity="0.7"/>
      <ellipse cx="73" cy="60" rx="2" ry="3" fill="#b0c8ff" opacity="0.7"/>
      {/* Nose */}
      <ellipse cx="60" cy="59" rx="3" ry="2" fill="#c9b8f0"/>
      {/* Mouth - sad */}
      <path d="M55 65 Q60 62 65 65" stroke="#c9b8f0" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Whiskers */}
      <line x1="30" y1="58" x2="52" y2="59" stroke="#c9b8f0" strokeWidth="1" opacity="0.6"/>
      <line x1="30" y1="62" x2="52" y2="61" stroke="#c9b8f0" strokeWidth="1" opacity="0.6"/>
      <line x1="68" y1="59" x2="90" y2="58" stroke="#c9b8f0" strokeWidth="1" opacity="0.6"/>
      <line x1="68" y1="61" x2="90" y2="62" stroke="#c9b8f0" strokeWidth="1" opacity="0.6"/>
      {/* Paws with waving motion */}
      <ellipse cx="45" cy="106" rx="10" ry="7" fill="#ede0ff" stroke="#c9b8f0" strokeWidth="1"/>
      {/* Raised waving paw */}
      <g style={{ transformOrigin: '75px 95px', animation: 'waveHand 1.5s ease-in-out infinite' }}>
        <ellipse cx="80" cy="88" rx="8" ry="6" fill="#ede0ff" stroke="#c9b8f0" strokeWidth="1" transform="rotate(-30 80 88)"/>
      </g>
    </svg>
  );
}

function KissCatSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 200 120" fill="none">
      {/* Left cat */}
      <circle cx="55" cy="55" r="26" fill="#fff5f8" stroke="#f9d0e3" strokeWidth="1.5"/>
      <polygon points="33,33 26,14 46,30" fill="#fff5f8" stroke="#f9d0e3" strokeWidth="1.5"/>
      <polygon points="34,31 28,16 45,30" fill="#ffc8e0"/>
      <ellipse cx="47" cy="52" rx="4.5" ry="5" fill="#8c6bb1"/>
      <ellipse cx="47" cy="52" rx="2" ry="3" fill="#3d2b6b"/>
      <circle cx="48" cy="50" r="1" fill="white"/>
      <ellipse cx="63" cy="52" rx="4.5" ry="5" fill="#8c6bb1"/>
      <ellipse cx="63" cy="52" rx="2" ry="3" fill="#3d2b6b"/>
      <circle cx="64" cy="50" r="1" fill="white"/>
      <ellipse cx="55" cy="60" rx="3" ry="2" fill="#f9a8c9"/>
      <path d="M51 64 Q55 60 59 64" stroke="#f9a8c9" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="41" cy="63" rx="6" ry="3.5" fill="#ffc8e0" opacity="0.5"/>
      <ellipse cx="69" cy="63" rx="6" ry="3.5" fill="#ffc8e0" opacity="0.5"/>

      {/* Right cat - mirrored */}
      <circle cx="145" cy="55" r="26" fill="#f0eaff" stroke="#c9b8f0" strokeWidth="1.5"/>
      <polygon points="167,33 174,14 154,30" fill="#f0eaff" stroke="#c9b8f0" strokeWidth="1.5"/>
      <polygon points="166,31 172,16 155,30" fill="#ddd0ff"/>
      <ellipse cx="137" cy="52" rx="4.5" ry="5" fill="#8c6bb1"/>
      <ellipse cx="137" cy="52" rx="2" ry="3" fill="#3d2b6b"/>
      <circle cx="138" cy="50" r="1" fill="white"/>
      <ellipse cx="153" cy="52" rx="4.5" ry="5" fill="#8c6bb1"/>
      <ellipse cx="153" cy="52" rx="2" ry="3" fill="#3d2b6b"/>
      <circle cx="154" cy="50" r="1" fill="white"/>
      <ellipse cx="145" cy="60" rx="3" ry="2" fill="#c9b8f0"/>
      <path d="M141 64 Q145 60 149 64" stroke="#c9b8f0" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="131" cy="63" rx="6" ry="3.5" fill="#c9b8f0" opacity="0.4"/>
      <ellipse cx="159" cy="63" rx="6" ry="3.5" fill="#c9b8f0" opacity="0.4"/>

      {/* Nuzzling area */}
      <ellipse cx="100" cy="60" rx="18" ry="12" fill="rgba(255,200,220,0.2)"/>
      {/* Hearts between them */}
      <path d="M100 45 L101 40 L106 35 Q112 30 112 37 Q112 42 106 46 L100 51 L94 46 Q88 42 88 37 Q88 30 94 35 L99 40 Z" fill="#f9d0e3" opacity="0.9"/>
    </svg>
  );
}

export default function CatCharacter({ variant = 'happy', size = 160, showHeart = true }: CatCharacterProps) {
  return (
    <div className="relative inline-block select-none">
      {/* Floating heart above cat */}
      {showHeart && (
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl z-10"
          animate={{ y: [-4, -14, -4], opacity: [0.8, 1, 0.8], scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          💜
        </motion.div>
      )}

      {/* Cat body with gentle float */}
      <motion.div
        animate={variant !== 'sad' ? { y: [0, -8, 0] } : { rotate: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {variant === 'happy' && <HappyCatSVG size={size} />}
        {variant === 'sad' && <SadCatSVG size={size} />}
        {variant === 'kiss' && <KissCatSVG size={size} />}
      </motion.div>

      {/* Soft glow under cat */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: size * 0.7,
          height: 20,
          background: variant === 'sad'
            ? 'radial-gradient(ellipse, rgba(201,184,240,0.35), transparent)'
            : 'radial-gradient(ellipse, rgba(249,208,227,0.5), transparent)',
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
}
