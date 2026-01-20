import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const Educations = () => {
  const containerRef = useRef(null);
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === "light";

  // Physics untuk Scroll yang sangat halus
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Data Timeline
  const timelineData = [
    {
      year: "2008",
      title: "The Genesis",
      subtitle: "Kelahiran",
      description: "Awal perjalanan hidup saya dimulai. Lembaran pertama dari sebuah cerita panjang.",
      type: "milestone",
      childhoodPhotos: ["/img/bocil1.jpg", "/img/bocil2.jpg", "/img/bocil3.jpg"]
    },
    {
      year: "2014 - 2015",
      title: "TK Darul Fikri",
      subtitle: "Masa Bermain & Belajar",
      description: "Mengenal dunia di luar rumah, belajar bersosialisasi, dan membangun pondasi karakter sejak dini.",
      logo: "/img/tk.png",
    },
    {
      year: "2015 - 2020",
      title: "SD 090 Cibiru",
      subtitle: "Sekolah Dasar",
      description: "Masa eksplorasi selama 6 tahun. Belajar disiplin, tanggung jawab, dan dasar ilmu pengetahuan.",
      logo: "/img/sd.png",
    },
    {
      year: "2020 - 2023",
      title: "SMPN 1 Cileunyi",
      subtitle: "Pencarian Jati Diri",
      description: "Mulai aktif berorganisasi dan menemukan minat dalam bidang teknologi dan olahraga.",
      logo: "/img/smp.png",
      tags: ["English Club", "Badminton"]
    },
    {
      year: "2024 - Sekarang",
      title: "SMKN 13 Bandung",
      subtitle: "Rekayasa Perangkat Lunak",
      description: "Terjun ke dunia IT. Mempelajari coding, manajemen server, dan membangun masa depan sebagai Developer.",
      logo: "/img/logo13.png",
      current: true,
      tags: ["MPK", "Badminton", "IRMA (Rohis)", "Sastrala", "Musi"]
    },
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

  return (
    <section
      id="educations"
      ref={containerRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      {/* --- BACKGROUND (Clean Monochrome) --- */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? 'bg-white' : 'bg-black'}`} />
        
        {/* Subtle Grid Pattern */}
        <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{ 
                backgroundImage: `linear-gradient(${isLight ? '#000' : '#fff'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? '#000' : '#fff'} 1px, transparent 1px)`, 
                backgroundSize: '40px 40px' 
            }} 
        />
        
        {/* Very Subtle Gradient Spot (Gray) */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* --- TITLE SECTION --- */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
        >
          {/* Judul dengan Font Asli "Sensei Biased" Style jika ada, atau fallback ke Sans */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
            style={{ 
                fontFamily: '"Sensei Biased", system-ui, sans-serif', // Mengembalikan font asli
            }}
          >
            <span className={`bg-clip-text text-transparent ${
                isLight 
                    ? 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500' 
                    : 'bg-gradient-to-r from-white via-gray-200 to-gray-500'
            }`}>
                My Educations
            </span>
          </h1>
          <div className={`h-1 w-20 mx-auto rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
        </motion.div>

        {/* --- MAIN TIMELINE --- */}
        <div className="relative">
          
          {/* Static Vertical Line */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 md:translate-x-0 ${isLight ? 'bg-gray-300' : 'bg-neutral-800'}`} />
          
          {/* Animated Scroll Beam (Black/White) */}
          <motion.div
            className={`absolute left-4 md:left-1/2 top-0 w-[2px] -translate-x-1/2 md:translate-x-0 origin-top ${
                isLight 
                    ? 'bg-gradient-to-b from-black via-gray-800 to-transparent' 
                    : 'bg-gradient-to-b from-white via-gray-400 to-transparent'
            }`}
            style={{ scaleY: smoothProgress, height: "100%" }}
          />

          {/* Traveling Square/Dot */}
          <motion.div 
            className={`absolute left-4 md:left-1/2 -translate-x-[calc(50%-0.5px)] md:-translate-x-1/2 w-3 h-3 rotate-45 z-20 pointer-events-none ${
                isLight ? 'bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
            }`}
            style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
          />

          {/* Items */}
          <div className="space-y-16 md:space-y-32 pt-10 pb-20">
            {timelineData.map((item, index) => (
              <TimelineCard key={index} data={item} index={index} isLight={isLight} isEven={index % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENT: MONOCHROME CARD ---
const TimelineCard = ({ data, index, isEven, isLight }) => {
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      className={`relative flex items-center ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      {/* Center Dot */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <div className={`w-4 h-4 rounded-full border-[3px] transition-all duration-300 ${
            data.current 
                ? (isLight ? 'bg-black border-gray-400' : 'bg-white border-gray-500') // Active: Solid
                : (isLight ? 'bg-white border-black' : 'bg-black border-white') // Normal: Hollow-ish
        }`}>
            {data.current && (
                <span className={`absolute inset-0 rounded-full animate-ping opacity-30 ${isLight ? 'bg-black' : 'bg-white'}`} />
            )}
        </div>
      </div>

      <div className="hidden md:block w-1/2" />

      {/* Card Content Area */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className={`group relative p-8 rounded-2xl border transition-all duration-500 overflow-hidden ${
            isLight 
                ? "bg-white border-gray-200 hover:border-black shadow-lg hover:shadow-xl" 
                : "bg-neutral-900 border-neutral-800 hover:border-white/50 shadow-lg hover:shadow-white/5"
          }`}
        >
          {/* Mouse Spotlight Glow (Grayscale) */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                isLight ? 'bg-gray-100/50' : 'bg-white/5'
            }`}
            style={{
                background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
                    isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)'
                }, transparent 40%)`
            }}
          />

          <div className="relative z-10">
            {/* Year Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6 border ${
              isLight 
                ? 'bg-black text-white border-transparent' 
                : 'bg-white text-black border-transparent'
            } ${isEven ? "md:ml-auto" : ""}`}>
              {data.year} 
              {data.current && <span className={`flex h-1.5 w-1.5 rounded-full ${isLight ? 'bg-white' : 'bg-black'} animate-pulse`} />}
            </div>

            {/* Header: Logo & Title */}
            <div className={`flex items-center gap-5 mb-6 ${isEven ? "md:flex-row-reverse" : "flex-row"}`}>
               {data.logo && (
                  <div className={`w-14 h-14 rounded-xl p-2 shrink-0 flex items-center justify-center border ${
                      isLight ? 'bg-gray-50 border-gray-200' : 'bg-neutral-800 border-neutral-700'
                  }`}>
                      <img src={data.logo} alt="logo" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
               )}
               <div>
                  <h3 className={`text-2xl font-bold mb-1 ${isLight ? 'text-black' : 'text-white'}`}>
                      {data.title}
                  </h3>
                  <p className={`text-sm font-medium uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                      {data.subtitle}
                  </p>
               </div>
            </div>

            {/* Description */}
            <p className={`text-base leading-relaxed mb-8 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              {data.description}
            </p>

            {/* PHOTOS (Polaroid Style - B&W) */}
            {data.childhoodPhotos && (
              <div className={`group/photos relative h-32 w-full mt-4 flex items-center ${isEven ? "md:justify-end" : "justify-start"}`}>
                  {data.childhoodPhotos.map((photo, i) => (
                      <motion.div
                          key={i}
                          className={`absolute w-20 h-20 sm:w-24 sm:h-24 p-1 pb-3 rounded shadow-md origin-bottom bg-white border border-gray-200`}
                          style={{ zIndex: i }}
                          initial={{ rotate: (i - 1) * 6, x: i * 5 }}
                          whileInView={{ rotate: (i - 1) * 6, x: i * 5 }}
                          whileHover={{ zIndex: 50, scale: 1.1, rotate: 0 }}
                          variants={{
                              hoverContainer: { 
                                  x: (i - 1) * 85,
                                  rotate: (i - 1) * 8,
                                  scale: 1.1,
                                  zIndex: i + 10
                              }
                          }}
                      >
                          <img src={photo} alt="Memories" className="w-full h-full object-cover rounded-sm grayscale group-hover/photos:grayscale-0 transition-all duration-500" />
                      </motion.div>
                  ))}
                  <motion.div 
                    className="absolute inset-0 z-30" 
                    whileHover="hoverContainer"
                  />
              </div>
            )}

            {/* TAGS (High Contrast) */}
            {data.tags && (
              <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
                {data.tags.map((tag, i) => (
                  <motion.span 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -3, backgroundColor: isLight ? "#000" : "#fff", color: isLight ? "#fff" : "#000" }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-default border ${
                        isLight 
                            ? 'bg-gray-100 text-gray-800 border-gray-200' 
                            : 'bg-neutral-800 text-gray-300 border-neutral-700'
                    }`}
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Educations;