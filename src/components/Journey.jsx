import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
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
      icon: "",
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
      icon: "",
      logo: "/img/tk.jpg",
      color: "from-blue-500 to-cyan-500",
    },
    {
      year: "2015",
      title: "SD 090 Cibiru",
      description: "Melanjutkan pendidikan dasar di SD 090 Cibiru",
      icon: "",
      logo: "/img/sd.png",
      color: "from-green-500 to-emerald-500",
    },
    {
      year: "2020",
      title: "SMPN 1 Cileunyi",
      description: "Menempuh pendidikan menengah pertama di SMPN 1 Cileunyi",
      icon: "",
      logo: "/img/smp.png",
      color: "from-orange-500 to-red-500",
    },
    {
      year: "2024 - Sekarang",
      title: "SMKN 13 Bandung",
      description: "Siswa kelas 11 SMKN 13 Bandung",
      icon: "",
      logo: "/img/logo13.png",
      color: "from-violet-500 to-purple-500",
      current: true,
      organizations: [
        { name: "MPK", icon: "" },
        { name: "Badminton", icon: "" },
        { name: "IRMA", icon: "" },
        { name: "Sastrala", icon: "" },
        { name: "Programmer Club", icon: "" },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Update active timeline item based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
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
      className="relative min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/10"
      style={{ fontFamily: "Sora Variable" }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
            backgroundPosition: "center center",
          }}
        />
      </div>

      {/* Pulsing Orb Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0">
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-cyan-600/10 animate-pulse-slow"
          style={{ filter: "blur(60px)" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background:
                Math.random() > 0.5
                  ? "linear-gradient(45deg, #8b5cf6, #00fff9)"
                  : "linear-gradient(45deg, #ff00de, #8b5cf6)",
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${
                Math.random() > 0.5
                  ? "rgba(139, 92, 246, 0.8)"
                  : "rgba(0, 255, 249, 0.8)"
              }`,
              filter: "blur(1px)",
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-20">
        {/* Title */}
        <motion.h1
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent font-bold text-center relative z-30 overflow-hidden mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4"
          style={{
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 60px rgba(139, 92, 246, 0.5)",
            letterSpacing: "0.02em",
          }}
        >
          My Journey
        </motion.h1>

        {/* Timeline Container */}
        <div className="relative">
                    {/* Persentase progress benar-benar menempel di samping garis timeline */}
                    <motion.div
                      className="hidden md:flex absolute top-0 z-20"
                      style={{
                        left: 'calc(50% + 16px)', // 16px = setengah lebar garis (w-1) + sedikit jarak
                        top: `calc(${(activeIndex + 1) / timelineData.length * 100}% - 16px)`,
                        transition: 'top 0.5s cubic-bezier(0.4,0,0.2,1)'
                      }}
                    >
                      <span className="bg-black/80 px-3 py-1 rounded-full text-xs font-bold text-cyan-300 shadow-lg border border-cyan-400">
                        {Math.round(((activeIndex + 1) / timelineData.length) * 100)}%
                      </span>
                    </motion.div>
                    {/* Mobile: persen di atas garis, tetap menempel */}
                    <motion.div
                      className="flex md:hidden absolute z-20"
                      style={{
                        left: 'calc(50% + 20px)',
                        top: `calc(${(activeIndex + 1) / timelineData.length * 100}% - 32px)`,
                        transition: 'top 0.5s cubic-bezier(0.4,0,0.2,1)'
                      }}
                    >
                      <span className="bg-black/80 px-3 py-1 rounded-full text-xs font-bold text-cyan-300 shadow-lg border border-cyan-400">
                        {Math.round(((activeIndex + 1) / timelineData.length) * 100)}%
                      </span>
                    </motion.div>
          {/* Progress Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 rounded-full overflow-hidden">
            {/* Progress bar: tinggi proporsional dengan activeIndex */}
            <motion.div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-purple-500 via-cyan-400 to-purple-500 rounded-full"
              style={{
                height: `calc(${(activeIndex + 1) / timelineData.length * 100}% )`,
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
                transition: 'height 0.5s cubic-bezier(0.4,0,0.2,1)'
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24 relative">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isActive = index <= activeIndex;

              return (
                <div key={index} className="relative flex flex-col md:flex-row md:items-center">
                  {/* Left Side (Card or Empty) */}
                  <div className={`md:w-1/2 flex ${isLeft ? 'justify-end' : 'justify-center'} md:pr-8 md:pl-0`}> 
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="md:w-5/6"
                        whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
                      >
                        <div className="relative group">
                          {/* School Logo - Left */}
                          {item.logo && (
                            <div className="absolute -left-20 top-1/2 -translate-y-1/2 hidden md:block z-30">
                              <motion.div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden bg-white/10 backdrop-blur-xl border-2 border-white/30 p-2 shadow-[0_0_30px_rgba(139,92,246,0.4)] group-hover:border-white/50 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-500" whileHover={{ scale: 1.1, rotate: 5 }}>
                                <img src={item.logo} alt={`${item.title} logo`} className="w-full h-full object-contain" />
                              </motion.div>
                            </div>
                          )}
                          {/* Glow Effect */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl bg-gradient-to-br ${item.color} blur-xl`} />
                          {/* Card */}
                          <div className={`relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border rounded-2xl p-6 md:p-8 transition-all duration-500 ${isActive ? 'border-white/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]' : 'border-white/10'}`}>
                            {/* Year Badge */}
                            <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white font-bold text-sm mb-4 shadow-lg`}>
                              {item.year}
                              {item.current && (<span className="ml-2 inline-flex h-2 w-2 rounded-full bg-white animate-pulse" />)}
                            </div>
                            {/* Title with Logo (mobile) */}
                            <div className="flex items-start gap-4 mb-4">
                              {item.logo && (
                                <div className="md:hidden relative w-16 h-16 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 p-2 flex-shrink-0 group-hover:border-white/40 transition-all duration-300">
                                  <img src={item.logo} alt={`${item.title} logo`} className="w-full h-full object-contain" />
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-300 text-sm md:text-base">{item.description}</p>
                                {/* Childhood Photos for Kelahiran - floating abstract left, zoom on hover */}
                                {item.childhoodPhotos && (
                                  <>
                                    {/* Bocil 1: kiri bawah */}
                                    <div className="absolute z-30 select-none group/bocil"
                                      style={{
                                        bottom: '-48px',
                                        left: '-60px',
                                        transform: 'rotate(-8deg)',
                                      }}
                                    >
                                      <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/30 bg-gradient-to-br from-purple-400/30 to-pink-400/30 animate-float-bocil1 transition-transform duration-300 group-hover/bocil:scale-150 group-hover/bocil:z-50">
                                        <img
                                          src={item.childhoodPhotos[0]}
                                          alt="Bocil 1"
                                          className="w-20 h-20 object-cover md:w-24 md:h-24"
                                          style={{ aspectRatio: '1/1' }}
                                        />
                                      </div>
                                    </div>
                                    {/* Bocil 2: lebih ke kiri, lebih bawah, rotasi berbeda */}
                                    <div className="absolute z-30 select-none group/bocil"
                                      style={{
                                        bottom: '-32px',
                                        left: '-120px',
                                        transform: 'rotate(10deg) scale(0.95)',
                                      }}
                                    >
                                      <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/30 bg-gradient-to-br from-pink-400/30 to-purple-400/30 animate-float-bocil2 transition-transform duration-300 group-hover/bocil:scale-150 group-hover/bocil:z-50">
                                        <img
                                          src={item.childhoodPhotos[1]}
                                          alt="Bocil 2"
                                          className="w-16 h-16 object-cover md:w-20 md:h-20"
                                          style={{ aspectRatio: '1/1' }}
                                        />
                                      </div>
                                    </div>
                                    {/* Bocil 3: lebih ke bawah, lebih ke kiri, rotasi berbeda */}
                                    <div className="absolute z-30 select-none group/bocil"
                                      style={{
                                        bottom: '-100px',
                                        left: '-80px',
                                        transform: 'rotate(-16deg) scale(1.08)',
                                      }}
                                    >
                                      <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/30 bg-gradient-to-br from-purple-400/30 to-pink-400/30 animate-float-bocil3 transition-transform duration-300 group-hover/bocil:scale-150 group-hover/bocil:z-50">
                                        <img
                                          src={item.childhoodPhotos[2]}
                                          alt="Bocil 3"
                                          className="w-16 h-16 object-cover md:w-20 md:h-20"
                                          style={{ aspectRatio: '1/1' }}
                                        />
                                      </div>
                                    </div>
                                    <style>{`
                                      @keyframes float-bocil1 {
                                        0%, 100% { transform: translateY(0) scale(1) rotate(-8deg); }
                                        50% { transform: translateY(-10px) scale(1.05) rotate(-8deg); }
                                      }
                                      @keyframes float-bocil2 {
                                        0%, 100% { transform: translateY(0) scale(0.95) rotate(10deg); }
                                        50% { transform: translateY(-16px) scale(1.02) rotate(10deg); }
                                      }
                                      @keyframes float-bocil3 {
                                        0%, 100% { transform: translateY(0) scale(1.08) rotate(-16deg); }
                                        50% { transform: translateY(-8px) scale(1.13) rotate(-16deg); }
                                      }
                                      .animate-float-bocil1 { animation: float-bocil1 3.2s ease-in-out infinite; }
                                      .animate-float-bocil2 { animation: float-bocil2 2.7s ease-in-out infinite; }
                                      .animate-float-bocil3 { animation: float-bocil3 3.7s ease-in-out infinite; }
                                    `}</style>
                                  </>
                                )}
                              </div>
                            </div>
                            {/* Organizations */}
                            {item.organizations && (
                              <div className="mt-6 space-y-3">
                                <h4 className="text-sm font-semibold text-cyan-400 mb-3">Organisasi & Ekstrakurikuler:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.organizations.map((org, orgIndex) => (
                                    <motion.div key={orgIndex} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: orgIndex * 0.1, duration: 0.3 }} whileHover={{ scale: 1.1, y: -5 }} className="group/org relative">
                                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-0 group-hover/org:opacity-50 transition-opacity duration-300" />
                                      <div className="relative px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                                        <span className="text-lg">{org.icon}</span>
                                        <span className="text-sm font-medium text-white">{org.name}</span>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {/* Decorative Corners */}
                            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  {/* Middle Timeline Dot */}
                  <motion.div
                    className={`absolute left-8 md:left-1/2 w-8 h-8 rounded-full border-4 border-black z-20 flex items-center justify-center text-lg transform -translate-x-1/2 transition-all duration-500 ${isActive ? `bg-gradient-to-br ${item.color} shadow-[0_0_30px_rgba(139,92,246,0.8)] scale-110` : 'bg-gray-800 shadow-none scale-100'}`}
                    animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 2, repeat: item.current ? Infinity : 0, ease: 'easeInOut' }}
                  >
                    <span className="text-sm">{item.icon}</span>
                  </motion.div>
                  {/* Right Side (Card or Empty) */}
                  <div className={`md:w-1/2 flex ${!isLeft ? 'justify-start' : 'justify-center'} md:pl-8 md:pr-0`}>
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="md:w-5/6"
                        whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
                      >
                        <div className="relative group">
                          {/* School Logo - Right */}
                          {item.logo && (
                            <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden md:block z-30">
                              <motion.div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden bg-white/10 backdrop-blur-xl border-2 border-white/30 p-2 shadow-[0_0_30px_rgba(139,92,246,0.4)] group-hover:border-white/50 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-500" whileHover={{ scale: 1.1, rotate: 5 }}>
                                <img src={item.logo} alt={`${item.title} logo`} className="w-full h-full object-contain" />
                              </motion.div>
                            </div>
                          )}
                          {/* Glow Effect */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl bg-gradient-to-br ${item.color} blur-xl`} />
                          {/* Card */}
                          <div className={`relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border rounded-2xl p-6 md:p-8 transition-all duration-500 ${isActive ? 'border-white/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]' : 'border-white/10'}`}>
                            {/* Year Badge */}
                            <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white font-bold text-sm mb-4 shadow-lg`}>
                              {item.year}
                              {item.current && (<span className="ml-2 inline-flex h-2 w-2 rounded-full bg-white animate-pulse" />)}
                            </div>
                            {/* Title with Logo (mobile) */}
                            <div className="flex items-start gap-4 mb-4">
                              {item.logo && (
                                <div className="md:hidden relative w-16 h-16 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 p-2 flex-shrink-0 group-hover:border-white/40 transition-all duration-300">
                                  <img src={item.logo} alt={`${item.title} logo`} className="w-full h-full object-contain" />
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-300 text-sm md:text-base">{item.description}</p>
                              </div>
                            </div>
                            {/* Organizations */}
                            {item.organizations && (
                              <div className="mt-6 space-y-3">
                                <h4 className="text-sm font-semibold text-cyan-400 mb-3">Organisasi & Ekstrakurikuler:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.organizations.map((org, orgIndex) => (
                                    <motion.div key={orgIndex} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: orgIndex * 0.1, duration: 0.3 }} whileHover={{ scale: 1.1, y: -5 }} className="group/org relative">
                                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-0 group-hover/org:opacity-50 transition-opacity duration-300" />
                                      <div className="relative px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                                        <span className="text-lg">{org.icon}</span>
                                        <span className="text-sm font-medium text-white">{org.name}</span>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {/* Decorative Corners */}
                            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 z-50 hidden md:block"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px) rotate(180deg);
            opacity: 0;
          }
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
};

export default Journey;
