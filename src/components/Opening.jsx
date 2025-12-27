import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Opening = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("loading");
  const [typedText, setTypedText] = useState("");
  const fullText = "自豪地呈现";

  useEffect(() => {
    let currentIndex = 0;
    const typingTimer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex += 1;
      } else {
        clearInterval(typingTimer);
      }
    }, 80);
    return () => clearInterval(typingTimer);
  }, []);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setStage("entering");
          setTimeout(() => {
            setStage("complete");
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800);
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black/85 backdrop-blur-sm pointer-events-auto text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === "complete" ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ pointerEvents: stage === "complete" ? "none" : "auto" }}
    >
      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12 px-4">
        <motion.div
          className="relative"
          initial={{ scale: 0.94, opacity: 0, y: 24, rotate: 4, filter: "blur(6px)" }}
          animate={
            stage === "complete"
              ? { scale: 0.9, opacity: 0, y: -24, rotate: -6, filter: "blur(4px)" }
              : {
                  scale: [0.94, 1.02, 1],
                  opacity: [0, 1, 1],
                  y: [24, -8, 0],
                  rotate: [4, -2, 0],
                  filter: ["blur(6px)", "blur(2px)", "blur(0px)"],
                }
          }
          transition={{ duration: 1.1, ease: [0.16, 0.84, 0.44, 1], times: [0, 0.55, 1] }}
        >
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
            <div className="relative w-full h-full rounded-full shadow-xl overflow-hidden border-2 sm:border-4 border-white/20 bg-[#0f1116]">
              <img src="/img/meow.jpg" alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-white/15" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-sm"
            style={{ fontFamily: '"Space Grotesk", "Inter", system-ui, sans-serif', fontWeight: 800 }}
          >
            Hao!
          </h1>
          <div
            className="text-white/90 text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase h-9 sm:h-10 flex items-center justify-center"
            style={{ fontFamily: "monospace" }}
          >
            <span className="text-white">{typedText}</span>
            <motion.span
              className="inline-block w-1 h-6 bg-white ml-1.5 rounded-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-xs sm:max-w-sm md:max-w-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between gap-4 mb-4 text-base w-full">
            <span className="flex-1 text-left text-white/80 text-sm sm:text-base font-semibold">Tunggu bentar yaa..</span>
            <span
              className="min-w-[64px] text-right text-white font-black text-2xl sm:text-3xl tracking-tighter tabular-nums"
              style={{ fontWeight: 900 }}
            >
              {progress}%
            </span>
          </div>

          <div className="relative h-5 sm:h-6 bg-white/15 rounded-full overflow-hidden border border-white/25 shadow-md">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "linear" }}
            >
              <div className="absolute inset-0 bg-white/60" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Opening;
