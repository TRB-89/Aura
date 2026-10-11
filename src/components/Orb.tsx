import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface OrbProps {
  stateText?: string;
  isListening?: boolean;
  isSpeaking?: boolean;
  size?: 'normal' | 'compact' | 'large';
  onClick?: () => void;
}

export const Orb: React.FC<OrbProps> = ({
  stateText = "I'm listening.",
  isListening = true,
  isSpeaking = false,
  size = 'normal',
  onClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Outer glow and inner sphere dimension sizing
  const dimensions = {
    compact: { outer: 180, mid: 120, inner: 76 },
    normal: { outer: 260, mid: 170, inner: 110 },
    large: { outer: 300, mid: 200, inner: 130 },
  }[size];

  // Draw subtle audio wave if active
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.beginPath();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = 'rgba(212, 184, 146, 0.55)';

      const amp = isSpeaking ? 16 : isListening ? 7 : 2;
      const freq = 0.04;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * freq + phase) * amp * Math.sin((x / width) * Math.PI);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += isSpeaking ? 0.08 : 0.035;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isListening, isSpeaking]);

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
      onClick={onClick}
    >
      <div
        className="orb-container"
        style={{
          width: dimensions.outer,
          height: dimensions.outer,
        }}
      >
        {/* Outer radial glow */}
        <motion.div
          className="orb-glow-outer"
          animate={{
            scale: isSpeaking ? [1, 1.25, 1.05] : isListening ? [0.95, 1.15, 0.98] : 0.9,
            opacity: isSpeaking ? [0.75, 1, 0.8] : [0.55, 0.85, 0.6],
          }}
          transition={{
            duration: isSpeaking ? 2.2 : 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: dimensions.outer,
            height: dimensions.outer,
          }}
        />

        {/* Mid glow */}
        <div
          className="orb-glow-mid"
          style={{
            width: dimensions.mid,
            height: dimensions.mid,
          }}
        />

        {/* Inner solid sphere */}
        <motion.div
          className="orb-inner-sphere"
          animate={{
            scale: isSpeaking ? [1, 1.08, 0.98, 1] : [1, 1.03, 1],
          }}
          transition={{
            duration: isSpeaking ? 2.5 : 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: dimensions.inner,
            height: dimensions.inner,
          }}
        />
      </div>

      {/* State label */}
      {stateText && (
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: size === 'compact' ? '1.25rem' : '1.75rem',
              color: 'var(--color-white-cream)',
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
              marginBottom: 8,
            }}
          >
            "{stateText}"
          </p>

          {/* Waveform indicator canvas */}
          <canvas
            ref={canvasRef}
            width={180}
            height={28}
            style={{ display: 'block', margin: '0 auto', opacity: 0.85 }}
          />
        </div>
      )}
    </div>
  );
};
