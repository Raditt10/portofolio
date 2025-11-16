import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const FuturisticText = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.span
        className="relative z-10 block tracking-[0.3em]"
        style={{
          textShadow: "0 0 30px rgba(100, 200, 255, 0.8), 0 0 60px rgba(100, 200, 255, 0.4)",
          fontWeight: 100,
          letterSpacing: "0.3em"
        }}
        animate={{
          x: [0, -2, 2, -1, 1, 0],
          y: [0, 1, -1, 2, -2, 0],
          opacity: [1, 0.98, 1, 0.99, 1, 1],
          textShadow: [
            "0 0 30px rgba(100, 200, 255, 0.8), 0 0 60px rgba(100, 200, 255, 0.4)",
            "0 0 40px rgba(100, 200, 255, 1), 0 0 80px rgba(100, 200, 255, 0.6)",
            "0 0 30px rgba(100, 200, 255, 0.8), 0 0 60px rgba(100, 200, 255, 0.4)",
            "0 0 35px rgba(100, 200, 255, 0.9), 0 0 70px rgba(100, 200, 255, 0.5)",
            "0 0 30px rgba(100, 200, 255, 0.8), 0 0 60px rgba(100, 200, 255, 0.4)",
            "0 0 30px rgba(100, 200, 255, 0.8), 0 0 60px rgba(100, 200, 255, 0.4)",
          ]
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.span>

      <motion.span
        className="absolute z-0 tracking-[0.3em] text-blue-300"
        style={{
          top: "2px",
          left: "3px",
          fontWeight: 100,
          letterSpacing: "0.3em",
          opacity: 0.6,
        }}
        animate={{
          x: [3, 1, -2, 2, -1, 3],
          y: [-2, -1, 1, -2, 1, -2],
          opacity: [0.4, 0.5, 0.3, 0.5, 0.4, 0.4],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.span>

      <motion.span
        className="absolute z-0 tracking-[0.3em] text-cyan-400"
        style={{
          top: "-2px",
          left: "-3px",
          fontWeight: 100,
          letterSpacing: "0.3em",
          opacity: 0.5,
        }}
        animate={{
          x: [-2, 2, 1, -1, 2, -2],
          y: [1, 2, -1, 1, -2, 1],
          opacity: [0.3, 0.4, 0.2, 0.4, 0.3, 0.3],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

const CountUp = ({ from, to, duration = 1000, onComplete }) => {
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
    <FuturisticText className="text-white text-8xl md:text-9xl lg:text-[12rem]">
      {count.toLocaleString()}
    </FuturisticText>
  );
};

const Opening = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const containerControls = useAnimation();
  const [showCount, setShowCount] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400&display=swap');
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));

      await controls1.start({
        y: -100,
        opacity: 0,
        scale: 0.9,
        filter: "blur(20px)",
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      setShowCount(false);

      await controls2.start({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" },
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      await controls2.start({
        y: -100,
        opacity: 0,
        scale: 0.9,
        filter: "blur(20px)",
        transition: { duration: 0.5, ease: "easeInOut" },
      });

      await controls3.start({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" },
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      await controls3.start({
        y: -100,
        opacity: 0,
        scale: 0.9,
        filter: "blur(20px)",
        transition: { duration: 0.5, ease: "easeInOut" },
      });

      await controls4.start({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" },
      });

      await new Promise(resolve => setTimeout(resolve, 1500));

      await containerControls.start({
        y: "-100%",
        opacity: 0,
        transition: { duration: 1, ease: "easeInOut" },
      });

      // Unmount component setelah animasi selesai
      setTimeout(() => setIsVisible(false), 100);
    };

    sequence();
  }, [controls1, controls2, controls3, controls4, containerControls]);

  if (!isVisible) return null;

  return (
    <motion.div
      animate={containerControls}
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
      className="fixed bg-black h-screen w-screen flex flex-col items-center justify-center z-[500] overflow-hidden top-0 left-0"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0, 150, 255, 0.08) 0%, rgba(0, 100, 200, 0.04) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(0, 100, 200, 0.05) 50%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0, 150, 255, 0.03) 50%, transparent 100%)",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          border: "1px solid rgba(0, 150, 255, 0.15)",
          boxShadow: "0 0 150px rgba(0, 150, 255, 0.15), inset 0 0 150px rgba(0, 150, 255, 0.08)",
        }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.5, 0.25],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full"
        style={{
          border: "2px solid rgba(0, 150, 255, 0.2)",
          boxShadow: "0 0 120px rgba(0, 150, 255, 0.2), inset 0 0 120px rgba(0, 150, 255, 0.12)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.65, 0.35],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full"
        style={{
          border: "1px solid rgba(0, 200, 255, 0.25)",
          boxShadow: "0 0 80px rgba(0, 200, 255, 0.25)",
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {showCount && (
        <motion.div
          animate={controls1}
          initial={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          className="absolute"
        >
          <CountUp from={0} to={100} duration={1200} />
        </motion.div>
      )}

      <motion.div
        animate={controls2}
        initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(20px)" }}
        className="absolute"
      >
        <FuturisticText className="text-white text-7xl md:text-8xl lg:text-9xl">
          HELLO WORLD
        </FuturisticText>
      </motion.div>

      <motion.div
        animate={controls3}
        initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(20px)" }}
        className="absolute"
      >
        <FuturisticText className="text-white text-7xl md:text-8xl lg:text-9xl">
          WE'RE
        </FuturisticText>
      </motion.div>

      <motion.div
        animate={controls4}
        initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(20px)" }}
        className="absolute"
      >
        <FuturisticText className="text-white text-7xl md:text-8xl lg:text-9xl">
          PRESENT
        </FuturisticText>
      </motion.div>

      <motion.div
        className="absolute top-8 left-8"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="w-2 h-2 bg-blue-400 rounded-full" style={{ boxShadow: "0 0 20px rgba(100, 200, 255, 0.8)" }} />
      </motion.div>

      <motion.div
        className="absolute top-8 right-8"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <div className="w-2 h-2 bg-blue-400 rounded-full" style={{ boxShadow: "0 0 20px rgba(100, 200, 255, 0.8)" }} />
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <div className="w-2 h-2 bg-blue-400 rounded-full" style={{ boxShadow: "0 0 20px rgba(100, 200, 255, 0.8)" }} />
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1.5,
        }}
      >
        <div className="w-2 h-2 bg-blue-400 rounded-full" style={{ boxShadow: "0 0 20px rgba(100, 200, 255, 0.8)" }} />
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
        style={{ width: "60%" }}
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      {/* Electric Effects */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {[...Array(8)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${Math.random() * 100} ${Math.random() * 100} Q ${Math.random() * 100} ${Math.random() * 100} ${Math.random() * 100} ${Math.random() * 100}`}
            stroke={`rgba(100, 200, 255, ${0.3 + Math.random() * 0.4})`}
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 1, 0],
              d: [
                `M ${Math.random() * 100}% ${Math.random() * 100}% Q ${50 + Math.random() * 20}% ${50 + Math.random() * 20}% ${Math.random() * 100}% ${Math.random() * 100}%`,
                `M ${Math.random() * 100}% ${Math.random() * 100}% Q ${50 + Math.random() * 20}% ${50 + Math.random() * 20}% ${Math.random() * 100}% ${Math.random() * 100}%`,
                `M ${Math.random() * 100}% ${Math.random() * 100}% Q ${50 + Math.random() * 20}% ${50 + Math.random() * 20}% ${Math.random() * 100}% ${Math.random() * 100}%`,
              ]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Electric Sparks */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            boxShadow: "0 0 10px rgba(100, 200, 255, 0.8), 0 0 20px rgba(100, 200, 255, 0.6)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 1 + Math.random() * 1.5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Vertical Lightning Bolts */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`lightning-${i}`}
          className="absolute h-full w-px"
          style={{
            left: `${20 + i * 20}%`,
            background: "linear-gradient(180deg, transparent 0%, rgba(100, 200, 255, 0.6) 50%, transparent 100%)",
            boxShadow: "0 0 20px rgba(100, 200, 255, 0.8)",
          }}
          animate={{
            opacity: [0, 0, 1, 0, 0],
            scaleY: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            delay: i * 1.2 + Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

export default Opening;