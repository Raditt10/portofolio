import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Opening = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading -> hello -> complete

  // --- PROGRESS LOGIC ---
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setPhase("hello"); // Pindah ke phase Hello World
          
          // Tahan tulisan Hello World selama 2.5 detik, baru exit
          setTimeout(() => {
            setPhase("complete");
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800); // Waktu untuk animasi exit selesai
          }, 2500);
          
          return 100;
        }
        // Random increment agar terasa organik
        return Math.min(prev + Math.random() * 4, 100);
      });
    }, 30);
    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "hidden" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
          // Exit Animation (Zoom In & Fade Out)
          animate={
            phase === "complete" 
              ? { scale: 1.5, opacity: 0, filter: "blur(10px)" } 
              : { scale: 1, opacity: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Grid (Tech Vibe) */}
          <div 
            className="absolute inset-0 opacity-[0.1] pointer-events-none" 
            style={{ 
                backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, 
                backgroundSize: '40px 40px' 
            }} 
          />

          <AnimatePresence mode="wait">
            {/* --- PHASE 1: LOADING SPINNER --- */}
            {phase === "loading" && (
              <motion.div
                key="spinner"
                className="relative flex flex-col items-center justify-center"
                exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
              >
                 {/* Tech Spinner Container */}
                 <div className="relative w-64 h-64 flex items-center justify-center">
                    {/* Outer Ring */}
                    <motion.div 
                        className="absolute w-48 h-48 rounded-full border border-dashed border-gray-600"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Middle Ring */}
                    <motion.div 
                        className="absolute w-32 h-32 rounded-full border-t-2 border-l-2 border-white"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Inner Ring */}
                    <motion.div 
                        className="absolute w-24 h-24 rounded-full border-b-2 border-r-2 border-gray-400"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Core Pulse */}
                    <motion.div 
                        className="absolute w-3 h-3 bg-white rotate-45"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                 </div>

                 {/* Loading Text */}
                 <div className="mt-8 text-center">
                    <div className="flex items-end gap-1 justify-center">
                        <span className="text-4xl font-black tracking-tighter font-mono">
                            {Math.floor(progress)}
                        </span>
                        <span className="text-lg font-bold mb-1">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 tracking-[0.2em] font-mono uppercase">
                        System Initialization
                    </p>
                 </div>
              </motion.div>
            )}

            {/* --- PHASE 2: HELLO WORLD (IMPACT & GLITCH) --- */}
            {phase === "hello" && (
              <motion.div
                key="hello"
                className="relative z-20 flex flex-col items-center justify-center w-full px-4"
                initial={{ scale: 2, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
              >
                {/* Glitch Effect Text Container */}
                <div className="relative text-center w-full">
                    {/* Main Text */}
                    <h1 
                        className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mix-blend-difference relative z-10"
                        style={{ fontFamily: '"Sensei Biased", sans-serif' }}
                    >
                        HELLO WORLD
                    </h1>
                    
                    {/* Red Shadow Glitch Layer (FIXED: w-full & text-center) */}
                    <motion.h1 
                        className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-red-500 absolute top-0 left-0 w-full text-center -z-10 opacity-70"
                        style={{ fontFamily: '"Sensei Biased", sans-serif' }}
                        animate={{ x: [-2, 2, -1, 0], y: [1, -1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.2, repeatType: "mirror" }}
                    >
                        HELLO WORLD
                    </motion.h1>
                    
                    {/* Cyan Shadow Glitch Layer (FIXED: w-full & text-center) */}
                    <motion.h1 
                        className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-cyan-500 absolute top-0 left-0 w-full text-center -z-10 opacity-70"
                        style={{ fontFamily: '"Sensei Biased", sans-serif' }}
                        animate={{ x: [2, -2, 1, 0], y: [-1, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.2, delay: 0.1, repeatType: "mirror" }}
                    >
                        HELLO WORLD
                    </motion.h1>
                </div>

                {/* Subtext Anime Style */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 flex flex-col items-center gap-2 text-center"
                >
                    <div className="h-px w-24 bg-white/50" />
                    <p className="text-xs sm:text-sm md:text-base font-mono tracking-[0.3em] sm:tracking-[0.5em] text-gray-300 uppercase break-words px-2">
                        世界よ、こんにちは
                    </p>
                    <p className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest">
                        System Online
                    </p>
                </motion.div>

                {/* Scanline Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-2 w-full animate-scan pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative Corners */}
          <div className="fixed top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/30" />
          <div className="fixed top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/30" />
          <div className="fixed bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/30" />
          <div className="fixed bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/30" />

        </motion.div>
      )}
      
      <style jsx>{`
        @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
        }
        .animate-scan {
            animation: scan 2s linear infinite;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default Opening;