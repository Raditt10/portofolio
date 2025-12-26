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

    // Set initial states
    gsap.set(title, { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      rotationX: 45
    });
    
    gsap.set(grid, { 
      opacity: 0, 
      y: 50 
    });

    gsap.set(items, { 
      opacity: 0, 
      scale: 0,
      y: 50,
      rotation: 180
    });

    // Create timeline
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
      scale: 1,
      rotationX: 0,
      duration: 1.2,
      ease: "power4.out"
    })
    // Grid animation
    .to(grid, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    // Items animation
    .to(items, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotation: 0,
      duration: 0.8,
      stagger: {
        amount: 1.2,
        from: "random",
        grid: "auto"
      },
      ease: "elastic.out(1, 0.5)"
    }, "-=0.4");

    // Parallax effect (disabled for performance)
    // gsap.to(items, {
    //   scrollTrigger: {
    //     trigger: section,
    //     start: "top bottom",
    //     end: "bottom top",
    //     scrub: 1
    //   },
    //   y: (i) => (i % 2 === 0 ? -30 : 30),
    //   ease: "none"
    // });

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

  // Improved hover effect dengan glow yang konsisten
  const handleTechHover = (tech, e, index) => {
    setHoveredTech(tech);
    
    const item = itemsRef.current[index];
    if (item && window.innerWidth >= 768) {
      gsap.to(item, {
        scale: 1.08,
        duration: 0.25,
        ease: "power1.out"
      });

      gsap.to(item.querySelector('.tech-glow'), {
        opacity: 1,
        scale: 1.1,
        duration: 0.25,
        ease: "power1.out"
      });
    }
  };

  const handleTechLeave = (index) => {
    setHoveredTech(null);
    
    const item = itemsRef.current[index];
    if (item && window.innerWidth >= 768) {
      gsap.to(item, {
        scale: 1,
        duration: 0.3,
        ease: "power1.out"
      });

      gsap.to(item.querySelector('.tech-glow'), {
        opacity: 0,
        scale: 1,
        duration: 0.25,
        ease: "power1.out"
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen px-3 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/10" 
      style={{ fontFamily: "Sora Variable" }}
    >
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

      {/* Pulsing Orb Effect - SAMA dengan Hero */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-cyan-600/10 animate-pulse-slow" 
             style={{ filter: 'blur(60px)' }} />
      </div>

      {/* Enhanced Floating Particles - SAMA dengan Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: Math.random() > 0.5 
                ? 'linear-gradient(45deg, #8b5cf6, #00fff9)'
                : 'linear-gradient(45deg, #ff00de, #8b5cf6)',
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${
                Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.8)' : 'rgba(0, 255, 249, 0.8)'
              }`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

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
        className="relative z-20 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 mt-8 sm:mt-12 md:mt-16 lg:mt-20 items-center justify-items-center max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
      >
        {techstack.map((tech, index) => (
          <div
            key={tech.id}
            ref={addToRefs}
            onMouseEnter={(e) => handleTechHover(tech, e, index)}
            onMouseLeave={() => handleTechLeave(index)}
            className="relative group cursor-pointer w-full"
          >
            {/* Glow Background */}
            <div 
              className="absolute inset-0 tech-glow opacity-0 transition-all duration-300 rounded-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.16) 0%, transparent 70%)',
                filter: 'blur(10px)',
                transform: 'scale(1)'
              }}
            />
            
            {/* Card Container - Mobile Optimized */}
            <div className="relative flex items-center justify-center aspect-square p-2.5 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-700/50 md:group-hover:border-white/40 transition-all duration-200 overflow-hidden touch-manipulation active:scale-95">
              
              {/* Hover Shine Effect - Desktop Only */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-transparent via-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* Animated Border - Cyberpunk Grid */}
              <div className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden">
                {/* Grid Pattern */}
                <div 
                  className="absolute inset-[-2px] rounded-lg sm:rounded-xl opacity-70"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
                      linear-gradient(180deg, transparent 95%, #06b6d4 100%)
                    `,
                    backgroundSize: '15px 15px',
                    animation: 'gridMove 2s linear infinite'
                  }}
                />
                
                {/* Scanning Line */}
                <div className="absolute left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan rounded-full" />
                
                {/* Pulsing Corner Brackets - Responsive sizes */}
                <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-2 h-2 sm:w-3 sm:h-3 border-l-2 border-t-2 border-cyan-400 animate-pulse" />
                <div className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 w-2 h-2 sm:w-3 sm:h-3 border-r-2 border-t-2 border-purple-400 animate-pulse" style={{animationDelay: '0.3s'}} />
                <div className="absolute bottom-0.5 sm:bottom-1 left-0.5 sm:left-1 w-2 h-2 sm:w-3 sm:h-3 border-l-2 border-b-2 border-purple-400 animate-pulse" style={{animationDelay: '0.6s'}} />
                <div className="absolute bottom-0.5 sm:bottom-1 right-0.5 sm:right-1 w-2 h-2 sm:w-3 sm:h-3 border-r-2 border-b-2 border-cyan-400 animate-pulse" style={{animationDelay: '0.9s'}} />
              </div>

              {/* Tech Icon - Responsive sizing */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img 
                  src={"/img/" + tech.src} 
                  alt={`${tech.name || 'Tech'} Stack`}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain transition-all duration-300 group-hover:brightness-125 group-hover:scale-110"
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
              
              {/* Mobile Label - Visible only on touch devices */}
              <div className="sm:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-active:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                <p className="text-white text-[10px] font-medium whitespace-nowrap bg-gray-900/80 px-2 py-0.5 rounded border border-purple-500/30 backdrop-blur-sm">{tech.name}</p>
              </div>
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