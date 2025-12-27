import React, { useRef, useMemo } from "react";
import Marquee from "react-fast-marquee";
import ProfileCard from "./assets/ProfileCard";

const About = () => {
  const sectionRef = useRef(null);

  // Tech stack dengan CDN - SVG ringan dari simpleicons
  const techStack = useMemo(() => [
    { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/000000" },
    { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { name: "Python", logo: "https://cdn.simpleicons.org/python?viewbox=auto&size=20" },
    { name: "Dart", logo: "https://cdn.simpleicons.org/dart?viewbox=auto&size=20" },
    { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
    { name: "GitHub", logo: "https://cdn.simpleicons.org/github/181717" },
    { name: "VS Code", logo: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
    { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
    { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
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
      className="min-h-screen relative overflow-hidden bg-[#050607]"
    >
      {/* Top Gradient - simplified */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-10"></div>
      
      {/* Profile Card */}
      <div className="flex justify-center items-center pt-32 pb-20 relative z-20">
        <ProfileCard
          name="Rafaditya Syahputra"
          title="Front End Developer"
          handle="rafaa_ndl"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/img/avatar2.jpg"
          miniAvatarUrl="/img/meow.jpg"
          showUserInfo={true}
          enableTilt={false}
          enableMobileTilt={false}
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
                  <span className="text-white font-medium text-sm mt-2 tracking-wide">
                    {tech.name}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        ))}
      </div>

      {/* Bottom Gradient - simplified */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
    </section>
  );
};

export default About;