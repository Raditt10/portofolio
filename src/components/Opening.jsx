import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const GlitchText = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10" style={{
        textShadow: "0 0 10px rgba(255, 0, 222, 0.8), 0 0 20px rgba(0, 255, 249, 0.6)"
      }}>{children}</span>
      <span
        className="absolute top-0 left-0 z-0"
        style={{
          color: "#ff00de",
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
          animation: "glitch-1 0.3s infinite",
          textShadow: "0 0 8px #ff00de, 0 0 16px #ff00de",
        }}
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 z-0"
        style={{
          color: "#00fff9",
          clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
          animation: "glitch-2 0.3s infinite",
          textShadow: "0 0 8px #00fff9, 0 0 16px #00fff9",
        }}
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 z-0"
        style={{
          color: "#ffff00",
          clipPath: "polygon(0 25%, 100% 25%, 100% 75%, 0 75%)",
          animation: "glitch-3 0.4s infinite",
          opacity: 0.3,
        }}
      >
        {children}
      </span>
    </div>
  );
};

const CountUpGlitch = ({ from, to, duration = 1000, onComplete }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCount(Math.floor(from + (to - from) * progress));

      if (progress >= 1) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 16);

    return () => clearInterval(timer);
  }, [from, to, duration, onComplete]);

  return (
    <GlitchText className="text-white font-extrabold text-7xl md:text-8xl lg:text-9xl">
      {count.toLocaleString()}
    </GlitchText>
  );
};

