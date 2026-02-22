import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Components
import CertificationCard from './assets/CertificationCard';
import CompetitionCard from './assets/CompetitionCard';

// Data
import { dataCerti } from '../../constant';

const Achievements = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === 'light';

  // Theme Sync
  useEffect(() => {
    const updateTheme = () => {
        setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id='achievements'
      ref={containerRef}
      // UPDATE 1: overflow-hidden di sini agar halaman tidak scroll horizontal,
      // tapi kita kasih padding vertikal agar konten swiper aman.
      className="relative min-h-screen py-24 sm:py-32 px-0 sm:px-6 overflow-hidden font-sans" 
    >
      {/* --- BACKGROUND (Clean Monochrome) --- */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? 'bg-white' : 'bg-black'}`} />
        <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{ 
                backgroundImage: `linear-gradient(${isLight ? '#000' : '#fff'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? '#000' : '#fff'} 1px, transparent 1px)`, 
                backgroundSize: '40px 40px' 
            }} 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 md:mb-24 px-4">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 font-heading"
            >
                <span className={`bg-clip-text text-transparent ${
                    isLight 
                        ? 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500' 
                        : 'bg-gradient-to-r from-white via-gray-200 to-gray-500'
                }`}>
                    Achievements
                </span>
            </motion.h1>
            <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className={`h-1 w-24 rounded-full ${isLight ? 'bg-black' : 'bg-white'} mx-auto`} 
            />
        </div>
        
        {/* --- COMPETITION SECTION --- */}
        <div className="mb-24 px-4 sm:px-0">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-10 max-w-4xl mx-auto"
            >
                <div className={`h-10 w-1 ${isLight ? 'bg-black' : 'bg-white'}`} />
                <h2 className={`text-2xl md:text-3xl font-bold tracking-wide ${isLight ? 'text-black' : 'text-white'}`}>
                    Competitions
                </h2>
                <div className={`flex-1 h-px ${isLight ? 'bg-gray-200' : 'bg-gray-800'}`} />
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='flex justify-center items-center'
            >
                <CompetitionCard isLight={isLight} />
            </motion.div>
        </div>
        
        {/* --- CERTIFICATION SECTION --- */}
        <div className="w-full">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8 max-w-4xl mx-auto px-4 sm:px-0"
            >
                <div className={`h-10 w-1 ${isLight ? 'bg-black' : 'bg-white'}`} />
                <h2 className={`text-2xl md:text-3xl font-bold tracking-wide ${isLight ? 'text-black' : 'text-white'}`}>
                    Certifications
                </h2>
                <div className={`flex-1 h-px ${isLight ? 'bg-gray-200' : 'bg-gray-800'}`} />
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full"
            >
                <Swiper
                    modules={[Navigation, Pagination, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto" // Biarkan auto agar lebar card yang menentukan
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false, 
                    }}
                    spaceBetween={30} // Jarak antar slide
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    pagination={{ 
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    // UPDATE 2: Padding besar (py-14) agar shadow & scale tidak kepotong
                    className='!py-14 w-full relative' 
                    // UPDATE 3: overflow visible agar bayangan keluar dari kotak swiper
                    style={{ overflow: 'visible' }}
                >
                    {dataCerti.map((d, index) => (
                        // UPDATE 4: Set lebar spesifik pada SwiperSlide untuk mobile & desktop
                        <SwiperSlide key={index} className="!w-[280px] sm:!w-[350px]">
                            <div className={`relative transition-all duration-500 rounded-2xl ${
                                index === activeIndex 
                                    ? 'scale-100 opacity-100 z-10' 
                                    : 'scale-90 opacity-40 blur-[2px]'
                            }`}>
                                {/* Card Frame */}
                                <div className={`p-2 rounded-2xl transition-all duration-300 ${
                                    isLight 
                                        ? 'bg-white border-2 border-gray-100 shadow-xl' 
                                        : 'bg-black border-2 border-gray-800 shadow-2xl shadow-white/5'
                                }`}>
                                    <div className={`rounded-xl overflow-hidden ${
                                        isLight ? 'bg-gray-50' : 'bg-gray-900'
                                    }`}>
                                        <CertificationCard 
                                            gambar={d.gambar} 
                                            judul={d.judul} 
                                            link={d.link} 
                                            isLight={isLight}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    {/* Navigation Buttons (Outside Container) */}
                    <div className="swiper-button-prev !hidden md:!flex -ml-4 lg:-ml-12"></div>
                    <div className="swiper-button-next !hidden md:!flex -mr-4 lg:-mr-12"></div>
                </Swiper>
            </motion.div>
        </div>
      </div>

      <style jsx global>{`
        /* Swiper Navigation - Monochrome */
        .swiper-button-next,
        .swiper-button-prev {
            color: ${isLight ? '#000' : '#fff'} !important;
            background: ${isLight ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'} !important;
            backdrop-filter: blur(8px);
            border: 1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'} !important;
            border-radius: 50% !important;
            width: 48px !important;
            height: 48px !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 50;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
            background: ${isLight ? '#000' : '#fff'} !important;
            color: ${isLight ? '#fff' : '#000'} !important;
            transform: scale(1.1);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
            font-size: 20px !important;
            font-weight: bold;
        }

        /* Swiper Pagination - Monochrome */
        .swiper-pagination-bullet {
            background: ${isLight ? '#000' : '#fff'} !important;
            opacity: 0.3 !important;
            width: 8px !important;
            height: 8px !important;
            transition: all 0.3s ease !important;
        }

        .swiper-pagination-bullet-active {
            opacity: 1 !important;
            width: 24px !important;
            border-radius: 4px !important;
        }
        
        /* Memastikan slide yang tidak aktif tidak menumpuk aneh */
        .swiper-slide {
            transition: transform 0.5s;
        }
      `}</style>
    </section>
  );
}

export default Achievements;