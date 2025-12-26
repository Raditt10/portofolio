import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import ProjectCard from "./assets/ProjectCard";
import { projectsData } from "../../constant";

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);

  // Update scroll progress
  const updateScrollProgress = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress || 0);
    }
  };

  // Mouse drag handlers with momentum
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setVelocity(0);
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.scrollBehavior = 'smooth';
      
      // Apply momentum
      if (Math.abs(velocity) > 5) {
        const momentumScroll = velocity * 15;
        scrollContainerRef.current.scrollLeft -= momentumScroll;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2.5; // Increased speed multiplier
    const newVelocity = walk - (scrollLeft - scrollContainerRef.current.scrollLeft);
    setVelocity(newVelocity);
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX;
    const walk = (startX - x) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft + walk;
  };

  // Scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollProgress);
      return () => container.removeEventListener('scroll', updateScrollProgress);
    }
  }, []);

  // Navigation buttons
  const scrollTo = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      },
    },
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative min-h-screen py-14 sm:py-18 md:py-22 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden bg-gradient-to-br from-[#050607] via-[#0b0f15] to-[#0c1118] touch-manipulation"
      style={{ fontFamily: "Sora Variable" }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.015] z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center'
        }} />
      </div>

      {/* Pulsing Orb Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] z-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/8 to-white/4 animate-pulse-slow" 
             style={{ filter: 'blur(28px)' }} />
      </div>

      {/* Floating Particles (reduced for mobile) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1.5}px`,
              height: `${Math.random() * 2 + 1.5}px`,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))',
              boxShadow: '0 0 6px rgba(255,255,255,0.35)',
              opacity: 0.6
            }}
          />
        ))}
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1 
          ref={titleRef}
          variants={titleVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-white via-slate-200 to-amber-100 bg-clip-text text-transparent font-semibold text-center relative z-30 overflow-hidden mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4"
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 24px rgba(255,255,255,0.25)',
            letterSpacing: '0.02em'
          }}
        >
          My Projects
        </motion.h1>
        
        {/* Navigation Buttons */}
        <div className="relative">
          <button
            onClick={() => scrollTo('left')}
            disabled={scrollProgress === 0}
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10 items-center justify-center transition-all duration-500 hover:scale-110 hover:border-white/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] ${
              scrollProgress === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <svg className="w-7 h-7 text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scrollTo('right')}
            disabled={scrollProgress >= 99}
            className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10 items-center justify-center transition-all duration-500 hover:scale-110 hover:border-white/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] ${
              scrollProgress >= 99 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <svg className="w-7 h-7 text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        
          {/* Scroll Container with Drag */}
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-4 relative"
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              scrollBehavior: isDragging ? 'auto' : 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <motion.div 
              className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 min-w-max px-4"
              variants={gridVariants}
              style={{
                userSelect: 'none',
              }}
            >
              {projectsData.map((data, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -6,
                    scale: 1.015,
                    rotateY: 0,
                    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } 
                  }}
                  className="relative group w-[320px] sm:w-[380px] md:w-[420px] lg:w-[450px] flex-shrink-0"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: 1000,
                  }}
                >
              {/* Cyberpunk Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-all duration-300 rounded-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.16) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                  transform: 'scale(1.02)'
                }}
              />
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-90 transition-all duration-400 overflow-hidden hidden md:block">
                <div 
                  className="absolute inset-[-2px] rounded-xl opacity-50"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, transparent 94%, rgba(255,255,255,0.3) 100%),
                      linear-gradient(180deg, transparent 94%, rgba(255,255,255,0.25) 100%)
                    `,
                    backgroundSize: '22px 22px',
                    animation: 'gridMove 3s linear infinite'
                  }}
                />
              </div>

              {/* Original ProjectCard dengan wrapper untuk efek tambahan */}
              <div className="relative transform transition-all duration-300 group-hover:border-purple-500/50 rounded-xl overflow-hidden">
                <ProjectCard 
                  gambar={data.gambar} 
                  judul={data.judul} 
                  parag={data.parag} 
                  tech={data.tech} 
                  linkDemo={data.linkDemo} 
                  linkCode={data.linkCode}
                  isComingSoon={data.isComingSoon || false}
                />
                
                {/* Hover Shine Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        </div>
        </div>

        {/* Enhanced Progress Bar & Scroll Indicators */}
        <div className="flex flex-col items-center gap-6 mt-12">
          {/* Progress Bar */}
          <div className="w-full max-w-2xl">
            <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-white/50 via-white/30 to-white/20 rounded-full transition-all duration-300 ease-out relative"
                style={{ 
                  width: `${scrollProgress}%`,
                  boxShadow: '0 0 10px rgba(255,255,255,0.25)'
                }}
              >
                {/* Animated glow at the end of progress bar */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              </div>
            </div>
            
            {/* Progress percentage indicator */}
            <div className="flex justify-between items-center mt-2 px-2">
              <span className="text-xs text-gray-500">Start</span>
              <span className="text-xs font-medium text-cyan-400 tabular-nums">
                {Math.round(scrollProgress)}%
              </span>
              <span className="text-xs text-gray-500">End</span>
            </div>
          </div>

          {/* Scroll Instruction */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2 animate-pulse">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="hidden sm:inline">Swipe</span>
            </div>
            
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-sm">
              <span className="text-white/80">Drag to explore</span>
            </div>
            
            <div className="flex items-center gap-2 animate-pulse">
              <span className="hidden sm:inline">or Click</span>
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10"></div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100vh) translateX(100px) rotate(180deg); 
            opacity: 0; 
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-scan {
          animation: scan 3s linear infinite;
        }

        .floating-particle {
          animation: float 15s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Projects;