import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const Journey = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const timelineData = [
    {
      year: "2008",
      title: "Kelahiran",
      description: "Awal perjalanan hidup saya dimulai",
      color: "from-purple-500 to-pink-500",
      childhoodPhotos: [
        "/img/bocil1.jpg",
        "/img/bocil2.jpg",
        "/img/bocil3.jpg"
      ]
    },
    {
      year: "2014",
      title: "TK Darul Fikri",
      description: "Memulai pendidikan di Taman Kanak-kanak Darul Fikri",
      logo: "/img/tk.jpg",
      color: "from-blue-500 to-cyan-500",
    },
    {
      year: "2015",
      title: "SD 090 Cibiru",
      description: "Melanjutkan pendidikan dasar di SD 090 Cibiru",
      logo: "/img/sd.png",
      color: "from-green-500 to-emerald-500",
    },
    {
      year: "2020",
      title: "SMPN 1 Cileunyi",
      description: "Menempuh pendidikan menengah pertama di SMPN 1 Cileunyi",
      logo: "/img/smp.png",
      color: "from-orange-500 to-red-500",
    },
    {
      year: "2024 - Sekarang",
      title: "SMKN 13 Bandung",
      description: "Siswa kelas 11 SMKN 13 Bandung",
      logo: "/img/logo13.png",
      color: "from-violet-500 to-purple-500",
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

  // Update active timeline item based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        Math.floor(latest * timelineData.length),
        timelineData.length - 1
      );
      setActiveIndex(index);
    });

    return () => unsubscribe();
  }, [scrollYProgress, timelineData.length]);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-[#050607]"
      style={{ fontFamily: "Sora Variable, system-ui, sans-serif" }}
    >
      {/* Elegant Static Background - sama dengan Hero */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Central light bloom with soft amber halo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.12)_16%,rgba(255,255,255,0)_42%),radial-gradient(circle_at_68%_66%,rgba(255,214,170,0.12)_0%,rgba(255,214,170,0)_55%)]" />

        {/* Luxe vignette to deepen blacks */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title - lebih ringan */}
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
          My Journey
        </motion.h1>

        {/* Timeline Container */}
        <div className="relative">
          {/* Progress Percentage - responsive positioning */}
          <motion.div
            className="absolute z-20 transition-all duration-500 ease-out md:hidden"
            style={{
              left: 'calc(1.25rem - 2px)',
              top: `${(activeIndex + 1) / timelineData.length * 100}%`,
            }}
          >
            <span className="bg-black/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-lg border border-white/20 block">
              {Math.round(((activeIndex + 1) / timelineData.length) * 100)}%
            </span>
          </motion.div>

          {/* Progress Percentage Desktop */}
          <motion.div
            className="hidden md:block absolute z-20 transition-all duration-500 ease-out"
            style={{
              left: 'calc(50% + 12px)',
              top: `${(activeIndex + 1) / timelineData.length * 100}%`,
              transform: 'translateY(-50%)'
            }}
          >
            <span className="bg-black/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-lg border border-white/20 block whitespace-nowrap">
              {Math.round(((activeIndex + 1) / timelineData.length) * 100)}%
            </span>
          </motion.div>

          {/* Finish Label - Mobile */}
          <motion.div
            className="absolute z-20 md:hidden"
            style={{
              left: 'calc(1.25rem - 2px)',
              bottom: '-2rem',
            }}
          >
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg border border-white/20 block">
              Finish
            </span>
          </motion.div>

          {/* Finish Label - Desktop */}
          <motion.div
            className="hidden md:block absolute z-20"
            style={{
              left: 'calc(50% + 12px)',
              bottom: '-2rem',
              transform: 'translateX(-50%)'
            }}
          >
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg border border-white/20 block whitespace-nowrap">
              Finish
            </span>
          </motion.div>

          {/* Progress Line - simplified */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-white/30 via-white/25 to-white/20"
              style={{
                height: `${(activeIndex + 1) / timelineData.length * 100}%`,
                boxShadow: "0 0 12px rgba(139, 92, 246, 0.5)",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20 relative">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isActive = index <= activeIndex;

              return (
                <div key={index} className="relative flex flex-col md:flex-row md:items-start">
                  {/* Content wrapper untuk mobile dan desktop */}
                  <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-6 lg:pr-8' : 'md:pl-6 lg:pl-8 md:order-2'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className={`relative ${isLeft ? 'md:ml-auto' : ''} md:w-full`}
                    >
                      <div className="relative group ml-12 md:ml-0">
                        {/* School Logo - desktop only, lebih kecil */}
                        {item.logo && (
                          <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:block z-20 ${isLeft ? '-left-16 xl:-left-20' : '-right-16 xl:-right-20'}`}>
                            <motion.div 
                              className="relative w-12 h-12 xl:w-14 xl:h-14 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm border border-white/20 p-1.5"
                              whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
                            >
                              <img src={item.logo} alt={item.title} className="w-full h-full object-contain" />
                            </motion.div>
                          </div>
                        )}

                        {/* Card - optimized */}
                        <div className={`relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300 ${isActive ? 'border-white/20 shadow-lg shadow-white/10' : 'border-white/10'} hover:border-white/30 hover:shadow-xl hover:shadow-white/15`}>
                          {/* Year Badge */}
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white font-semibold text-xs sm:text-sm mb-3 border border-white/20">
                            {item.year}
                            {item.current && (
                              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
                            )}
                          </div>

                          {/* Title with Logo (mobile only) */}
                          <div className="flex items-start gap-3 mb-3">
                            {item.logo && (
                              <div className="lg:hidden relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm border border-white/15 p-1.5 flex-shrink-0">
                                <img src={item.logo} alt={item.title} className="w-full h-full object-contain" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 break-words">{item.title}</h3>
                              <p className="text-gray-300/90 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                              
                              {/* Childhood Photos - lebih kecil dan efisien */}
                              {item.childhoodPhotos && (
                                <div className="relative mt-4 h-16 sm:h-20 md:h-24">
                                  {item.childhoodPhotos.map((photo, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute group/photo"
                                      initial={{ opacity: 0, scale: 0 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: i * 0.1, duration: 0.3 }}
                                      viewport={{ once: true }}
                                      style={{
                                        left: `${i * 35}px`,
                                        top: `${i * 8}px`,
                                        rotate: `${(i - 1) * 8}deg`,
                                        zIndex: 10 + i,
                                      }}
                                    >
                                      <div className="rounded-lg overflow-hidden shadow-xl border-2 border-white/30 bg-gradient-to-br from-white/10 to-white/5 transition-transform duration-300 hover:scale-150 hover:z-50 hover:rotate-0">
                                        <img
                                          src={photo}
                                          alt={`Bocil ${i + 1}`}
                                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover"
                                        />
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Organizations */}
                          {item.organizations && (
                            <div className="mt-4 pt-4 border-t border-white/10">
                              <h4 className="text-xs font-semibold text-white/70 mb-2">Organisasi & Ekstrakurikuler:</h4>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {item.organizations.map((org, orgIndex) => (
                                  <motion.div
                                    key={orgIndex}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: orgIndex * 0.05, duration: 0.2 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05 }}
                                    className="relative group/org"
                                  >
                                    <div className="px-2.5 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md hover:bg-white/15 hover:border-white/40 transition-all duration-200">
                                      <span className="text-xs font-medium text-white">{org.name}</span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Simplified corner decorations */}
                          <div className="absolute top-1.5 left-1.5 w-3 h-3 border-l-2 border-t-2 border-white/40 group-hover:border-white/70 transition-colors" />
                          <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-r-2 border-b-2 border-white/40 group-hover:border-white/70 transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Dot - dengan Minecraft ladakan effect */}
                  <motion.div
                    className={`absolute left-[18px] md:left-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 sm:border-3 border-black z-30 transform -translate-x-1/2 transition-all duration-300 md:order-1 ${
                      isActive 
                        ? `bg-gradient-to-br from-white to-amber-100 shadow-[0_0_20px_rgba(255,255,255,0.6)]` 
                        : 'bg-gray-700 scale-100'
                    }`}
                    animate={isActive ? { scale: [1, 1.3, 0.9, 1.2, 1], opacity: [1, 0.8, 1, 0.9, 1] } : {}}
                    transition={{ duration: 0.6, repeat: isActive ? 2 : 0 }}
                  />\


                  {/* Spacer untuk desktop agar layout seimbang */}
                  <div className={`hidden md:block md:w-1/2 ${!isLeft ? 'md:order-1' : 'md:order-2'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;