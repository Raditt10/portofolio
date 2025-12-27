import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Opening = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('loading'); // loading, entering, complete
  const [typedText, setTypedText] = useState('');
  
  const fullText = "自豪地呈现";

  useEffect(() => {
    // Typing animation
    let currentIndex = 0;
    const typingTimer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingTimer);
      }
    }, 80);

    return () => clearInterval(typingTimer);
  }, []);

  useEffect(() => {
    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setStage('entering');
          setTimeout(() => {
            setStage('complete');
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
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#030303] via-[#050608] to-[#0b0d11] pointer-events-auto text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'complete' ? 0 : 1 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      style={{ pointerEvents: stage === 'complete' ? 'none' : 'auto' }}
    >
      {/* Luxurious static backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial gradients for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.06),transparent_50%)]" />
        
        {/* Elegant vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Linux Window Background di tengah */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative w-[90%] max-w-2xl h-[80vh] max-h-[600px]">
          {/* Linux Window Container - Ubuntu GNOME Style */}
          <div className="absolute inset-0 rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.3)] border border-gray-800/30 overflow-hidden backdrop-blur-sm">
            {/* Title Bar (Ubuntu GNOME style) */}
            <div className="absolute top-0 left-0 right-0 h-11 bg-gradient-to-b from-[#2d2d2d] via-[#2a2a2a] to-[#262626] border-b border-black/40 flex items-center px-3 shadow-sm">
              {/* Window Control Buttons - Left side like Ubuntu */}
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#ee6a5f] to-[#d85f54] hover:brightness-110 cursor-pointer shadow-md border border-red-900/20" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#f5bd4f] to-[#e0a93a] hover:brightness-110 cursor-pointer shadow-md border border-yellow-900/20" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#61c454] to-[#52a845] hover:brightness-110 cursor-pointer shadow-md border border-green-900/20" />
              </div>
              
              {/* Window Title */}
              <div className="flex-1 flex items-center justify-center">
                <span className="text-gray-300 text-sm font-semibold tracking-wide" style={{ fontFamily: 'Ubuntu, system-ui, sans-serif' }}>
                  portfolio.app
                </span>
              </div>
              
              {/* Right side placeholder for symmetry */}
              <div className="w-24" />
            </div>
            
            {/* Window Body - Warm Amber tone */}
            <div className="absolute top-11 left-0 right-0 bottom-0 bg-gradient-to-br from-[#fef3e2] via-[#fdf5e6] to-[#fdefd4]">
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(139,69,19,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,69,19,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />
              
              {/* Noise texture for depth */}
              <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
              }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Planet Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0.85, rotate: -90 }}
          animate={{ 
            scale: stage === 'entering' ? 1.08 : 1,
            rotate: stage === 'entering' ? 180 : 0,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Planet Core */}
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            {/* Soft glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-white/8 to-white/12 blur-2xl" />

            <div className="relative w-full h-full rounded-full shadow-2xl overflow-hidden border-4 border-white/20 bg-[#0f1116]">
              <img 
                src="/img/meow.jpg" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-white/15" />
            </div>
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 mb-3 tracking-tight drop-shadow-sm" style={{ fontFamily: '"Space Grotesk", "Inter", system-ui, sans-serif', fontWeight: 800 }}>
            Hao!
          </h1>
          <div className="text-amber-800/90 text-xl md:text-2xl font-bold tracking-[0.25em] uppercase h-10 flex items-center justify-center" style={{ fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-700 via-amber-800 to-orange-700">{typedText}</span>
            <motion.span
              className="inline-block w-1 h-6 bg-amber-800 ml-1.5 rounded-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Progress Bar Container */}
        <motion.div
          className="w-72 md:w-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Progress Label */}
          <div className="flex justify-between items-center mb-4 text-base">
            <span className="text-amber-800/80 font-semibold tracking-wide" style={{ fontFamily: '"Ubuntu", system-ui, sans-serif' }}>
              Tunggu bentar yaa..
            </span>
            <span className="text-amber-900 font-black text-3xl tracking-tighter tabular-nums" style={{ fontFamily: '"Space Grotesk", "Inter", system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.05em' }}>
              {progress}%
            </span>
          </div>

          <div className="relative h-6 bg-gradient-to-r from-amber-100/80 via-amber-50/70 to-amber-100/80 rounded-full overflow-hidden backdrop-blur border-2 border-amber-300/40 shadow-lg">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 rounded-full shadow-[0_0_25px_rgba(251,146,60,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {/* Inner shine effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-black/10 rounded-full" />
              {/* Glossy highlight */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/60 to-transparent rounded-full" />
            </motion.div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default Opening;