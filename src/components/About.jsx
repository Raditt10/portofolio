import React, { useRef, useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import ProfileCard from "./assets/ProfileCard";

const About = () => {
  const glowRef = useRef(null);
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const techStack = [
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Tailwind CSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    },
    {
      name: "HTML5",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "VS Code",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    {
      name: "Figma",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="min-h-screen relative overflow-hidden bg-black">
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-10"></div>
      
      {/* Mouse Glow Effect */}
      <div 
        ref={glowRef}
        className="absolute pointer-events-none z-15 transition-opacity duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: mousePosition.x > 0 ? 1 : 0
        }}
      />
      
      {/* Profile Card */}
      <div className="flex justify-center items-center pt-32 pb-20 relative z-20">
        <ProfileCard
          name="Rafaditya Syahputra"
          title="Front End Developer"
          handle="rafaa_ndl"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/img/radit2.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
      </div>

      {/* Tech Stack Marquee Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="flex flex-col gap-12 rotate-6 transform scale-110 mt-10">
          {/* Multiple Marquee Rows */}
          {[40, 50, 45, 55, 50, 60].map((speed, rowIndex) => (
            <Marquee 
              key={`row-${rowIndex}`}
              speed={speed} 
              direction={rowIndex % 2 === 0 ? "left" : "right"} 
              gradient={false}
            >
              {techStack.map((tech, index) => {
                const colors = [
                  "rgba(139, 92, 246, 0.8)",
                  "rgba(59, 130, 246, 0.8)", 
                  "rgba(0, 255, 249, 0.8)",
                  "rgba(255, 0, 222, 0.8)",
                  "rgba(0, 255, 136, 0.8)",
                  "rgba(139, 92, 246, 0.8)"
                ];
                
                return (
                  <div key={`row${rowIndex}-${index}`} className="mx-10 flex flex-col items-center gap-2">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      loading="lazy"
                      className="w-28 h-28 drop-shadow-2xl filter brightness-200 transition-transform duration-300 hover:scale-110"
                      style={{
                        filter: `drop-shadow(0 0 30px ${colors[rowIndex]})`,
                      }}
                    />
                    <span className="text-white font-bold text-xl tracking-wider drop-shadow-lg">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </Marquee>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10"></div>
    </section>
  );
};

export default About;