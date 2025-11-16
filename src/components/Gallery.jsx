import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const glowRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const images = [
    { src: "/img/geler-1.png", title: "Interior View", description: "Masjid Interior" },
    { src: "/img/galer-4.png", title: "Mountain View", description: "Beautiful landscape" },
    { src: "/img/galer-5.png", title: "Sigma Cat", description: "Cute cat shot" },
    { src: "/img/galor1.jpg", title: "Sigma Cat", description: "Cute cat shot" },
    { src: "/img/galer-3.png", title: "Festival View", description: "Vibrant atmosphere" },
    { src: "/img/galor2.jpg", title: "Sigma Cat", description: "Cute cat shot" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const gridItems = itemsRef.current;

    gsap.set(title, {
      opacity: 0,
      y: -50,
      scale: 0.8
    });

    gsap.set(gridItems, {
      opacity: 0,
      scale: 0.8,
      y: 100,
      rotation: 5
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse" 
      }
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .to(gridItems, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotation: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: {
        amount: 1.2,
        from: "random"
      }
    }, "-=0.5");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const openLightbox = (index) => {
    setSelectedImage(index);
    setImageInfo(images[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setImageInfo(null);
  };

  const nextImage = () => {
    const nextIndex = (selectedImage + 1) % images.length;
    setSelectedImage(nextIndex);
    setImageInfo(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (selectedImage - 1 + images.length) % images.length;
    setSelectedImage(prevIndex);
    setImageInfo(images[prevIndex]);
  };

  const GalleryItem = ({ image, index, className = "", aspectClass = "" }) => (
    <div
      ref={addToRefs}
      onClick={() => openLightbox(index)}
      className={`${aspectClass} bg-gray-800 rounded-lg overflow-hidden relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative flex items-center justify-center h-full bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-xl border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
        </div>

        <img
          className="h-full w-full object-cover transition-all duration-300 relative z-10"
          src={image.src}
          alt={image.title}
          style={{
            borderRadius: 'inherit',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
            <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
              {image.description}
            </p>

            <div className="mt-2 flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Click to view
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
   <section 
      id="gallery" 
      ref={sectionRef} 
      className="relative min-h-screen mt-12 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/10" 
      style={{ fontFamily: "Sora Variable" }} 
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

      {/* Pulsing Orb Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-cyan-600/10 animate-pulse-slow" 
             style={{ filter: 'blur(60px)' }} />
      </div>

      {/* Enhanced Floating Particles */}
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

      <h1
        ref={titleRef}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent font-bold text-center relative z-30 overflow-hidden mt-4 mb-8 md:mb-20 drop-shadow-2xl"
        style={{
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 80px rgba(139, 92, 246, 0.5)',
          letterSpacing: '0.05em'
        }}
      >
        Gallery
      </h1>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="block md:hidden">
          <div className="flex flex-col gap-4">
            <GalleryItem image={images[0]} index={0} aspectClass="aspect-[4/3]" />
            <GalleryItem image={images[1]} index={1} aspectClass="aspect-[16/9]" />

            <div className="grid grid-cols-2 gap-4">
              <GalleryItem image={images[2]} index={2} aspectClass="aspect-square" />
              <GalleryItem image={images[3]} index={3} aspectClass="aspect-square" />
            </div>

            <GalleryItem image={images[4]} index={4} aspectClass="aspect-[4/3]" />

            <div className="grid grid-cols-2 gap-4">
              <GalleryItem image={images[5]} index={5} aspectClass="aspect-square" />
              <a
                href="https://www.instagram.com/radittt_xxyu/"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square"
              >
                <div
                  ref={addToRefs}
                  className="h-full bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/70 transition-all duration-300 overflow-hidden relative flex flex-col justify-between p-3 hover:bg-gray-50/10 group hover:scale-105 transform"
                >
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden">
                    <div
                      className="absolute inset-[-2px] rounded-xl opacity-50"
                      style={{
                        backgroundImage: `
                          linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
                          linear-gradient(180deg, transparent 95%, #06b6d4 100%)
                        `,
                        backgroundSize: '20px 20px',
                        animation: 'gridMove 2s linear infinite'
                      }}
                    />
                  </div>

                  <div className="text-start relative z-10">
                    <h2 className="text-xl font-bold text-cyan-400 mb-1 tracking-tight">MORE</h2>
                    <div className="text-xl font-bold text-white mb-2 tracking-tight flex items-center">
                      ON
                      <img src="/img/instagram.png" className="w-5 h-5 ml-1" alt="Instagram" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-cyan-400 transition-colors relative z-10">@radittt_xxyu</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-4 grid-rows-4 gap-2 xl:gap-4 h-screen max-h-[800px]">
            <GalleryItem image={images[0]} index={0} className="col-span-1 row-span-2" />
            <GalleryItem image={images[1]} index={1} className="col-span-2 row-span-1" />
            <GalleryItem image={images[2]} index={2} className="col-span-1 row-span-1" />
            <GalleryItem image={images[4]} index={4} className="col-span-2 row-span-2" />
            <GalleryItem image={images[3]} index={3} className="col-span-1 row-span-1" />
            <GalleryItem image={images[5]} index={5} className="col-span-1 row-span-1" />

            <a
              href="https://www.instagram.com/radittt_xxyu/"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 row-span-1"
            >
              <div
                ref={addToRefs}
                className="h-full bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/70 transition-all duration-300 overflow-hidden relative flex flex-col justify-between p-4 hover:bg-gray-50/10 group hover:scale-105 transform"
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden">
                  <div
                    className="absolute inset-[-2px] rounded-xl opacity-50"
                    style={{
                      backgroundImage: `
                        linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
                        linear-gradient(180deg, transparent 95%, #06b6d4 100%)
                      `,
                      backgroundSize: '20px 20px',
                      animation: 'gridMove 2s linear infinite'
                    }}
                  />
                </div>

                <div className="text-start relative z-10">
                  <h2 className="text-3xl xl:text-4xl font-bold text-cyan-400 mb-1 tracking-tight">MORE</h2>
                  <div className="text-3xl xl:text-4xl font-bold text-white mb-2 tracking-tight flex items-center">
                    ON
                    <img src="/img/instagram.png" className="w-7 h-7 xl:w-8 xl:h-8 ml-2" alt="Instagram" loading="lazy" />
                  </div>
                </div>
                <div className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors relative z-10">@radittt_xxyu</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10"></div>

      {selectedImage !== null && imageInfo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 text-cyan-400 hover:text-white transition-all duration-300 group hover:scale-110"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <svg className="w-10 h-10 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 z-50 text-cyan-400 hover:text-white transition-all duration-300 group hover:scale-110"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <svg className="w-12 h-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 z-50 text-cyan-400 hover:text-white transition-all duration-300 group hover:scale-110"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <svg className="w-12 h-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <div
            className="relative max-w-6xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageInfo.src}
              alt={imageInfo.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              style={{
                boxShadow: '0 0 80px rgba(0, 200, 255, 0.6), 0 0 160px rgba(139, 92, 246, 0.4), inset 0 0 50px rgba(0, 200, 255, 0.2)'
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-6 rounded-b-lg border-t border-cyan-400/20">
              <h3 className="text-cyan-400 text-2xl font-bold mb-2 drop-shadow-lg">{imageInfo.title}</h3>
              <p className="text-gray-300 text-base drop-shadow-lg">{imageInfo.description}</p>
              <div className="mt-3 text-cyan-400 text-sm font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                {selectedImage + 1} / {images.length}
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
            <div className="flex items-center gap-4 justify-center">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs">ESC</kbd>
                <span>Close</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs">←→</kbd>
                <span>Navigate</span>
              </div>
            </div>
          </div>
        </div>
      )}

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
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-scan {
          animation: scan 3s linear infinite;
        }

        .floating-particle {
          animation: float 15s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Gallery;