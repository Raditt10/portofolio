import React, { useState } from 'react'

function CompetitionCard({ isLight = false }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className='w-full max-w-md mx-auto'>
      <div
        onClick={() => setFlipped(v => !v)}
        className='relative w-full h-[400px] rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02]'
        style={{ 
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front Side */}
        <div 
          className={`absolute inset-0 flex flex-col justify-center items-center rounded-xl p-6 border shadow-2xl ${isLight ? 'border-amber-200/80' : 'border-white/20'}`}
          style={{ 
            backfaceVisibility: 'hidden',
            background: isLight
              ? 'linear-gradient(135deg, #fff7e6 0%, #fffaf0 100%)'
              : 'linear-gradient(135deg, rgba(30,30,35,0.98) 0%, rgba(15,15,20,0.98) 100%)'
          }}
        >
          {/* Certificate Image */}
          <div className={`w-full max-w-xs rounded-lg p-3 shadow-lg mb-4 ${isLight ? 'bg-white border border-amber-100' : 'bg-white'}`}>
            <img 
              src="/img/indo.png" 
              alt="ISSC Competition Certificate" 
              loading="lazy"
              className='w-full h-auto object-contain rounded'
            />
          </div>

          {/* Content */}
          <div className='text-center space-y-3'>
            <h1 className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold text-xl`}>
              ISSC Competition
            </h1>
            <h2 className={`${isLight ? 'text-amber-700 font-semibold text-lg' : 'bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent font-semibold text-lg'}`}>
              1ST PLACE
            </h2>
            
            <a 
              href="https://drive.google.com/drive/folders/1lQhCp73UNCH-Ky69UEpVG6vwcLmMPa2v" 
              target='_blank' 
              rel='noopener noreferrer'
              onClick={(e) => e.stopPropagation()}
            >
              <button className={`${isLight ? 'bg-amber-100 text-slate-900 border border-amber-200 hover:bg-amber-200' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'} font-semibold px-4 py-2 rounded-lg transition-all duration-200`}>
                View Certificate
              </button>
            </a>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className={`absolute inset-0 flex flex-col justify-center items-center rounded-xl p-6 border shadow-2xl ${isLight ? 'border-amber-200/80' : 'border-white/20'}`}
          style={{ 
            transform: 'rotateY(180deg)', 
            backfaceVisibility: 'hidden',
            background: isLight
              ? 'linear-gradient(135deg, #fffaf0 0%, #fff7e6 100%)'
              : 'linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(30,30,35,0.98) 100%)'
          }}
        >
          <div className={`rounded-lg p-4 w-full max-w-xs text-center ${isLight ? 'bg-white border border-amber-100' : 'bg-white'}`}>
            <h2 className='text-gray-800 font-bold text-lg mb-3'>
              🏅 Achievement Details
            </h2>
            
            <div className='space-y-2 text-gray-600 text-sm'>
              <p><strong>Award:</strong> First Place Winner</p>
              <p><strong>Event:</strong> ISSC 2025</p>
              <p><strong>Level:</strong> National</p>
              <p><strong>Date:</strong> July 2025</p>
            </div>
            
            <div className="mt-4">
              <a 
                href="https://drive.google.com/drive/folders/1lQhCp73UNCH-Ky69UEpVG6vwcLmMPa2v" 
                target='_blank' 
                rel='noopener noreferrer'
                onClick={(e) => e.stopPropagation()}
              >
                <button className={`${isLight ? 'bg-amber-100 text-slate-900 border border-amber-200 hover:bg-amber-200' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'} font-semibold px-4 py-2 rounded-lg transition-all duration-200 text-sm`}>
                  View Documents
                </button>
              </a>
            </div>
            
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setFlipped(false); 
              }} 
              className='mt-3 text-gray-500 hover:text-gray-700 text-sm'
            >
              ← Back
            </button>
          </div>
        </div>
      </div>


    </div>
  )
}

export default CompetitionCard