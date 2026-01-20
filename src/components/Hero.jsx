import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const containerRef = useRef(null);
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === 'light';

  // --- THEME SYNC ---
  useEffect(() => {
    const updateTheme = () => {
      setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const name = "Rafaditya Syahputra";

  return (
    <header
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 px-4"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? 'bg-white' : 'bg-black'}`} />
        <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
                backgroundImage: `linear-gradient(${isLight ? '#000' : '#fff'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? '#000' : '#fff'} 1px, transparent 1px)`, 
                backgroundSize: '40px 40px' 
            }} 
        />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${isLight ? 'bg-gray-200' : 'bg-white/5'}`} />
      </div>

      {/* --- MAIN CONTENT --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center w-full max-w-7xl mx-auto"
      >
        {/* 1. GREETING */}
        <motion.p variants={itemVariants} className={`text-sm md:text-lg font-bold tracking-[0.2em] uppercase mb-4 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            Hi, I'm
        </motion.p>

        {/* 2. NAME (PERBAIKAN UTAMA DI SINI) */}
        <motion.h1 
            // Mengurangi sedikit ukuran font mobile dari 12vw ke 11vw agar lebih aman
            className={`text-[11vw] sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 font-comic`}
            style={{ 
                fontFamily: '"Sensei Biased", system-ui, sans-serif',
                color: isLight ? '#000' : '#fff'
            }}
        >
            {/* Logic: Pisah per KATA dulu, baru per HURUF */}
            {name.split(" ").map((word, wordIndex) => (
                // whitespace-nowrap menjaga agar kata "Syahputra" tidak terpotong di tengah
                <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            className="inline-block"
                            variants={letterVariants}
                            transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.h1>

        {/* 3. ROLES */}
        <motion.div variants={itemVariants} className="mb-8">
            <div className={`text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.15em] ${isLight ? 'text-gray-800' : 'text-gray-200'} flex flex-wrap justify-center gap-y-2`}>
                <span className="inline-block px-3 py-1 border border-current rounded-full">
                    Front End Developer
                </span>
                <span className="hidden sm:inline-block mx-2 self-center">•</span>
                <span className="inline-block px-3 py-1 border border-current rounded-full">
                    UI/UX Designer
                </span>
                <span className="hidden sm:inline-block mx-2 self-center">•</span>
                <span className="inline-block px-3 py-1 border border-current rounded-full">
                    Graphic Designer
                </span>  
            </div>
        </motion.div>

        {/* 4. QUOTE */}
        <motion.p 
            variants={itemVariants} 
            className={`max-w-xl mx-auto text-xs sm:text-sm md:text-base italic font-serif leading-relaxed px-6 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}
        >
            “Bǎoshí bù jīng móliàn jiù bù huì fāguāng, rén bù jīngguò tiǎozhàn jiù bù huì chénggōng.”
        </motion.p>

        {/* 5. GITHUB BUTTON */}
        <motion.div variants={itemVariants} className="mt-12">
            <a
                href="https://github.com/raditt10"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border transition-all duration-500 ${
                    isLight 
                        ? 'bg-black border-black text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-black/20' 
                        : 'bg-white border-white text-black hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20'
                }`}
            >
                <svg className="w-5 h-5 fill-current transition-transform duration-500 group-hover:rotate-[360deg]" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span className="font-bold text-sm tracking-wide">GITHUB</span>
            </a>
        </motion.div>
      </motion.div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className={`w-[1px] h-16 overflow-hidden ${isLight ? 'bg-gray-200' : 'bg-gray-800'}`}>
            <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className={`w-full h-1/2 ${isLight ? 'bg-black' : 'bg-white'}`}
            />
        </div>
      </motion.div>
    </header>
  );
};

export default Hero;