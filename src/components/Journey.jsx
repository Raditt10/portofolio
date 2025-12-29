import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const Journey = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const root = document.documentElement;
      return root.getAttribute("data-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const isLight = themeMode === "light";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const timelineData = [
    {
      year: "2008",
      title: "Kelahiran",
      description: "Awal perjalanan hidup saya dimulai",
      childhoodPhotos: ["/img/bocil1.jpg", "/img/bocil2.jpg", "/img/bocil3.jpg"]
    },
    {
      year: "2014",
      title: "TK Darul Fikri",
      description: "Memulai pendidikan di Taman Kanak-kanak Darul Fikri",
      logo: "/img/tk.jpg",
    },
    {
      year: "2015",
      title: "SD 090 Cibiru",
      description: "Melanjutkan pendidikan dasar di SD 090 Cibiru",
      logo: "/img/sd.png",
    },
    {
      year: "2020",
      title: "SMPN 1 Cileunyi",
      description: "Menempuh pendidikan menengah pertama di SMPN 1 Cileunyi",
      logo: "/img/smp.png",
    },
    {
      year: "2024 - Sekarang",
      title: "SMKN 13 Bandung",
      description: "Siswa kelas 11 SMKN 13 Bandung",
      logo: "/img/logo13.png",
      current: true,
      organizations: [
        { name: "MPK" },
        { name: "Badminton" },
        { name: "IRMA" },
        { name: "Sastrala" },
        { name: "Programmer Club" },
      ],
    },
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
      const index = Math.min(
        Math.floor(latest * timelineData.length),
        timelineData.length - 1
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, timelineData.length]);

  useEffect(() => {
    try {
      const root = document.documentElement;
      const initial = root.getAttribute("data-theme") || "dark";
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
    } catch {}
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative min-h-screen pt-20 pb-20 px-4 sm:px-6 overflow-hidden"
      style={{ fontFamily: "Sora Variable, system-ui, sans-serif" }}
    >
      {/* Animated Sky Background - Overlay Only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Floating Clouds */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute"
            style={{
              top: `${20 + i * 30}%`,
              left: '-10%',
              opacity: 0.06,
            }}
            animate={{
              x: ['0vw', '110vw'],
            }}
            transition={{
              x: {
                duration: 60 + i * 20,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            <svg width={80 + i * 20} height={40 + i * 10} viewBox="0 0 100 50" fill="none">
              <ellipse cx="25" cy="30" rx="20" ry="15" fill="#ffffff" opacity="0.3" />
              <ellipse cx="45" cy="25" rx="25" ry="18" fill="#ffffff" opacity="0.3" />
              <ellipse cx="70" cy="30" rx="20" ry="15" fill="#ffffff" opacity="0.3" />
            </svg>
          </motion.div>
        ))}

        {/* Flying Birds */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`bird-${i}`}
            className="absolute"
            style={{
              top: `${15 + i * 20}%`,
              left: '-5%',
            }}
            animate={{
              x: ['0vw', '105vw'],
            }}
            transition={{
              x: {
                duration: 40 + i * 10,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 8,
              },
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C10 4 8 6 8 8C8 6 6 4 4 2"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.15"
              />
              <path
                d="M12 2C14 4 16 6 16 8C16 6 18 4 20 2"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.15"
              />
            </svg>
          </motion.div>
        ))}

        {/* Desert Dunes / Mountains */}
        <div className="absolute bottom-0 left-0 right-0" style={{ opacity: 0.12 }}>
          {isLight ? (
            // Desert with Pyramids (Light Mode)
            <svg
              width="100%"
              height="180"
              viewBox="0 0 1200 180"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Sand Dunes */}
              <path
                d="M0 180 L0 100 Q150 60 300 100 T600 100 T900 100 T1200 100 L1200 180 Z"
                fill="#d4a574"
                opacity="0.4"
              />
              <path
                d="M0 180 L0 120 Q200 80 400 120 T800 120 T1200 120 L1200 180 Z"
                fill="#c9955c"
                opacity="0.5"
              />
              <path
                d="M0 180 L0 140 Q250 110 500 140 T1000 140 T1200 140 L1200 180 Z"
                fill="#b8864a"
                opacity="0.6"
              />
              
              {/* Pyramids */}
              <g opacity="0.5">
                {/* Large Pyramid */}
                <path d="M 250 180 L 250 70 L 380 180 Z" fill="#d4a574" />
                <path d="M 250 70 L 380 180 L 400 180 Z" fill="#c9955c" />
                
                {/* Medium Pyramid */}
                <path d="M 600 180 L 600 90 L 700 180 Z" fill="#d4a574" />
                <path d="M 600 90 L 700 180 L 715 180 Z" fill="#c9955c" />
                
                {/* Small Pyramid */}
                <path d="M 900 180 L 900 110 L 970 180 Z" fill="#d4a574" />
                <path d="M 900 110 L 970 180 L 982 180 Z" fill="#c9955c" />
              </g>
            </svg>
          ) : (
            // Snowy Mountains (Dark Mode)
            <svg
              width="100%"
              height="180"
              viewBox="0 0 1200 180"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Mountain Ranges */}
              <g opacity="0.6">
                {/* Back mountains */}
                <path d="M0 180 L200 80 L400 140 L600 60 L800 120 L1000 70 L1200 150 L1200 180 Z" fill="#e5e7eb" />
                
                {/* Front mountains */}
                <path d="M0 180 L150 100 L350 160 L550 80 L750 140 L950 90 L1200 170 L1200 180 Z" fill="#f3f4f6" />
                
                {/* Snow caps */}
                <path d="M200 80 L180 95 L220 95 Z" fill="#ffffff" />
                <path d="M600 60 L580 80 L620 80 Z" fill="#ffffff" />
                <path d="M1000 70 L980 90 L1020 90 Z" fill="#ffffff" />
                <path d="M550 80 L530 100 L570 100 Z" fill="#ffffff" />
                <path d="M950 90 L930 110 L970 110 Z" fill="#ffffff" />
              </g>
            </svg>
          )}
          
          {isLight && (
            <>
              {/* Cacti (Light Mode Only) */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={`cactus-${i}`}
                  className="absolute"
                  style={{
                    bottom: '30px',
                    left: `${15 + i * 18}%`,
                    opacity: 0.3,
                  }}
                >
                  <svg width={20 + i * 3} height={30 + i * 5} viewBox="0 0 20 40" fill="none">
                    {/* Main body */}
                    <rect x="8" y="10" width="4" height="30" rx="2" fill="#4a7c59" />
                    {/* Left arm */}
                    <path d="M8 20 Q5 20 5 17 L5 15 Q5 12 7 12" stroke="#4a7c59" strokeWidth="3" fill="none" strokeLinecap="round" />
                    {/* Right arm */}
                    <path d="M12 25 Q15 25 15 22 L15 20 Q15 17 13 17" stroke="#4a7c59" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              ))}
              
              {/* Rocks (Light Mode Only) */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={`rock-${i}`}
                  className="absolute"
                  style={{
                    bottom: '10px',
                    left: `${10 + i * 15}%`,
                    opacity: 0.25,
                  }}
                >
                  <svg width={12 + i * 2} height={8 + i} viewBox="0 0 15 10" fill="none">
                    <ellipse cx="7.5" cy="7" rx="7" ry="5" fill="#8b7355" />
                  </svg>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Sun/Moon */}
        <motion.div
          className="absolute right-[10%]"
          style={{
            top: `${10 + scrollProgress * 40}%`,
            opacity: 0.25,
          }}
        >
          {isLight ? (
            // Sun
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 bg-yellow-400 rounded-full shadow-[0_0_25px_rgba(251,191,36,0.3)]" />
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-yellow-400 opacity-40"
                  style={{
                    transformOrigin: 'center',
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-16px)`,
                  }}
                />
              ))}
            </div>
          ) : (
            // Moon
            <div className="w-12 h-12 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)] relative">
              <div className="absolute top-2 right-1 w-2 h-2 bg-gray-100 rounded-full opacity-40" />
              <div className="absolute bottom-2 left-1.5 w-1.5 h-1.5 bg-gray-100 rounded-full opacity-30" />
            </div>
          )}
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent font-semibold text-center mb-12"
          style={{
            backgroundImage: isLight
              ? "linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          My Journey
        </motion.h1>

        {/* Timeline Container */}
        <div className="relative">
          {/* Progress Line */}
          <div className={`absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 ${isLight ? "bg-black/10" : "bg-white/10"}`}>
            <motion.div
              className={`absolute left-0 top-0 w-full ${isLight ? "bg-black/30" : "bg-white/30"}`}
              style={{
                height: scrollYProgress,
                scaleY: scrollYProgress,
                transformOrigin: "top",
              }}
            />
          </div>

          {/* Paper Plane Icon - follows scroll smoothly with dynamic movement */}
          <div
            className="absolute left-4 sm:left-6 z-40 pointer-events-none transition-all duration-75 ease-linear"
            style={{
              top: `calc(${scrollProgress * 100}%)`,
              transform: 'translateY(-14px)',
            }}
          >
            <motion.div
              style={{
                x: -14,
                y: -14,
              }}
              animate={{
                rotate: [0, -8, 8, -5, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              }}
            >
              {/* Trailing effect */}
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 -z-10"
                style={{
                  width: '40px',
                  height: '2px',
                  background: isLight 
                    ? 'linear-gradient(to right, rgba(245, 158, 11, 0.6), transparent)' 
                    : 'linear-gradient(to right, rgba(255, 255, 255, 0.5), transparent)',
                  transformOrigin: 'left center',
                }}
                animate={{
                  scaleX: [0.6, 1.2, 0.6],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Multiple particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 sm:w-1 sm:h-1 rounded-full"
                  style={{
                    background: isLight ? 'rgba(245, 158, 11, 0.7)' : 'rgba(255, 255, 255, 0.6)',
                    left: `-${8 + i * 6}px`,
                    top: '50%',
                  }}
                  animate={{
                    x: [-5, -12],
                    y: [0, (i - 1) * 2],
                    opacity: [0.7, 0],
                    scale: [1, 0.3],
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                />
              ))}
              
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                className={`drop-shadow-lg ${isLight ? 'text-amber-500' : 'text-white'}`}
                style={{
                  filter: isLight 
                    ? 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.9))' 
                    : 'drop-shadow(0 0 20px rgba(255, 255, 255, 1))',
                }}
              >
                <path 
                  d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" 
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </svg>
            </motion.div>
          </div>

          {/* Finish Label */}
          <div className="absolute left-0 bottom-0 z-20 -translate-y-6">
            <span className={`${isLight ? "bg-amber-100/80 text-black border-amber-200" : "bg-white/10 text-white border-white/20"} backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold shadow-lg border`}>
              Finish
            </span>
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 relative pl-12 sm:pl-16">
            {timelineData.map((item, index) => {
              const isActive = index <= activeIndex;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-[34px] sm:-left-[42px] top-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 z-30 transition-all duration-300 ${
                      isActive 
                        ? `${isLight ? 'bg-amber-400 border-amber-600 shadow-[0_0_12px_rgba(251,191,36,0.6)]' : 'bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.6)]'}` 
                        : `${isLight ? 'bg-gray-300 border-gray-400' : 'bg-gray-700 border-gray-600'}`
                    }`}
                  />

                  {/* Card */}
                  <div className={`relative ${isLight ? 'bg-white/80' : 'bg-white/5'} backdrop-blur-sm border rounded-lg p-4 transition-all duration-300 ${
                    isActive 
                      ? (isLight ? 'border-amber-300 shadow-lg' : 'border-white/20 shadow-lg') 
                      : (isLight ? 'border-gray-200' : 'border-white/10')
                  }`}>
                    {/* Year Badge */}
                    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${isLight ? 'bg-black/10 text-black' : 'bg-white/15 text-white'} font-semibold text-xs mb-2`}>
                      {item.year}
                      {item.current && (
                        <span className={`inline-flex h-1.5 w-1.5 rounded-full ${isLight ? 'bg-black' : 'bg-white'} animate-pulse`} />
                      )}
                    </div>

                    {/* Title with Logo */}
                    <div className="flex items-start gap-3 mb-2">
                      {item.logo && (
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden ${isLight ? 'bg-white' : 'bg-white/10'} border ${isLight ? 'border-gray-200' : 'border-white/20'} p-1.5 flex-shrink-0`}>
                          <img src={item.logo} alt={item.title} className="w-full h-full object-contain" loading="lazy" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-base sm:text-lg font-bold ${isLight ? 'text-black' : 'text-white'} mb-1`}>
                          {item.title}
                        </h3>
                        <p className={`${isLight ? 'text-gray-700' : 'text-gray-300'} text-sm`}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Childhood Photos */}
                    {item.childhoodPhotos && (
                      <div className="relative mt-3 h-16 sm:h-20">
                        {item.childhoodPhotos.map((photo, i) => (
                          <div
                            key={i}
                            className="absolute"
                            style={{
                              left: `${i * 30}px`,
                              top: `${i * 6}px`,
                              transform: `rotate(${(i - 1) * 6}deg)`,
                              zIndex: 10 + i,
                            }}
                          >
                            <div className={`rounded-lg overflow-hidden shadow-lg border-2 ${isLight ? 'border-amber-200 bg-white' : 'border-white/30 bg-white/10'}`}>
                              <img
                                src={photo}
                                alt={`Bocil ${i + 1}`}
                                className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Organizations */}
                    {item.organizations && (
                      <div className={`mt-3 pt-3 border-t ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                        <h4 className={`text-xs font-semibold ${isLight ? 'text-gray-600' : 'text-white/70'} mb-2`}>
                          Organisasi & Ekstrakurikuler:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {item.organizations.map((org, orgIndex) => (
                            <div
                              key={orgIndex}
                              className={`px-2 py-1 ${isLight ? 'bg-amber-100/50 border-amber-200 text-black' : 'bg-white/10 border-white/20 text-white'} backdrop-blur-sm border rounded text-xs font-medium`}
                            >
                              {org.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;