import React, { useRef, useMemo, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import ProfileCard from "./assets/ProfileCard";

const About = () => {
  const sectionRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    // Check localStorage first (primary source), then data-theme attribute
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return document.documentElement.dataset.theme || 'dark';
  });
  const isLight = theme === 'light';

  // Sync with global theme
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    // Set initial theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
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

  const techStack = useMemo(() => [
    { name: "", logo: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    { name: "", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "", logo: "https://cdn.simpleicons.org/nextdotjs/000000" },
    { name: "", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { name: "", logo: "https://cdn.simpleicons.org/python?viewbox=auto&size=20" },
    { name: "", logo: "https://cdn.simpleicons.org/dart?viewbox=auto&size=20" },
    { name: "", logo: "https://cdn.simpleicons.org/git/F05032" },
    { name: "", logo: "https://cdn.simpleicons.org/github/181717" },
    { name: "", logo: "https://cdn.simpleicons.org/clojure?viewbox=auto&size=20" },
    { name: "", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
    { name: "", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
  ], []);

  // Konfigurasi marquee row di-memoize
  const marqueeRows = useMemo(() => [
    { speed: 28, direction: "left" },
    { speed: 32, direction: "right" },
    { speed: 30, direction: "left" },
    { speed: 34, direction: "right" },
    { speed: 26, direction: "left" },
    { speed: 29, direction: "right" },
  ], []);

  // Warna gradient di-memoize
  const glowColors = useMemo(() => [
    "rgba(139, 92, 246, 0.8)",
    "rgba(59, 130, 246, 0.8)", 
    "rgba(0, 255, 249, 0.8)",
    "rgba(255, 0, 222, 0.8)",
    "rgba(0, 255, 136, 0.8)",
  ], []);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className={`min-h-screen relative overflow-hidden ${isLight ? 'bg-slate-50' : 'bg-[#050607]'}`}
    >
      {/* Top Gradient - simplified */}
      <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${isLight ? 'from-white/80 via-white/40 to-transparent' : 'from-black/90 via-black/40 to-transparent'} z-10`}></div>
      
      {/* Profile Card */}
      <div className="flex justify-center items-center pt-32 pb-20 relative z-20">
        <ProfileCard
          name="Rafaditya Syahputra"
          title="Full Stack Developer"
          handle="rafaa_ndl"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/img/avatar2.jpg"
          miniAvatarUrl="/img/meow.jpg"
          showUserInfo={true}
          enableTilt={false}
          enableMobileTilt={false}
          themeMode={theme}
          onContactClick={() => console.log("Contact clicked")}
        />
      </div>

      {/* Tech Stack Marquee - optimasi performa */}
      <div className="absolute inset-0 opacity-12 pointer-events-none overflow-hidden">
        {marqueeRows.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            className={`my-8 ${rowIndex % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
          >
            <Marquee 
              speed={row.speed}
              direction={row.direction}
              gradient={false}
              pauseOnHover={false}
            >
              {techStack.map((tech, index) => (
                <div key={`${rowIndex}-${index}`} className="mx-6 flex flex-col items-center">
                  <div className="relative w-14 h-14 sm:w-18 sm:h-18">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                      style={{
                        filter: `drop-shadow(0 0 10px ${glowColors[rowIndex % glowColors.length]})`,
                      }}
                    />
                  </div>
                  <span className={`${isLight ? 'text-slate-800' : 'text-white'} font-medium text-sm mt-2 tracking-wide`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        ))}
      </div>

      {/* Bottom Gradient - simplified */}
      <div className={`absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t ${isLight ? 'from-white/80 via-white/40 to-transparent' : 'from-black/90 via-black/40 to-transparent'} z-10`}></div>
    </section>
  );
};

export default About;