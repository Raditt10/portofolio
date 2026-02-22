import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const Gallery = () => {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === "light";

  // --- Scroll Physics ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  // Images Data
  const images = [
    { src: "/img/geler-1.png", title: "Interior View", description: "Minimalist Architecture" },
    { src: "/img/galer-4.png", title: "Mountain View", description: "Serenity in nature" },
    { src: "/img/galer-5.png", title: "Sigma Cat", description: "The watcher of the void" },
    { src: "/img/galor1.jpg", title: "Urban Life", description: "City lights and shadows" },
    { src: "/img/galer-3.png", title: "Festival", description: "Moments of joy" },
    { src: "/img/galor2.jpg", title: "Night Vibe", description: "Nocturnal atmosphere" },
  ];

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

  // Lightbox Logic
  useEffect(() => {
    if (selectedImage !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedImage]);

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage]);

  return (
    <section 
      id="gallery" 
      ref={containerRef} 
      className="relative min-h-screen py-24 sm:py-32 px-4 md:px-8 overflow-hidden font-sans"
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
        <motion.div 
            style={{ y: yParallax }}
            className="text-center mb-12 md:mb-24"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 font-heading"
          >
            <span className={`bg-clip-text text-transparent ${
                isLight 
                    ? 'bg-gradient-to-b from-black to-gray-600' 
                    : 'bg-gradient-to-b from-white to-gray-500'
            }`}>
              My Gallery
            </span>
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-1 w-24 mx-auto ${isLight ? 'bg-black' : 'bg-white'}`} 
          />
        </motion.div>

        {/* --- GRID LAYOUT (Responsive Bento Grid) --- */}
        {/* Grid System:
            Mobile (default): 2 Kolom
            Desktop (md): 4 Kolom
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-auto md:h-[800px]">
          
          {/* Item 1 (Portrait) */}
          <GalleryCard 
            image={images[0]} 
            index={0} 
            onClick={() => setSelectedImage(0)} 
            isLight={isLight} 
            className="col-span-1 row-span-2" // Mobile: Tetap 1 kolom, 2 baris (panjang ke bawah)
          />
          
          {/* Item 2 (Landscape/Big) */}
          <GalleryCard 
            image={images[1]} 
            index={1} 
            onClick={() => setSelectedImage(1)} 
            isLight={isLight} 
            className="col-span-1 row-span-1 md:col-span-2 md:row-span-1" // Mobile: Kotak kecil
          />
          
          {/* Item 3 (Square) */}
          <GalleryCard 
            image={images[2]} 
            index={2} 
            onClick={() => setSelectedImage(2)} 
            isLight={isLight} 
            className="col-span-1 row-span-1" 
          />
          
          {/* Item 5 (Big Block) - Moved up for mobile flow */}
          <GalleryCard 
            image={images[4]} 
            index={4} 
            onClick={() => setSelectedImage(4)} 
            isLight={isLight} 
            className="col-span-2 row-span-2 md:col-span-2 md:row-span-2" // Mobile: Full width (2 kolom), 2 baris (Kotak Besar)
          />

          {/* Item 4 (Square) */}
          <GalleryCard 
            image={images[3]} 
            index={3} 
            onClick={() => setSelectedImage(3)} 
            isLight={isLight} 
            className="col-span-1 row-span-1" 
          />
          
          {/* Item 6 (Square) */}
          <GalleryCard 
            image={images[5]} 
            index={5} 
            onClick={() => setSelectedImage(5)} 
            isLight={isLight} 
            className="col-span-1 row-span-1" 
          />
          
          {/* Instagram Card */}
          <InstagramCard 
            isLight={isLight} 
            className="col-span-2 row-span-1 md:col-span-1 md:row-span-1" // Mobile: Full width (2 kolom) agar terbaca
          />

        </div>
      </div>

      {/* --- LIGHTBOX (Clean) --- */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Controls */}
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50" onClick={() => setSelectedImage(null)}>
               <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <button className="absolute left-2 md:left-8 text-white/50 hover:text-white transition-colors p-4 z-50" onClick={handlePrev}>
               <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="absolute right-2 md:right-8 text-white/50 hover:text-white transition-colors p-4 z-50" onClick={handleNext}>
               <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Image Container */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
               <img 
                  src={images[selectedImage].src} 
                  alt={images[selectedImage].title}
                  className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-sm shadow-2xl" 
               />
               <div className="mt-4 md:mt-6 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{images[selectedImage].title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm mt-1 uppercase tracking-widest">{images[selectedImage].description}</p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- SUB-COMPONENT: GALLERY CARD ---
const GalleryCard = ({ image, index, onClick, isLight, className = "" }) => {
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            className={`group relative overflow-hidden rounded-xl border cursor-pointer ${className} ${
                isLight ? 'bg-white border-gray-200' : 'bg-neutral-900 border-neutral-800'
            }`}
        >
            {/* Spotlight Effect (Desktop Only) */}
            <div 
                className={`hidden md:block absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
                        isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)'
                    }, transparent 40%)`
                }}
            />

            {/* Image */}
            <div className="w-full h-full overflow-hidden">
                <img 
                    src={image.src} 
                    alt={image.title} 
                    className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Overlay Text */}
            <div className={`absolute inset-0 z-10 flex flex-col justify-end p-4 md:p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                <h3 className="text-white font-bold text-sm md:text-lg translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.title}
                </h3>
                <p className="text-gray-300 text-[10px] md:text-xs uppercase tracking-wider translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {image.description}
                </p>
            </div>
        </motion.div>
    );
};

// --- SUB-COMPONENT: INSTAGRAM CARD ---
const InstagramCard = ({ isLight, className = "" }) => {
    return (
        <a
            href="https://www.instagram.com/radittt_xxyu/"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col justify-between p-4 md:p-6 rounded-xl border transition-all duration-300 ${className} ${
                isLight 
                    ? 'bg-black text-white border-transparent hover:bg-gray-900' 
                    : 'bg-white text-black border-transparent hover:bg-gray-200'
            }`}
        >
            <div className="relative z-10">
                <h2 className={`text-2xl md:text-4xl font-black tracking-tighter mb-0 opacity-50 group-hover:opacity-100 transition-opacity`}>MORE</h2>
                <div className="flex items-center gap-2">
                    <span className="text-2xl md:text-4xl font-black tracking-tighter">ON</span>
                    <img src="/img/instagram.png" className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-12 ${!isLight && 'invert'}`} alt="IG" />
                </div>
            </div>
            
            <div className="relative z-10 flex justify-between items-end mt-2 md:mt-4">
                <span className="text-xs md:text-sm font-mono opacity-70">@radittt_xxyu</span>
                <svg className="w-5 h-5 md:w-6 md:h-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
        </a>
    )
}

export default Gallery;