import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FULL_NAME = "BARANIKUMAR";
const INITIALS = "BK";

export default function CinematicTitleCard({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 3000);
    const t2 = setTimeout(() => setPhase(3), 7000);
    const t3 = setTimeout(() => onFinish(), 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  // Phase 1: BK entry
  const shakePulse = phase === 1 ? {
    scale: [0.5, 1.05, 1, 1.08, 1],
    x: [0, -10, 10, -8, 8, 0],
    y: [0, 8, -8, 10, -10, 0],
    transition: {
      duration: 1.1,
      times: [0, 0.18, 0.36, 0.54, 0.72, 1],
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: 'easeInOut' as const
    }
  } : {};

  // Phase 2: Name reveal
  const nameContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0, filter: "blur(8px)", transition: { duration: 1.2, ease: 'easeInOut' as const } }
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 20, scale: 1.1, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: 'spring' as const, stiffness: 400, damping: 18 } }
  };
  // Special vibration for first letter B
  const vibrateB = {
    scale: [1.1, 1.2, 0.95, 1.05, 1],
    x: [0, -2, 2, -1, 1, 0],
    transition: { duration: 0.7, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 3 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Soft purple fog/glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full bg-purple-700 opacity-25 blur-3xl" style={{ filter: "blur(100px)" }} />
        </div>
        {/* Phase 1: BK */}
        {phase === 1 && (
          <motion.span
            className="text-[4rem] md:text-[7rem] font-extrabold tracking-widest text-center select-none font-orbitron drop-shadow-[0_0_48px_#a855f7] uppercase"
            style={{
              color: "#fff",
              textShadow: "0 0 48px #a855f7, 0 0 120px #a855f7, 0 0 12px #fff",
              letterSpacing: "0.22em"
            }}
            animate={shakePulse}
          >
            {INITIALS}
          </motion.span>
        )}
        {/* Phase 2: Name reveal */}
        {phase === 2 && (
          <motion.div
            className="relative flex flex-col items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={nameContainerVariants}
          >
            <span className="text-[2.5rem] md:text-[5rem] font-extrabold tracking-widest text-center select-none font-orbitron drop-shadow-[0_0_32px_#a855f7] uppercase"
              style={{
                color: "#fff",
                textShadow: "0 0 32px #a855f7, 0 0 80px #a855f7, 0 0 8px #fff",
                letterSpacing: "0.18em"
              }}
            >
              {FULL_NAME.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className="inline-block"
                  animate={i === 0 ? vibrateB : undefined}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
} 