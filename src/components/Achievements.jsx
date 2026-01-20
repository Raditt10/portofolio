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
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
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
        <div className="text-center mb-16 md:mb-24">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
                style={{ fontFamily: '"Sensei Biased", system-ui, sans-serif' }}
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
        <div className="mb-24">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-10"
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
        <div>
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-12"
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
                className="relative"
            >
                <Swiper
                    modules={[Navigation, Pagination, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 150,
                        modifier: 2.5,
                        slideShadows: false, // Cleaner look without dark shadows
                    }}
                    spaceBetween={40}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    pagination={{ 
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 40 }
                    }}
                    className='py-12 w-full relative'
                >
                    {dataCerti.map((d, index) => (
                        <SwiperSlide key={index} className="w-[300px] sm:w-[350px]">
                            <div className={`relative transition-all duration-500 rounded-2xl overflow-hidden group ${
                                index === activeIndex 
                                    ? 'scale-105 opacity-100 z-10' 
                                    : 'scale-90 opacity-50 blur-[1px]'
                            }`}>
                                {/* Card Border Container */}
                                <div className={`p-1 rounded-2xl transition-all duration-300 ${
                                    isLight 
                                        ? 'bg-gray-200 group-hover:bg-black' 
                                        : 'bg-gray-800 group-hover:bg-white'
                                }`}>
                                    <div className={`rounded-xl overflow-hidden bg-clip-border ${
                                        isLight ? 'bg-white' : 'bg-black'
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

                    {/* Custom Nav Buttons */}
                    <div className="swiper-button-prev !hidden md:!flex"></div>
                    <div className="swiper-button-next !hidden md:!flex"></div>
                </Swiper>
            </motion.div>
        </div>
      </div>

      <style jsx global>{`
        /* Swiper Navigation - Monochrome */
        .swiper-button-next,
        .swiper-button-prev {
            color: ${isLight ? '#000' : '#fff'} !important;
            background: ${isLight ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'} !important;
            backdrop-filter: blur(8px);
            border: 1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'} !important;
            border-radius: 50% !important;
            width: 50px !important;
            height: 50px !important;
            transition: all 0.3s ease !important;
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
            width: 10px !important;
            height: 10px !important;
            transition: all 0.3s ease !important;
        }

        .swiper-pagination-bullet-active {
            opacity: 1 !important;
            width: 24px !important;
            border-radius: 6px !important;
        }
      `}</style>
    </section>
  );
}

export default Achievements;