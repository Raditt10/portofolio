import React, { useState, useRef } from 'react'

function CompetitionCard() {
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
          className='absolute inset-0 flex flex-col justify-center items-center rounded-xl p-6 bg-gradient-to-br from-blue-600 to-purple-700 border-2 border-gray-300 shadow-lg'
          style={{ 
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Certificate Image */}
          <div className='w-full max-w-xs bg-white rounded-lg p-3 shadow-lg mb-4'>
            <img 
              src="/img/indo.png" 
              alt="ISSC Competition Certificate" 
              loading="lazy"
              className='w-full h-auto object-contain rounded'
            />
          </div>

          {/* Content */}
          <div className='text-center space-y-3'>
            <h1 className='text-white font-bold text-xl'>
              ISSC Competition
            </h1>
            <h2 className='text-yellow-200 font-semibold text-lg'>
               1ST PLACE
            </h2>
            
            <a 
              href="https://drive.google.com/drive/folders/1lQhCp73UNCH-Ky69UEpVG6vwcLmMPa2v" 
              target='_blank' 
              rel='noopener noreferrer'
              onClick={(e) => e.stopPropagation()}
            >
              <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                View Certificate
              </button>
            </a>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className='absolute inset-0 flex flex-col justify-center items-center rounded-xl p-6 bg-gradient-to-br from-purple-700 to-blue-600 border-2 border-gray-300 shadow-lg'
          style={{ 
            transform: 'rotateY(180deg)', 
            backfaceVisibility: 'hidden'
          }}
        >
          <div className='bg-white rounded-lg p-4 w-full max-w-xs text-center'>
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
                <button className='bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm'>
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