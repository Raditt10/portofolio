import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const glowRef = useRef(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  useGSAP(() => {
    gsap.set("#nama", { overflow: "hidden" });
    gsap.set([".hero-subtitle", ".hero-description", ".scroll-text", ".scroll-arrow", ".github-container"], {
      opacity: 0,
      y: 50
    });

    let mm = gsap.matchMedia();

    const createTypewriterLoop = (chars, speed) => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      cursor.style.cssText = `
        display: inline-block;
        width: 4px;
        height: 1.2em;
        background: linear-gradient(180deg, #fff 0%, #00fff9 50%, #ff00de 100%);
        margin-left: 4px;
        vertical-align: middle;
        animation: blink 0.7s infinite;
        box-shadow: 0 0 15px rgba(0, 255, 249, 0.8), 0 0 30px rgba(255, 0, 222, 0.6);
        border-radius: 2px;
      `;
      
      gsap.set(chars, { 
        opacity: 0, 
        y: 30, 
        scale: 0.8, 
        rotateX: -90, 
        transformOrigin: "50% 50%",
        textShadow: "0 0 20px rgba(255,255,255,0.5)"
      });
      
      // Enter animation
      tl.to(chars, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: speed,
        ease: "elastic.out(1, 0.5)",
        stagger: {
          each: speed,
          from: "start",
          onComplete: function() {
            if (Math.random() > 0.7) {
              const char = this.targets()[0];
              gsap.to(char, {
                duration: 0.1,
                x: () => gsap.utils.random(-3, 3),
                y: () => gsap.utils.random(-2, 2),
                color: () => gsap.utils.random([
                  "#00fff9", "#ff00de", "#ff6b00", "#9d00ff"
                ]),
                repeat: 2,
                yoyo: true,
                ease: "none",
                onComplete: function() {
                  gsap.to(char, { x: 0, y: 0, color: "#ffffff", duration: 0.1 });
                }
              });
            }
          }
        },
        onStart: function() {
          const namaEl = document.getElementById('nama');
          if (namaEl && !namaEl.querySelector('.typing-cursor')) {
            namaEl.appendChild(cursor);
          }
        },
        onUpdate: function() {
          const visibleChars = Array.from(chars).filter(char => 
            parseFloat(window.getComputedStyle(char).opacity) > 0.5
          );
          if (visibleChars.length > 0) {
            const lastChar = visibleChars[visibleChars.length - 1];
            lastChar.parentNode.insertBefore(cursor, lastChar.nextSibling);
          }
        }
      })
      // Glitch effect
      .to(chars, {
        duration: 0.1,
        textShadow: "3px 0 #ff00de, -3px 0 #00fff9",
        x: 3,
        ease: "none"
      })
      .to(chars, {
        duration: 0.1,
        textShadow: "-3px 0 #ff00de, 3px 0 #00fff9",
        x: -3,
        ease: "none"
      })
      .to(chars, {
        duration: 0.1,
        textShadow: "0 0 20px rgba(255,255,255,0.8)",
        x: 0,
        ease: "none"
      })
      // Bounce effect
      .to(chars, {
        y: -8,
        duration: 0.4,
        ease: "sine.inOut",
        stagger: {
          each: 0.03,
          from: "start",
          yoyo: true,
          repeat: 1
        }
      })
      .to({}, { duration: 1.2 })
      // Final glitch before exit
      .to(chars, {
        duration: 0.15,
        textShadow: "4px 0 #ff00de, -4px 0 #00fff9, 0 0 30px #ff00de",
        x: 4,
        ease: "none"
      })
      .to(chars, {
        duration: 0.15,
        textShadow: "-4px 0 #ff00de, 4px 0 #00fff9, 0 0 30px #00fff9",
        x: -4,
        ease: "none"
      })
      .to(chars, {
        duration: 0.15,
        textShadow: "0 0 20px rgba(255,255,255,0.5)",
        x: 0,
        ease: "none"
      })
      // Exit animation
      .to(chars, {
        opacity: 0,
        y: -25,
        scale: 0.7,
        rotateX: 90,
        duration: speed * 0.4,
        ease: "power3.in",
        stagger: {
          each: speed * 0.4,
          from: "end"
        },
        onUpdate: function() {
          const visibleChars = Array.from(chars).filter(char => 
            parseFloat(window.getComputedStyle(char).opacity) > 0.5
          );
          if (visibleChars.length > 0) {
            const lastChar = visibleChars[visibleChars.length - 1];
            lastChar.parentNode.insertBefore(cursor, lastChar.nextSibling);
          }
        },
        onComplete: function() {
          if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
          }
        }
      });
      
      return tl;
    };

    mm.add("(min-width: 768px)", () => {
      const mainTl = gsap.timeline();

      // Background elements animation
      gsap.fromTo(".floating-particle", 
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );

      mainTl.to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      })
      .to(".hero-description", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      }, "-=1")
      .to(".github-container", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      }, "-=0.8")
      .add(() => {
        const chars = gsap.utils.toArray("#nama .char");
        const typewriterTl = createTypewriterLoop(chars, 0.09);
      }, "-=0.5")
      .to(".scroll-text", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.3")
      .to(".scroll-arrow", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      }, "-=0.5");
    });

    mm.add("(max-width: 767px)", () => {
      const mainTl = gsap.timeline();

      mainTl.to(".hero-subtitle", { opacity: 1, y: 0, duration: 1 })
        .add(() => {
          const chars = gsap.utils.toArray("#nama .char");
          const typewriterTl = createTypewriterLoop(chars, 0.07);
        }, "-=0.4")
        .to(".hero-description", { opacity: 1, y: 0, duration: 1 }, "-=0.6")
        .to(".github-container", { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.4")
        .to(".scroll-text", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(".scroll-arrow", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
    });

    // Enhanced scroll arrow animation
    gsap.to(".scroll-arrow", {
      y: -15,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 3
    });

    // Floating particles animation
    gsap.to(".floating-particle", {
      y: -20,
      x: () => gsap.utils.random(-10, 10),
      rotation: () => gsap.utils.random(-180, 180),
      duration: () => gsap.utils.random(3, 6),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.1
    });

  }, []);

  const renderNameWithSpans = () => {
    const name = "Rafaditya Syahputra";
    return name.split('').map((char, index) => (
      <span key={index} className="char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{ fontFamily: "Sora Variable" }}
      className="font-sora flex flex-col items-center justify-center relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/10 pt-20" // Added pt-20 for header spacing
    >
      {/* Enhanced Mouse Glow Effect */}
      <div 
        ref={glowRef}
        className="absolute pointer-events-none z-5 transition-all duration-200"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: `
            radial-gradient(
              circle at center,
              rgba(139, 92, 246, 0.4) 0%,
              rgba(59, 130, 246, 0.25) 25%,
              rgba(0, 255, 249, 0.15) 40%,
              rgba(255, 0, 222, 0.1) 55%,
              transparent 70%
            )
          `,
          filter: 'blur(80px)',
          opacity: mousePosition.x > 0 ? 0.8 : 0,
          mixBlendMode: 'screen'
        }}
      />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center'
        }} />
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${gsap.utils.random(2, 6)}px`,
              height: `${gsap.utils.random(2, 6)}px`,
              background: gsap.utils.random([
                'linear-gradient(45deg, #8b5cf6, #00fff9)',
                'linear-gradient(45deg, #ff00de, #8b5cf6)',
                'linear-gradient(45deg, #00fff9, #ff00de)'
              ]),
              boxShadow: `
                0 0 ${gsap.utils.random(8, 15)}px 
                ${gsap.utils.random([
                  'rgba(139, 92, 246, 0.8)',
                  'rgba(0, 255, 249, 0.8)',
                  'rgba(255, 0, 222, 0.8)'
                ])}
              `,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Pulsing Orb Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-cyan-600/10 animate-pulse-slow" 
             style={{ filter: 'blur(60px)' }} />
      </div>

      {/* Main Content Container - Adjusted spacing */}
      <div ref={containerRef} className="relative z-20 w-full max-w-6xl mx-auto px-6 mt-10"> {/* Added mt-10 */}
        {/* Konten */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl hero-subtitle bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent font-light mb-4">
            Hi, I'm
          </h1>
          <h2
            id="nama"
            className="text-2xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] text-white font-bold leading-tight mb-6 tracking-tight px-4"
            style={{
              textShadow: '0 0 30px rgba(255,255,255,0.3)'
            }}
          >
            {renderNameWithSpans()}
          </h2>
          
          {/* Role */}
          <div className="relative mt-6">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-relaxed font-semibold">
              Front-end Developer • UI/UX Designer • Artist
            </p>
          </div>
          
          {/* Hobby */}
          <div className="relative mt-2">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 bg-clip-text text-transparent leading-relaxed font-semibold">
              Photography Enthusiast
            </p>
          </div>
          
          <p className="text-base sm:text-lg text-gray-400 mt-6 max-w-2xl mx-auto">
            Crafting digital experiences with passion and precision
          </p>
        </div>

        {/* Enhanced GitHub Button */}
        <div className="github-container flex items-center justify-center relative z-25 mt-8 lg:mt-12">
          <a
            href="https://github.com/raditt10"
            className="group relative"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                isHovered ? 'bg-gradient-to-r from-cyan-400 to-purple-500 blur-xl' : 'bg-white/20 blur-lg'
              }`} />
              
              {/* Main button */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center 
                            border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 
                            group-hover:border-cyan-400/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/25">
                {/* Inline GitHub SVG - crisp at all sizes; fill controlled via Tailwind classes */}
                <svg
                  role="img"
                  aria-label="GitHub"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 transition-all duration-300 transform-gpu group-hover:scale-110 fill-white group-hover:fill-cyan-400"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.73.084-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.47-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.103.823 2.222 0 1.606-.014 2.896-.014 3.286 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
                </svg>
                {/* Ring animation */}
                <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                  isHovered 
                    ? 'border-cyan-400/50 animate-ping-slow' 
                    : 'border-transparent'
                }`} />
              </div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg border border-white/10 whitespace-nowrap">
                Visit my GitHub
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45 border-l border-t border-white/10" />
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Enhanced Scroll Indicator - Moved down */}
      <div className="mt-8 lg:mt-12 flex flex-col items-center gap-4 lg:gap-6 relative z-20">
        <h1 className="scroll-text text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-light tracking-wide">
          Explore My Work
        </h1>
        <div className="scroll-arrow group cursor-pointer">
          <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2 transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-lg group-hover:shadow-cyan-500/25">
            <div className="w-1.5 h-3 bg-gradient-to-b from-white to-cyan-200 rounded-full animate-bounce" />
          </div>
          <div className="absolute -inset-4 rounded-full bg-cyan-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100vh) translateX(100px) rotate(180deg); 
            opacity: 0; 
          }
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }

        .typing-cursor {
          animation: blink 0.8s infinite;
        }

        @keyframes pulse-fast {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes text-glitch-1 {
          0% {
            transform: translate(0);
            opacity: 0;
          }
          2% {
            transform: translate(-2px, 1px);
            opacity: 0.8;
          }
          4% {
            transform: translate(0);
            opacity: 0;
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }

        @keyframes text-glitch-2 {
          0% {
            transform: translate(0);
            opacity: 0;
          }
          2% {
            transform: translate(2px, -1px);
            opacity: 0.8;
          }
          4% {
            transform: translate(0);
            opacity: 0;
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }

        .char {
          display: inline-block;
          position: relative;
        }

        .char::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #00fff9, #ff00de);
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }

        .char:hover::before {
          opacity: 0.3;
        }
      `}</style>
    </section>
  );
};

export default Hero;