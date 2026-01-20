import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { projectsData } from "../../constant";
import { useNavigate } from "react-router-dom";

// --- PROJECT CARD COMPONENT (Monochrome & Spotlight) ---
const ProjectCard = ({ gambar, judul, parag, tech, linkDemo, linkCode, isComingSoon, isLight }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handle404 = (e) => {
    e.preventDefault();
    navigate('/next-demo');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative h-full flex flex-col rounded-2xl border overflow-hidden transition-all duration-500 ${
        isLight
          ? "bg-white border-gray-200 hover:border-black/50 hover:shadow-xl"
          : "bg-neutral-900 border-neutral-800 hover:border-white/30 hover:shadow-2xl hover:shadow-white/5"
      }`}
    >
      {/* Spotlight Effect */}
      <div 
        className={`absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
                isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)'
            }, transparent 40%)`
        }}
      />

      {/* Image Section */}
      <div className="relative h-48 sm:h-52 overflow-hidden z-10">
        <div className={`absolute inset-0 z-10 transition-colors duration-500 ${
            isLight ? 'bg-black/10 group-hover:bg-transparent' : 'bg-black/40 group-hover:bg-transparent'
        }`} />
        
        <img 
          src={`/img/${gambar}`} 
          alt={judul}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          loading="lazy"
        />
        
        {/* Coming Soon Badge */}
        {isComingSoon && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold z-20 border ${
            isLight 
                ? 'bg-black text-white border-transparent' 
                : 'bg-white text-black border-transparent'
          }`}>
            Coming Soon
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col z-10">
        <div className="mb-4">
            <h3 className={`text-xl font-bold mb-2 line-clamp-1 ${isLight ? "text-black" : "text-white"}`}>
            {judul}
            </h3>
            <p className={`text-sm line-clamp-2 leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            {parag}
            </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tech.map((t, i) => (
            <span 
              key={i}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border transition-colors duration-200 ${
                isLight
                  ? "bg-gray-50 border-gray-200 text-gray-600 group-hover:border-black/20 group-hover:text-black"
                  : "bg-neutral-800 border-neutral-700 text-gray-400 group-hover:border-white/20 group-hover:text-white"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links (Push to bottom) */}
        <div className="mt-auto flex gap-3">
          {/* Demo Button */}
          <a
            href={(!linkDemo || linkDemo === "#") ? "/next-demo" : linkDemo}
            onClick={(!linkDemo || linkDemo === "#") ? handle404 : (e) => e.stopPropagation()}
            target={(!linkDemo || linkDemo === "#") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 group/btn ${
              isLight
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            <span>Live Demo</span>
            <ExternalLink size={14} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>

          {/* Code Button */}
          <a
            href={(!linkCode || linkCode === "#") ? "/next-demo" : linkCode}
            onClick={(!linkCode || linkCode === "#") ? handle404 : (e) => e.stopPropagation()}
            target={(!linkCode || linkCode === "#") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 border ${
              isLight
                ? "border-gray-200 text-black hover:border-black hover:bg-gray-50"
                : "border-neutral-700 text-white hover:border-white hover:bg-neutral-800"
            }`}
          >
            <Github size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PROJECTS COMPONENT ---
