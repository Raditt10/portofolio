import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const Educations = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
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
      logo: "/img/tk.png",
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
      organizations: [
        { name: "English Club" },
        { name: "Badminton" },
      ],
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
        { name: "IRMA (Rohis SMKN 13 Bandung)" },
        { name: "Sastrala (Jurnalis SMKN 13 Bandung)" },
        { name: "Musi" },
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
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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

  const shouldAnimate = !prefersReducedMotion;

  return (
    <section
      id="educations"
      ref={sectionRef}
      className="relative min-h-screen pt-20 pb-20 px-4 sm:px-6 overflow-hidden"
      style={{ fontFamily: "Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
    >
      {/* Minimal background aligned with global theme */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: isLight
              ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 50%)'
              : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent font-semibold text-center mb-12 font-comic"
          style={{
            fontFamily: '"Sensei Biased", system-ui, sans-serif',
            backgroundImage: isLight
              ? "linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          My Educations
        </h1>

        {/* Timeline Container */}
        <div className="relative">
          {/* Progress Line */}
          <div className={`absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 ${isLight ? "bg-black/20" : "bg-white/20"}`} />

          {/* Paper Plane Icon - Simplified Animation */}
          {shouldAnimate && (
            <div
              className="absolute left-4 sm:left-6 z-40 pointer-events-none transition-all duration-100 ease-linear"
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
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Simplified Trail */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 -z-10 h-0.5 w-8 rounded-full"
                  style={{
                    background: isLight 
                      ? 'linear-gradient(to right, rgba(245, 158, 11, 0.5), transparent)' 
                      : 'linear-gradient(to right, rgba(255, 255, 255, 0.4), transparent)',
                  }}
                />
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={isLight ? '#111827' : 'white'} strokeWidth="1.5">
                  <path d="M3 12 L12 5 L21 12 L12 19 Z" fill={isLight ? '#fcd34d' : '#0ea5e9'} opacity="0.8" />
                  <path d="M12 5 L12 19" stroke={isLight ? '#92400e' : '#38bdf8'} />
                </svg>
              </motion.div>
            </div>
          )}

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
                    className={`absolute -left-[34px] sm:-left-[42px] top-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 z-30 transition-colors duration-200 ${
                      isActive 
                        ? `${isLight ? 'bg-amber-400 border-amber-600' : 'bg-white border-white'}` 
                        : `${isLight ? 'bg-gray-300 border-gray-400' : 'bg-gray-700 border-gray-600'}`
                    }`}
                  />

                  {/* Card */}
                  <div 
                    className={`relative ${isLight ? 'bg-white/70' : 'bg-white/5'} backdrop-blur-sm border rounded-lg p-4 transition-colors duration-200 ${
                      isActive 
                        ? (isLight ? 'border-amber-300' : 'border-white/20') 
                        : (isLight ? 'border-gray-200' : 'border-white/10')
                    }`}
                  >
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
                          <motion.div
                            key={i}
                            className="absolute"
                            style={{
                              left: `${i * 30}px`,
                              top: `${i * 6}px`,
                              zIndex: 10 + i,
                            }}
                            initial={{ opacity: 0, rotate: 0 }}
                            whileInView={{ 
                              opacity: 1, 
                              rotate: (i - 1) * 6 
                            }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            whileHover={shouldAnimate ? { 
                              scale: 1.05, 
                              rotate: 0,
                              zIndex: 50,
                              transition: { duration: 0.2 }
                            } : {}}
                          >
                            <div className={`rounded-lg overflow-hidden shadow-lg border-2 ${isLight ? 'border-amber-200 bg-white' : 'border-white/30 bg-white/10'}`}>
                              <img
                                src={photo}
                                alt={`Bocil ${i + 1}`}
                                className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
                                loading="lazy"
                              />
                            </div>
                          </motion.div>
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
                            <motion.div
                              key={orgIndex}
                              className={`px-2 py-1 ${isLight ? 'bg-amber-100/50 border-amber-200 text-black' : 'bg-white/10 border-white/20 text-white'} backdrop-blur-sm border rounded text-xs font-medium`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + orgIndex * 0.05 }}
                              whileHover={shouldAnimate ? { 
                                scale: 1.05,
                                transition: { duration: 0.2 }
                              } : {}}
                            >
                              {org.name}
                            </motion.div>
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

export default Educations;