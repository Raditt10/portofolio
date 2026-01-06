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
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return document.documentElement.dataset.theme || 'dark';
  });
  const isLight = theme === 'light';

  const images = [
    { src: "/img/geler-1.png", title: "Interior View", description: "Masjid Interior" },
    { src: "/img/galer-4.png", title: "Mountain View", description: "Beautiful landscape" },
    { src: "/img/galer-5.png", title: "Sigma Cat", description: "Gatau males pengen beli trek" },
    { src: "/img/galor1.jpg", title: "Sigma Cat", description: "Gatau males pengen beli trek" },
    { src: "/img/galer-3.png", title: "Festival View", description: "Vibrant atmosphere" },
    { src: "/img/galor2.jpg", title: "Sigma Cat", description: "Gatau males pengen beli trek" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const gridItems = itemsRef.current;

    // Set initial state tanpa opacity 0 untuk menghindari konten hilang
    gsap.set(title, {
      y: -20,
      scale: 0.95
    });

    gsap.set(gridItems, {
      scale: 0.95,
      y: 20
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none" 
      }
    });

    tl.to(title, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(gridItems, {
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: {
        amount: 0.3,
        from: "start"
      }
    }, "-=0.2");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

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

  // Keyboard shortcuts for lightbox: Esc to close, arrows to navigate
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedImage === null) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
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
      className={`${aspectClass} ${isLight ? 'bg-white/70' : 'bg-gray-800'} rounded-lg overflow-hidden relative group cursor-pointer transform transition-all duration-300 md:hover:scale-[1.02] ${className}`}
    >
      <div className={`relative flex items-center justify-center h-full rounded-xl border transition-all duration-200 overflow-hidden ${isLight ? 'bg-gradient-to-br from-white/80 to-white/60 border-amber-200/50 md:group-hover:border-amber-300/60' : 'bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-gray-700/50 md:group-hover:border-white/30'}`}>

        {/* Subtle glow on hover - Desktop Only */}
        <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-br from-amber-200/40 via-transparent to-amber-200/40' : 'bg-gradient-to-br from-white/5 via-transparent to-white/5'}`} />
        </div>

        <img
          className="h-full w-full object-cover transition-all duration-300 relative z-10"
          src={image.src}
          alt={image.title}
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          sizes="(max-width: 768px) 100vw, 25vw"
          style={{
            borderRadius: 'inherit',
          }}
        />

        <div className={`hidden md:block absolute inset-0 bg-gradient-to-t ${isLight ? 'from-white/80' : 'from-black/80'} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20`}>
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
            <h3 className={`text-white drop-shadow-md font-bold text-lg mb-1`}>{image.title}</h3>
            <p className={`text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-sm`}>
              {image.description}
            </p>

            <div className={`mt-2 flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'} text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200`}>
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
    className="relative min-h-screen mt-16 md:mt-24 px-4 md:px-8 pt-16 md:pt-20 pb-24 md:pb-28 scroll-mt-28"
      style={{ fontFamily: "Sora Variable" }} 
    >
      <h1
        ref={titleRef}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent font-semibold text-center relative z-30 overflow-hidden mt-4 mb-8 md:mb-20"
        style={{
          backgroundImage: isLight
            ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 24px rgba(255,255,255,0.25)',
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
                aria-label="Open Instagram profile @radittt_xxyu"
              >
                <div
                  ref={addToRefs}
                  className={`h-full rounded-xl border backdrop-blur-sm transition-all duration-300 overflow-hidden relative flex flex-col justify-between p-3 shadow-[0_0_0_rgba(255,255,255,0)] active:scale-95 ${
                    isLight
                      ? 'bg-[#fff7e6] border-amber-200/60 hover:border-amber-300/80 hover:shadow-[0_0_24px_rgba(255,199,120,0.35)]'
                      : 'bg-gray-900/75 border-gray-700/60 hover:shadow-[0_0_28px_rgba(255,255,255,0.16)]'
                  }`}
                >
                  <div className="text-start relative z-10">
                    <h2 className={`text-xl font-bold mb-1 tracking-tight ${isLight ? 'text-amber-600' : 'text-amber-200'}`}>MORE</h2>
                    <div className={`text-xl font-bold mb-2 tracking-tight flex items-center ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      ON
                      <img src="/img/instagram.png" className="w-5 h-5 ml-1" alt="Instagram" width="20" height="20" loading="lazy" />
                    </div>
                  </div>
                  <div className={`text-xs relative z-10 ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>@radittt_xxyu</div>
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
              aria-label="Open Instagram profile @radittt_xxyu"
            >
              <div
                ref={addToRefs}
                className={`h-full rounded-xl border backdrop-blur-sm transition-all duration-300 overflow-hidden relative flex flex-col justify-between p-4 shadow-[0_0_0_rgba(255,255,255,0)] ${
                  isLight
                    ? 'bg-[#fff7e6] border-amber-200/60 hover:border-amber-300/80 hover:shadow-[0_0_32px_rgba(255,199,120,0.4)]'
                    : 'bg-gray-900/75 border-gray-700/60 hover:shadow-[0_0_36px_rgba(255,255,255,0.2)] hover:border-white/30 hover:bg-white/5'
                }`}
              >
                <div className="text-start relative z-10">
                  <h2 className={`text-3xl xl:text-4xl font-bold mb-1 tracking-tight ${isLight ? 'text-amber-600' : 'text-amber-200'}`}>MORE</h2>
                  <div className={`text-3xl xl:text-4xl font-bold mb-2 tracking-tight flex items-center ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    ON
                    <img src="/img/instagram.png" className="w-7 h-7 xl:w-8 xl:h-8 ml-2" alt="Instagram" width="32" height="32" loading="lazy" />
                  </div>
                </div>
                <div className={`text-sm relative z-10 ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>@radittt_xxyu</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {selectedImage !== null && imageInfo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md px-3"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-50 text-white hover:text-amber-100 transition-all duration-250 group hover:scale-105"
            aria-label="Close"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <svg className="w-8 h-8 md:w-10 md:h-10 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            type="button"
            className="absolute left-3 md:left-4 z-50 text-white hover:text-amber-100 transition-all duration-250 group hover:scale-105"
            aria-label="Previous"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <svg className="w-9 h-9 md:w-12 md:h-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            type="button"
            className="absolute right-3 md:right-4 z-50 text-white hover:text-amber-100 transition-all duration-250 group hover:scale-105"
            aria-label="Next"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <svg className="w-9 h-9 md:w-12 md:h-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <div
            className="relative max-w-[92vw] md:max-w-6xl max-h-[82vh] md:max-h-[90vh] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageInfo.src}
              alt={imageInfo.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              decoding="async"
              style={{
                boxShadow: '0 0 90px rgba(255, 255, 255, 0.45), 0 0 140px rgba(248, 236, 214, 0.35), inset 0 0 50px rgba(255, 255, 255, 0.2)'
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/65 backdrop-blur-sm p-4 sm:p-6 rounded-b-lg border-t border-white/10">
              <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2 drop-shadow-sm">{imageInfo.title}</h3>
              <p className="text-gray-200 text-sm sm:text-base drop-shadow-sm">{imageInfo.description}</p>
              <div className="mt-3 text-gray-200 text-xs sm:text-sm font-medium">
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

      <style jsx>{``}</style>
    </section>
  );
};

export default Gallery;