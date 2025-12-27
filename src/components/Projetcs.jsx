import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projectsData } from "../../constant";

// Project Card Component - Optimized untuk mobile
const ProjectCard = ({ gambar, judul, parag, tech, linkDemo, linkCode, isComingSoon }) => {
  return (
    <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group">
      {/* Image */}
      <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
        <img 
          src={`/img/${gambar}`} 
          alt={judul}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Coming Soon Badge */}
        {isComingSoon && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-black">
            Coming Soon
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-1">{judul}</h3>
        <p className="text-sm text-gray-300/80 line-clamp-2">{parag}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((t, i) => (
            <span 
              key={i}
              className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/20 rounded-full text-white/70 hover:bg-white/10 transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-2">
          <a
            href={linkDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
            <span>Demo</span>
          </a>
          <a
            href={linkCode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={16} />
            <span className="hidden sm:inline">Code</span>
          </a>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
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

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative min-h-screen py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-[#040507] via-[#0a0d12] to-[#050608] mt-32 sm:mt-40 md:mt-48"
      style={{ 
        fontFamily: "Sora Variable, system-ui, sans-serif",
        backgroundImage: `radial-gradient(circle at 32% 24%,rgba(255,255,255,0.26) 0%,rgba(255,255,255,0.12) 16%,rgba(255,255,255,0) 42%),
                         radial-gradient(circle at 68% 66%,rgba(255,214,170,0.12) 0%,rgba(255,214,170,0) 55%),
                         radial-gradient(ellipse at center,rgba(0,0,0,0) 35%,rgba(0,0,0,0.6) 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 md:mb-16"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          My Projects
        </motion.h1>
          
        {/* Projects Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scrollTo('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 sm:-translate-x-10 lg:-translate-x-16 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-white/50 hover:bg-white/15 ${
              !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scrollTo('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 sm:translate-x-10 lg:translate-x-16 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-white/50 hover:bg-white/15 ${
              !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <ProjectCard {...data} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Fade - Left & Right */}
          <div className="absolute left-0 top-0 bottom-4 w-8 sm:w-12 bg-gradient-to-r from-[#050607] to-transparent pointer-events-none z-20" />
          <div className="absolute right-0 top-0 bottom-4 w-8 sm:w-12 bg-gradient-to-l from-[#050607] to-transparent pointer-events-none z-20" />
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
            <div className="relative h-1 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-white/40 via-white/30 to-white/40 rounded-full relative"
                style={{ 
                  width: `${scrollProgress}%`,
                  boxShadow: '0 0 10px rgba(255,255,255,0.3)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Glowing dot at end */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </motion.div>
            </div>
            
            {/* Progress Info */}
            <div className="flex justify-between items-center mt-2 px-2 text-xs text-gray-500">
              <span>Start</span>
              <span className="text-white/70 font-medium tabular-nums">
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
              className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm rounded-full text-sm text-white/70"
            >
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="font-medium">Swipe atau Drag</span>
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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