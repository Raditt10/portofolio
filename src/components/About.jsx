import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "react-fast-marquee";

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const photoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return document.documentElement.dataset.theme || 'dark';
  });
  const isLight = theme === 'light';

  // Deteksi mobile dengan useEffect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tech stack data untuk marquee background
  const techStack = useMemo(() => [
    { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/000000" },
    { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { name: "Python", logo: "https://cdn.simpleicons.org/python" },
    { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
  ], []);

  const marqueeRows = useMemo(() => [
    { speed: 25, direction: "left" },
    { speed: 30, direction: "right" },
    { speed: 28, direction: "left" },
  ], []);

  const glowColors = useMemo(() => [
    "rgba(139, 92, 246, 0.6)",
    "rgba(59, 130, 246, 0.6)", 
    "rgba(0, 255, 249, 0.6)",
  ], []);

  // GSAP animation setup
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current || !photoRef.current) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;
    const photo = photoRef.current;

    // Cancel animations jika sudah ada
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Set initial states
    gsap.set(title, { y: -20 });
    gsap.set(content, { x: isMobile ? 0 : -30, opacity: 0.8 });
    gsap.set(photo, { x: isMobile ? 0 : 30, scale: 0.95 });

    // Timeline animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false
      },
      defaults: {
        ease: "power2.out",
        duration: 0.5
      }
    });

    // Animasi sequence
    tl.to(title, { y: 0 })
      .to(content, { x: 0, opacity: 1 }, "-=0.3")
      .to(photo, { x: 0, scale: 1 }, "-=0.4");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, [isMobile]);

  // Sync theme from attribute/localStorage
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          const current = document.documentElement.dataset.theme;
          setTheme(current || 'dark');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 overflow-hidden"
      style={{ fontFamily: "Sora Variable" }}
    >
      {/* Background gradient - sama seperti TechStack */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: isLight
            ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 50%)'
            : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)'
        }}
      />

      {/* Background Tech Stack Marquee */}
      <div className="absolute inset-0 opacity-8 pointer-events-none overflow-hidden">
        {marqueeRows.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            className={`my-12 ${rowIndex % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
            style={{ top: `${20 + rowIndex * 25}%` }}
          >
            <Marquee 
              speed={row.speed}
              direction={row.direction}
              gradient={false}
              pauseOnHover={false}
            >
              {techStack.map((tech, index) => (
                <div key={`${rowIndex}-${index}`} className="mx-8">
                  <div className="relative w-12 h-12">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      width={48}
                      height={48}
                      loading="lazy"
                      className="w-full h-full object-contain"
                      style={{
                        filter: `drop-shadow(0 0 8px ${glowColors[rowIndex % glowColors.length]})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        ))}
      </div>

      {/* Title Section - sama seperti TechStack */}
      <div className="relative z-10 px-4 mb-8 sm:mb-12 md:mb-16">
        <h1 
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent font-semibold text-center"
          style={{
            backgroundImage: isLight
              ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
          }}
        >
          About Me
        </h1>
      </div>

      {/* Main Content Grid */}

      <div className="relative z-10 max-w-6xl mx-auto">
        {isMobile ? (
          <div className="flex flex-col gap-8 items-center">
            {/* Foto di atas */}
            <div ref={photoRef} className="flex justify-center">
              <div className="relative">
                <div className={`
                  relative w-80 h-80 backdrop-blur-sm rounded-xl border transition-all duration-200 overflow-hidden
                  ${isLight 
                    ? 'bg-white/70 border-amber-200/50 hover:bg-white/80 hover:border-amber-300/60' 
                    : 'bg-gray-900/40 border-gray-700/30 hover:bg-gray-800/50 hover:border-purple-500/30'
                  }
                `}>
                  <img
                    src="/img/avatar2.png"
                    alt="Rafaditya Syahputra"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* Decorative elements - subtle glow */}
                <div className={`
                  absolute -top-4 -right-4 w-20 h-20 rounded-full blur-xl
                  ${isLight ? 'bg-amber-100' : 'bg-purple-500/20'}
                `}></div>
                <div className={`
                  absolute -bottom-4 -left-4 w-16 h-16 rounded-full blur-xl
                  ${isLight ? 'bg-orange-100' : 'bg-blue-500/20'}
                `}></div>
              </div>
            </div>
            {/* Text di bawah */}
            <div ref={contentRef} className="space-y-6 w-full">
              {/* Name & Title */}
              <div className="space-y-3 text-center">
                <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'} leading-tight`}>
                  Rafaditya Syahputra
                </h2>
                <p className={`text-lg ${isLight ? 'text-amber-600' : 'text-yellow-400'} font-medium`}>
                  Front end Developer
                </p>
                <div className={`mx-auto w-16 h-1 ${isLight ? 'bg-amber-600' : 'bg-yellow-400'} rounded-full`}></div>
              </div>
              {/* Description */}
              <div className={`space-y-4 text-base ${isLight ? 'text-slate-700' : 'text-slate-300'} leading-relaxed`}>
                <p>
                  Hao! Saya Rafaditya Syahputra, seorang Front End Developer dengan passion dalam 
                  menciptakan solusi digital yang inovatif dan efisien. Dengan pengalaman lebih dari
                  2 tahun di industri teknologi, saya telah mengembangkan berbagai aplikasi web dan 
                  mobile yang tidak hanya fungsional tetapi juga memberikan pengalaman pengguna yang 
                  luar biasa.
                </p>
                <p>
                  Sekarang Saya berusia 17 tahun dan sedang menempuh pendidikan SMK di SMKN 13 Bandung,
                  jurusan Rekayasa Perangkat Lunak. Kelas 11. Selain itu, saya juga aktif berkontribusi
                  pada proyek open-source dan terus memperbarui keterampilan saya dengan teknologi terbaru.
                </p>
              </div>
              {/* Call to Action */}
              <div className="pt-4 flex justify-start">
                <a
                  href="/file/Rafaditya Syahputra_CV.pdf"
                  download
                  className={`
                    relative flex items-center justify-center px-6 py-3 backdrop-blur-sm rounded-xl border transition-all duration-200 font-medium text-lg
                    ${isLight 
                      ? 'bg-white/70 border-amber-200/50 hover:bg-white/80 hover:border-amber-300/60 text-slate-800' 
                      : 'bg-gray-900/40 border-gray-700/30 hover:bg-gray-800/50 hover:border-purple-500/30 text-white'
                    } transform hover:-translate-y-1 hover:scale-105
                  `}
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content - About Text */}
            <div ref={contentRef} className="space-y-6">
              {/* Name & Title */}
              <div className="space-y-3">
                <h2 className={`text-2xl lg:text-3xl font-bold ${isLight ? 'text-slate-900' : 'text-white'} leading-tight`}>
                  Rafaditya Syahputra
                </h2>
                <p className={`text-lg ${isLight ? 'text-amber-600' : 'text-yellow-400'} font-medium`}>
                  Full Stack Developer
                </p>
                <div className={`w-16 h-1 ${isLight ? 'bg-amber-600' : 'bg-yellow-400'} rounded-full`}></div>
              </div>
              {/* Description */}
              <div className={`space-y-4 text-base lg:text-lg ${isLight ? 'text-slate-700' : 'text-slate-300'} leading-relaxed`}>
                <p>
                  Hao! Saya Rafaditya Syahputra, seorang Full Stack Developer dengan passion dalam 
                  menciptakan solusi digital yang inovatif dan efisien. Dengan pengalaman lebih dari
                  2 tahun di industri teknologi, saya telah mengembangkan berbagai aplikasi web dan 
                  mobile yang tidak hanya fungsional tetapi juga memberikan pengalaman pengguna yang 
                  luar biasa.
                </p>
                <p>
                  Sekarang Saya berusia 17 tahun dan sedang menempuh pendidikan SMK di SMKN 13 Bandung,
                  jurusan Rekayasa Perangkat Lunak. Kelas 11. Selain itu, saya juga aktif berkontribusi
                  pada proyek open-source dan terus memperbarui keterampilan saya dengan teknologi terbaru.
                </p>
              </div>
              {/* Call to Action - dengan styling card seperti TechStack */}
              <div className="pt-4 flex justify-start">
                <a
                  href="/file/Rafaditya Syahputra_CV.pdf"
                  download
                  className={`
                    relative flex items-center justify-center px-6 py-3 backdrop-blur-sm rounded-xl border transition-all duration-200 font-medium text-lg
                    ${isLight 
                      ? 'bg-white/70 border-amber-200/50 hover:bg-white/80 hover:border-amber-300/60 text-slate-800' 
                      : 'bg-gray-900/40 border-gray-700/30 hover:bg-gray-800/50 hover:border-purple-500/30 text-white'
                    } transform hover:-translate-y-1 hover:scale-105
                  `}
                >
                  Download CV
                </a>
              </div>
            </div>
            {/* Right Content - Photo dengan styling card */}
            <div ref={photoRef} className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main Photo Card - menggunakan style card seperti TechStack */}
                <div className={`
                  relative w-80 h-80 lg:w-96 lg:h-96 backdrop-blur-sm rounded-xl border transition-all duration-200 overflow-hidden
                  ${isLight 
                    ? 'bg-white/70 border-amber-200/50 hover:bg-white/80 hover:border-amber-300/60' 
                    : 'bg-gray-900/40 border-gray-700/30 hover:bg-gray-800/50 hover:border-purple-500/30'
                  }
                `}>
                  <img
                    src="/img/avatar2.png"
                    alt="Rafaditya Syahputra"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* Decorative elements - subtle glow */}
                <div className={`
                  absolute -top-4 -right-4 w-20 h-20 rounded-full blur-xl
                  ${isLight ? 'bg-amber-100' : 'bg-purple-500/20'}
                `}></div>
                <div className={`
                  absolute -bottom-4 -left-4 w-16 h-16 rounded-full blur-xl
                  ${isLight ? 'bg-orange-100' : 'bg-blue-500/20'}
                `}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inline CSS untuk reduced motion - sama seperti TechStack */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
