import { Github } from 'lucide-react'
import React from 'react'

const ProjectCard = ({ gambar, judul, parag, tech, linkDemo, linkCode, isComingSoon = false }) => {
  const borderClass = isComingSoon 
    ? "border-2 border-dashed border-white/40 hover:border-white/60 shadow-white/5"
    : "border-2 border-white/30 shadow-2xl hover:shadow-white/10";

  return (
    <div className={`group flex flex-col items-center rounded-2xl w-full max-w-[501px] min-h-[600px] md:min-h-[640px] lg:min-h-[680px] mx-auto transition-all duration-500 hover:shadow-white/15 ${borderClass}`}>
      {/* Image Container - Optimized for full page */}
      <div className="w-full relative overflow-hidden">
        {isComingSoon ? (
          <div className="rounded-t-2xl w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden relative">
            <img 
              src="/img/coming-soon.png"
              alt="Aplikasi sedang di perbaiki"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Fallback text if image doesn't exist */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900/80 to-gray-800/80">
              <div className="text-center">
                <div className="text-3xl md:text-4xl mb-3">🔧</div>
                <div className="text-base md:text-lg text-white/80 font-semibold">Aplikasi sedang di perbaiki</div>
                <div className="text-xs text-white/50 mt-2">Application Under Maintenance</div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <img 
              className="rounded-t-2xl w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover object-center transition-all duration-500" 
              src={`/img/${gambar}`} 
              alt="Projects Image"
              loading="lazy"
              style={{ minHeight: '100%', minWidth: '100%' }}
            />
            {/* Gradient overlay with hover effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-100 group-hover:from-white/10 group-hover:via-white/5 transition-all duration-500 pointer-events-none" />
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </>
        )}
      </div>
      
      {/* Year Section */}
      <div className="flex items-center justify-start w-full gap-2 mt-4 md:mt-7 px-4 md:px-6">
        <div className="w-[10px] h-[10px] flex-shrink-0">
                    <img
            src="/img/Tahun.png"
            className="w-full h-full object-cover"
            alt="Year Icon"
            loading="lazy"
          />
        </div>
        <span className="font-light text-sm text-white">2025</span>
      </div>
      
      {/* Title and Description */}
      <div className="flex flex-col justify-start w-full mt-3 md:mt-4 px-4 md:px-6">
        <h1 className="font-bold text-xl md:text-2xl text-white mb-2">{judul}</h1>
        <p className="text-xs md:text-[13px] text-white font-light leading-relaxed">
          {parag}
        </p>
      </div>
      
      {/* Tech Stack */}
      <div className="flex items-start justify-start w-full px-4 md:px-6 mt-3 md:mt-4">
        <div className="w-[10px] h-[10px] mr-3 md:mr-4 mt-1 flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src="/img/tag.png"
            alt=""
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 my-2 md:my-3 flex-1">
          {tech.map((item, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs font-medium text-white/70 bg-white/5 rounded-md hover:bg-white/10 transition-colors duration-200 border border-white/20 whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      
      {/* Divider */}
      <div className="w-[90%] md:w-[447px] h-[1px] bg-[#484848] mt-4">
        <span className="opacity-0">.</span>
      </div>
      
      {/* Action Buttons - Mobile optimized */}
      <div className="flex items-center justify-between w-full mt-4 px-4 md:px-6 pb-4 md:pb-6 gap-3">
        <a href={linkDemo} target='_blank' rel="noopener noreferrer" className="flex-1">
          <button className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 min-h-[44px] touch-manipulation">
            <div className="w-auto h-[12px] flex-shrink-0">
              <img src="/img/Demo.png" className="w-full h-full object-cover" alt="" />
            </div>
            <span className="font-light">
              View Demo
            </span>
          </button>
        </a>
        
        <a href={linkCode} target='_blank' className="flex-1">
          <button className="flex cursor-pointer items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white/80 hover:text-white rounded-lg backdrop-blur-sm transition-all duration-300 transform border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 min-h-[44px] touch-manipulation">
            <Github size={14} />
            <span className="font-light">
              Code
            </span>
          </button>
        </a>
      </div>
    </div>
  )
}

export default ProjectCard