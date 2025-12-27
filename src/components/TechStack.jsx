import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techstack } from "../../constant";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const itemsRef = useRef([]);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    const items = itemsRef.current;

    // Detect mobile
    const isMobile = window.innerWidth < 768;

    // Set initial states
    gsap.set(title, { 
      opacity: 0, 
      y: 20
    });
    
    gsap.set(grid, { 
      opacity: 0
    });

    gsap.set(items, { 
      opacity: 0,
      y: 8,
      x: (i) => (i % 2 === 0 ? 12 : -12)
    });

    // Create timeline with lighter animations for mobile
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Title animation
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: isMobile ? 0.4 : 0.6,
      ease: "power2.out"
    })
    // Grid animation
    .to(grid, {
      opacity: 1,
      duration: isMobile ? 0.2 : 0.4,
      ease: "power1.out"
    }, "-=0.1")
    // Items animation - lighter stagger on mobile
    .to(items, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: isMobile ? 0.4 : 0.8,
      stagger: isMobile ? 0.01 : 0.04,
      ease: "power1.out"
    }, "-=0.1");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add items to refs array
  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen px-3 sm:px-5 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-gradient-to-br from-[#040507] via-[#0a0d12] to-[#050608]"
      style={{ fontFamily: "Sora Variable" }}
    >
      {/* Elegant Static Background */}
      <div className="absolute inset-0 z-0">
        {/* Central light bloom with soft amber halo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.12)_16%,rgba(255,255,255,0)_42%),radial-gradient(circle_at_68%_66%,rgba(255,214,170,0.12)_0%,rgba(255,214,170,0)_55%)]" />

        {/* Luxe vignette to deepen blacks */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Enhanced Floating Particles - SAMA dengan Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5"></div>

      {/* Title Section */}
      <div className="relative z-20 px-4">
        <h1 
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-white via-slate-200 to-amber-100 bg-clip-text text-transparent font-semibold text-center relative z-30 overflow-hidden mb-8 sm:mb-12 md:mb-16 lg:mb-20"
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 24px rgba(255,255,255,0.25)',
            letterSpacing: '0.05em'
          }}
        >
          Tech Stack
        </h1>
      </div>

      {/* Tech Grid */}
      <div 
        ref={gridRef}
        className="relative z-20 grid grid-cols-2 min-[360px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9 gap-2 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 mt-8 sm:mt-12 md:mt-16 lg:mt-20 items-center justify-items-center max-w-7xl mx-auto px-2 sm:px-4 md:px-6"
      >
        {techstack.map((tech, index) => (
          <div
            key={tech.id}
            ref={addToRefs}
            className="relative group cursor-pointer w-full"
          >
            {/* Card Container - Mobile Optimized */}
            <div className="relative flex items-center justify-center aspect-square p-2 min-[360px]:p-2.5 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-[2px] rounded-lg sm:rounded-xl border border-gray-700/40 transition-all duration-200 overflow-hidden touch-manipulation active:scale-95">
              
              {/* Tech Icon - Responsive sizing */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img 
                  src={"/img/" + tech.src} 
                  alt={`${tech.name || 'Tech'} Stack`}
                  className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain transition-all duration-300"
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                  }}
                  loading="lazy"
                />
              </div>

              {/* Hover Tooltip - Hidden on mobile, visible on desktop */}
              <div className="hidden sm:block absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900/90 border border-purple-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 backdrop-blur-sm">
                <p className="text-white text-xs font-medium">{tech.name}</p>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 border-t border-l border-purple-500/30 rotate-45" />
              </div>
              
            </div>

            {/* Mobile Label - static below card */}
            <div className="sm:hidden mt-2 text-center text-white/80 text-[11px] font-medium tracking-tight leading-tight">
              {tech.name}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10"></div>
      
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
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

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes scan {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(60px); opacity: 0; }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }

        .floating-particle {
          animation: float 15s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default TechStack;