const Projects = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === "light";

  // Drag State
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);

  // Theme Sync
  useEffect(() => {
    const updateTheme = () => {
        setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Update Scroll UI
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

  // Drag Logic
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    scrollStartLeft.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.scrollSnapType = 'none';
    document.body.style.cursor = 'grabbing';
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const delta = dragStartX.current - clientX;
    scrollContainerRef.current.scrollLeft = scrollStartLeft.current + delta;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
    if (scrollContainerRef.current) {
        setTimeout(() => {
             if (scrollContainerRef.current) scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
        }, 50);
    }
  };

  // Scroll Listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => container.removeEventListener('scroll', updateScrollState);
  }, []);

  // Mouse Up Global
  useEffect(() => {
    const handleUp = () => isDragging && handleDragEnd();
    window.addEventListener('mouseup', handleUp);
    return () => window.removeEventListener('mouseup', handleUp);
  }, [isDragging]);

  // Button Scroll
  const scrollTo = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* --- BACKGROUND (Clean Monochrome) --- */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? 'bg-white' : 'bg-black'}`} />
        <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{ 
                backgroundImage: `linear-gradient(${isLight ? '#000' : '#fff'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? '#000' : '#fff'} 1px, transparent 1px)`, 
                backgroundSize: '40px 40px' 
            }} 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-20 gap-6">
            <div className="text-center md:text-left w-full md:w-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
                    style={{ fontFamily: '"Sensei Biased", system-ui, sans-serif' }}
                >
                    <span className={`bg-clip-text text-transparent ${
                        isLight 
                            ? 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500' 
                            : 'bg-gradient-to-r from-white via-gray-200 to-gray-500'
                    }`}>
                        Featured Work
                    </span>
                </motion.h1>
                <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    className={`h-1 w-24 rounded-full ${isLight ? 'bg-black' : 'bg-white'} mx-auto md:mx-0`} 
                />
            </div>

            {/* Navigation Buttons (Desktop) */}
            <div className="hidden md:flex gap-3">
                <button
                    onClick={() => scrollTo('left')}
                    disabled={!canScrollLeft}
                    className={`p-4 rounded-full border transition-all duration-300 ${
                        isLight 
                            ? "border-black/10 hover:bg-black hover:text-white disabled:opacity-30" 
                            : "border-white/10 hover:bg-white hover:text-black disabled:opacity-30"
                    }`}
                >
                    <ArrowRight className="rotate-180" size={24} />
                </button>
                <button
                    onClick={() => scrollTo('right')}
                    disabled={!canScrollRight}
                    className={`p-4 rounded-full border transition-all duration-300 ${
                        isLight 
                            ? "border-black/10 hover:bg-black hover:text-white disabled:opacity-30" 
                            : "border-white/10 hover:bg-white hover:text-black disabled:opacity-30"
                    }`}
                >
                    <ArrowRight size={24} />
                </button>
            </div>
        </div>
          
        {/* --- PROJECTS SLIDER --- */}
        <div className="relative">
            {/* Scroll Container */}
            <div 
                ref={scrollContainerRef}
                onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX); }}
                onMouseMove={(e) => handleDragMove(e.clientX)}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                onTouchEnd={handleDragEnd}
                className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-12 -mx-4 px-4 sm:mx-0 sm:px-0"
                style={{ 
                    cursor: isDragging ? 'grabbing' : 'grab',
                    scrollSnapType: 'x mandatory',
                    scrollPaddingLeft: '0px'
                }}
            >
                <div className="flex gap-6 sm:gap-8 w-max">
                    {projectsData.map((data, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-[85vw] sm:w-[350px] md:w-[380px] lg:w-[420px] flex-shrink-0"
                            style={{ scrollSnapAlign: 'start' }}
                        >
                            <ProjectCard {...data} isLight={isLight} />
                        </motion.div>
                    ))}
                    {/* Spacer di akhir agar kartu terakhir tidak mepet */}
                    <div className="w-4 sm:w-0" /> 
                </div>
            </div>

            {/* Mobile Nav Buttons (Overlay) */}
            <div className="md:hidden flex justify-center gap-4 mt-4">
                 <button onClick={() => scrollTo('left')} disabled={!canScrollLeft} className={`p-3 rounded-full border ${isLight ? 'border-black/20 disabled:opacity-30' : 'border-white/20 disabled:opacity-30'}`}>
                    <ArrowRight className="rotate-180" size={20} />
                 </button>
                 <button onClick={() => scrollTo('right')} disabled={!canScrollRight} className={`p-3 rounded-full border ${isLight ? 'border-black/20 disabled:opacity-30' : 'border-white/20 disabled:opacity-30'}`}>
                    <ArrowRight size={20} />
                 </button>
            </div>
        </div>

        {/* --- PROGRESS BAR --- */}
        <div className="mt-12 hidden md:block">
            <div className={`relative h-[2px] w-full rounded-full overflow-hidden ${isLight ? 'bg-black/10' : 'bg-white/10'}`}>
                <motion.div 
                    className={`absolute left-0 top-0 h-full ${isLight ? 'bg-black' : 'bg-white'}`}
                    style={{ width: `${scrollProgress}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>
            <div className="flex justify-between mt-2 text-xs font-mono uppercase tracking-widest opacity-50">
                <span>01</span>
                <span>0{projectsData.length}</span>
            </div>
        </div>

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