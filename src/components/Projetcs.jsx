import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projectsData } from "../../constant";
import { useNavigate } from "react-router-dom";

// Project Card Component - Optimized untuk mobile
const ProjectCard = ({ gambar, judul, parag, tech, linkDemo, linkCode, isComingSoon, isLight }) => {
  const navigate = useNavigate();
  const handle404 = (e) => {
    e.preventDefault();
    navigate('/next-demo');
  };
  return (
    <div
      className={`relative h-full bg-gradient-to-br ${
        isLight ? "from-white to-amber-50/80" : "from-white/5 to-white/[0.02]"
      } backdrop-blur-md border rounded-xl overflow-hidden group ${
        isLight
          ? "border-amber-200 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
          : "border-white/10"
      }`}
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
        <img 
          src={`/img/${gambar}`} 
          alt={judul}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          width="400" height="256"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isLight ? "from-black/60 via-black/20" : "from-black/80 via-black/20"
          } to-transparent`}
        />
        
        {/* Coming Soon Badge */}
        {isComingSoon && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-black">
            Coming Soon
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
        <h3 className={`text-lg sm:text-xl font-bold line-clamp-1 ${isLight ? "text-black" : "text-white"}`}>
          {judul}
        </h3>
        <p className={`text-sm line-clamp-2 ${isLight ? "text-gray-700" : "text-gray-300/80"}`}>
          {parag}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((t, i) => (
            <span 
              key={i}
              className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                isLight
                  ? "bg-black/5 border border-black/15 text-black hover:bg-black/10"
                  : "bg-white/5 border border-white/20 text-white/70 hover:bg-white/10"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-2">
          {/* Demo Link */}
          {(!linkDemo || linkDemo === "#") ? (
            <a
              href="/next-demo"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLight
                  ? "bg-black/5 hover:bg-black/10 text-black border border-black/10 hover:border-black/20 hover:shadow-lg hover:shadow-amber-100/40"
                  : "bg-white/10 hover:bg-white/15 text-white hover:shadow-lg hover:shadow-white/20"
              }`}
              onClick={handle404}
            >
              <ExternalLink size={16} />
              <span>Demo</span>
            </a>
          ) : (
            <a
              href={linkDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLight
                  ? "bg-black/5 hover:bg-black/10 text-black border border-black/10 hover:border-black/20 hover:shadow-lg hover:shadow-amber-100/40"
                  : "bg-white/10 hover:bg-white/15 text-white hover:shadow-lg hover:shadow-white/20"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
              <span>Demo</span>
            </a>
          )}
          {/* Code Link */}
          {(!linkCode || linkCode === "#") ? (
            <a
              href="/next-demo"
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLight
                  ? "bg-black/5 hover:bg-black/10 border border-black/15 text-black hover:border-black/25"
                  : "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              }`}
              onClick={handle404}
            >
              <Github size={16} />
              <span className="hidden sm:inline">Code</span>
            </a>
          ) : (
            <a
              href={linkCode}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLight
                  ? "bg-black/5 hover:bg-black/10 border border-black/15 text-black hover:border-black/25"
                  : "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
              <span className="hidden sm:inline">Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            isLight ? "from-amber-100/60 via-transparent to-amber-50/40" : "from-white/10 via-transparent to-white/5"
          }`}
        />
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const root = document.documentElement;
      return (
        root.getAttribute("data-theme") || localStorage.getItem("theme") || "dark"
      );
    } catch {
      return "dark";
    }
  });
  const isLight = themeMode === "light";

  // Touch/drag state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);

  // Update scroll state
  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      
      setScrollProgress(progress);
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 10);
    }
  };

  // Mouse/Touch handlers
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    scrollStartLeft.current = scrollContainerRef.current.scrollLeft;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollSnapType = 'none';
    }
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    const delta = dragStartX.current - clientX;
    scrollContainerRef.current.scrollLeft = scrollStartLeft.current + delta;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      // Re-enable snap after drag
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
        }
      }, 50);
    }
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Navigation
  const scrollTo = (direction) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('.project-card')?.offsetWidth || 0;
    const gap = 24; // 6 * 4px (gap-6)
    const scrollAmount = cardWidth + gap;
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', updateScrollState);
    updateScrollState(); // Initial check

    return () => container.removeEventListener('scroll', updateScrollState);
  }, []);

  // Cleanup drag on unmount
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) handleDragEnd();
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);

  // Sync theme from html[data-theme]
  useEffect(() => {
    try {
      const root = document.documentElement;
      const initial =
        root.getAttribute("data-theme") || localStorage.getItem("theme") || "dark";
      setThemeMode(initial);
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === "attributes" && m.attributeName === "data-theme") {
            const current = root.getAttribute("data-theme") || "dark";
            setThemeMode(current);
          }
        }
      });
      observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
      return () => observer.disconnect();
    } catch {
      // ignore
    }
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative min-h-screen py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden mt-16 sm:mt-20 md:mt-24"
      style={{ 
        fontFamily: "Sora Variable, system-ui, sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent font-semibold text-center mb-8 sm:mb-12 md:mb-16"
          style={{
            backgroundImage: isLight
              ? "linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          Featured Projects
        </motion.h1>
          
        {/* Projects Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scrollTo('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 sm:-translate-x-10 lg:-translate-x-16 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isLight
                ? "bg-black/5 border-black/20 hover:border-black/30 hover:bg-black/10"
                : "bg-white/10 border-white/30 hover:border-white/50 hover:bg-white/15"
            } ${
              !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${isLight ? "text-black" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scrollTo('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 sm:translate-x-10 lg:translate-x-16 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isLight
                ? "bg-black/5 border-black/20 hover:border-black/30 hover:bg-black/10"
                : "bg-white/10 border-white/30 hover:border-white/50 hover:bg-white/15"
            } ${
              !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${isLight ? "text-black" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scroll Container - Optimized untuk Mobile */}
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-4"
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollPaddingLeft: '1rem',
              scrollPaddingRight: '1rem',
            }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-4 sm:gap-6 md:gap-8 px-1 sm:px-2"
              style={{
                userSelect: 'none',
                touchAction: 'pan-x',
              }}
            >
              {projectsData.map((data, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="project-card flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]"
                  style={{
                    scrollSnapAlign: 'start',
                  }}
                >
                  <ProjectCard {...data} isLight={isLight} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Fade - Left & Right */}
          <div className={`absolute left-0 top-0 bottom-4 w-8 sm:w-12 bg-gradient-to-r ${isLight ? "from-white" : "from-[#050607]"} to-transparent pointer-events-none z-20`} />
          <div className={`absolute right-0 top-0 bottom-4 w-8 sm:w-12 bg-gradient-to-l ${isLight ? "from-white" : "from-[#050607]"} to-transparent pointer-events-none z-20`} />
        </div>

        {/* Progress Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-12 space-y-4"
        >
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto">
            <div className={`relative h-1 rounded-full overflow-hidden backdrop-blur-sm border ${isLight ? "bg-black/5 border-black/10" : "bg-white/5 border-white/10"}`}>
              <motion.div
                className={`h-full bg-gradient-to-r rounded-full relative ${
                  isLight
                    ? "from-black/40 via-black/30 to-purple-400/50"
                    : "from-white/40 via-white/30 to-white/40"
                }`}
                style={{ 
                  width: `${scrollProgress}%`,
                  boxShadow: isLight ? '0 0 10px rgba(0,0,0,0.2)' : '0 0 10px rgba(255,255,255,0.3)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Glowing dot at end */}
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${
                    isLight
                      ? "bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)]"
                      : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  }`}
                />
              </motion.div>
            </div>
            
            {/* Progress Info */}
            <div className={`flex justify-between items-center mt-2 px-2 text-xs ${isLight ? "text-gray-600" : "text-gray-400"}`}>
              <span>Start</span>
              <span className={`${isLight ? "text-black" : "text-white/70"} font-medium tabular-nums`}>
                {Math.round(scrollProgress)}%
              </span>
              <span>End</span>
            </div>
          </div>

          {/* Swipe Instruction - Mobile Only */}
          <div className="flex justify-center">
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`flex items-center gap-3 px-4 py-2 backdrop-blur-sm rounded-full text-sm ${
                isLight
                  ? "bg-black/5 border border-black/15 text-black"
                  : "bg-white/5 border border-white/20 text-white/70"
              }`}
            >
              <svg className={`w-5 h-5 ${isLight ? "text-black/70" : "text-white/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="font-medium">Swipe atau Drag</span>
              <svg className={`w-5 h-5 ${isLight ? "text-black/70" : "text-white/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;