const Opening = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const containerControls = useAnimation();
  const scanlineControls = useAnimation();
  const [showCount, setShowCount] = useState(true);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes glitch-1 {
        0%, 100% { transform: translate(0); }
        10% { transform: translate(-8px, 4px); }
        20% { transform: translate(-4px, -6px); }
        30% { transform: translate(6px, 3px); }
        40% { transform: translate(-5px, -3px); }
        50% { transform: translate(7px, 2px); }
        60% { transform: translate(-3px, 5px); }
        70% { transform: translate(4px, -4px); }
        80% { transform: translate(-6px, 2px); }
        90% { transform: translate(5px, -5px); }
      }

      @keyframes glitch-2 {
        0%, 100% { transform: translate(0); }
        10% { transform: translate(5px, -4px); }
        20% { transform: translate(-6px, 3px); }
        30% { transform: translate(4px, -5px); }
        40% { transform: translate(-7px, 2px); }
        50% { transform: translate(3px, -6px); }
        60% { transform: translate(-4px, 4px); }
        70% { transform: translate(6px, -3px); }
        80% { transform: translate(-5px, 5px); }
        90% { transform: translate(7px, -2px); }
      }

      @keyframes glitch-3 {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-6px, -4px); }
        40% { transform: translate(5px, 3px); }
        60% { transform: translate(-4px, 6px); }
        80% { transform: translate(7px, -3px); }
      }

      @keyframes scanline {
        0% { top: 0%; }
        100% { top: 100%; }
      }

      @keyframes flicker {
        0%, 100% { opacity: 1; }
        25% { opacity: 0.9; }
        50% { opacity: 0.7; }
        75% { opacity: 0.85; }
      }

      @keyframes cyber-glow {
        0%, 100% {
          box-shadow: 0 0 10px #ff00de, 0 0 20px #00fff9, inset 0 0 10px rgba(255, 0, 222, 0.3);
        }
        50% {
          box-shadow: 0 0 20px #ff00de, 0 0 40px #00fff9, inset 0 0 20px rgba(0, 255, 249, 0.3);
        }
      }

      @keyframes data-stream {
        0% {
          opacity: 0;
          transform: translateY(100px) rotateX(90deg);
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: translateY(-100px) rotateX(-90deg);
        }
      }

      @keyframes matrix-rain {
        0% {
          top: -100%;
          opacity: 1;
        }
        100% {
          top: 100%;
          opacity: 0;
        }
      }

      @keyframes pulse-ring {
        0% {
          r: 0;
          opacity: 1;
        }
        100% {
          r: 150;
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    scanlineControls.start({
      y: ["0%", "100%"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    });

    return () => {
      document.head.removeChild(style);
    };
  }, [scanlineControls]);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));

      await controls1.start({
        y: -200,
        opacity: 0,
        scale: 0.8,
        rotateX: 90,
        filter: "blur(10px)",
        transition: { duration: 0.6, ease: "easeIn" },
      });
      setShowCount(false);

      await controls2.start({
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: { duration: 0.5, ease: "backOut" },
      });

      await new Promise(resolve => setTimeout(resolve, 800));

      await controls2.start({
        y: -200,
        opacity: 0,
        scale: 0.8,
        rotateX: 90,
        transition: { duration: 0.6 },
      });

      await controls3.start({
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: { duration: 0.5, ease: "backOut" },
      });

      await new Promise(resolve => setTimeout(resolve, 800));

      await controls3.start({
        y: -200,
        opacity: 0,
        scale: 0.8,
        rotateX: 90,
        transition: { duration: 0.6 },
      });

      await controls4.start({
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: { duration: 0.6, ease: "backOut" },
      });

      await new Promise(resolve => setTimeout(resolve, 1500));

      await containerControls.start({
        y: "-100%",
        transition: { duration: 1.2, ease: "easeInOut" },
      });
    };

    sequence();
  }, [controls1, controls2, controls3, controls4, containerControls]);

  return (
    <motion.div
      animate={containerControls}
      style={{
        fontFamily: "'Courier New', monospace",
        perspective: "1000px",
      }}
      className="fixed bg-black h-screen w-screen flex flex-col items-center justify-center z-[500] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='6' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle cx="50%" cy="50%" r="0" fill="none" stroke="#ff00de" strokeWidth="2" opacity="0.3" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
      </svg>

      <motion.div
        animate={scanlineControls}
        className="absolute left-0 w-full h-2 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent pointer-events-none"
        style={{
          filter: "blur(1px)",
          boxShadow: "0 0 20px #00fff9, 0 0 40px rgba(0, 255, 249, 0.5)",
          animation: "flicker 0.15s infinite"
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255, 0, 222, 0.05) 25%, rgba(255, 0, 222, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 222, 0.05) 75%, rgba(255, 0, 222, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 249, 0.05) 25%, rgba(0, 255, 249, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 249, 0.05) 75%, rgba(0, 255, 249, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 0, 222, 0.1) 0%, transparent 40%)",
        }}
      />

      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={{
          background: ["linear-gradient(90deg, transparent, #ff00de, transparent)", "linear-gradient(90deg, transparent, #00fff9, transparent)"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ boxShadow: "0 0 20px #ff00de" }}
      />

      {showCount && (
        <motion.div
          animate={controls1}
          initial={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          className="absolute"
        >
          <motion.div
            animate={{
              filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            <CountUpGlitch from={0} to={100} duration={1200} />
          </motion.div>
        </motion.div>
      )}

      <motion.div
        animate={controls2}
        initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -90 }}
        className="absolute"
      >
        <motion.div
          animate={{
            filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
          }}
          transition={{ duration: 0.25, repeat: Infinity }}
        >
          <GlitchText className="text-white font-extrabold text-6xl md:text-7xl lg:text-8xl tracking-wider">
            HELLOWORLD!
          </GlitchText>
        </motion.div>
      </motion.div>

      <motion.div
        animate={controls3}
        initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -90 }}
        className="absolute"
      >
        <motion.div
          animate={{
            filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
          }}
          transition={{ duration: 0.25, repeat: Infinity }}
        >
          <GlitchText className="text-white font-extrabold text-6xl md:text-7xl lg:text-8xl tracking-wider">
            R'E 
          </GlitchText>
        </motion.div>
      </motion.div>

      <motion.div
        animate={controls4}
        initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -90 }}
        className="absolute"
      >
        <motion.div
          animate={{
            textShadow: [
              "0 0 10px #ff00de, 0 0 20px #ff00de, 0 0 40px #ff00de",
              "0 0 20px #00fff9, 0 0 40px #00fff9, 0 0 80px #00fff9",
              "0 0 10px #ff00de, 0 0 20px #ff00de, 0 0 40px #ff00de",
            ],
            filter: ["brightness(1) drop-shadow(0 0 5px #ff00de)", "brightness(1.2) drop-shadow(0 0 15px #00fff9)", "brightness(1) drop-shadow(0 0 5px #ff00de)"],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <GlitchText className="text-white font-extrabold text-6xl md:text-7xl lg:text-8xl tracking-wider">
            PRESENT
          </GlitchText>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-8 left-8 w-24 h-24 border-2 border-purple-500"
        style={{
          boxShadow: "0 0 20px rgba(255, 0, 222, 0.8), inset 0 0 20px rgba(255, 0, 222, 0.2)",
        }}
        animate={{
          boxShadow: ["0 0 20px rgba(255, 0, 222, 0.8), inset 0 0 20px rgba(255, 0, 222, 0.2)", "0 0 40px rgba(255, 0, 222, 1), inset 0 0 40px rgba(255, 0, 222, 0.5)"],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-8 right-8 w-24 h-24 border-2 border-cyan-400"
        style={{
          boxShadow: "0 0 20px rgba(0, 255, 249, 0.8), inset 0 0 20px rgba(0, 255, 249, 0.2)",
        }}
        animate={{
          boxShadow: ["0 0 20px rgba(0, 255, 249, 0.8), inset 0 0 20px rgba(0, 255, 249, 0.2)", "0 0 40px rgba(0, 255, 249, 1), inset 0 0 40px rgba(0, 255, 249, 0.5)"],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-24 h-24 border-2 border-cyan-400"
        style={{
          boxShadow: "0 0 20px rgba(0, 255, 249, 0.8), inset 0 0 20px rgba(0, 255, 249, 0.2)",
        }}
        animate={{
          boxShadow: ["0 0 20px rgba(0, 255, 249, 0.8), inset 0 0 20px rgba(0, 255, 249, 0.2)", "0 0 40px rgba(0, 255, 249, 1), inset 0 0 40px rgba(0, 255, 249, 0.5)"],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-24 h-24 border-2 border-purple-500"
        style={{
          boxShadow: "0 0 20px rgba(255, 0, 222, 0.8), inset 0 0 20px rgba(255, 0, 222, 0.2)",
        }}
        animate={{
          boxShadow: ["0 0 20px rgba(255, 0, 222, 0.8), inset 0 0 20px rgba(255, 0, 222, 0.2)", "0 0 40px rgba(255, 0, 222, 1), inset 0 0 40px rgba(255, 0, 222, 0.5)"],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default Opening;
