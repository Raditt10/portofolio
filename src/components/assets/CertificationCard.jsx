import React, { useState, useRef } from 'react'

const CertificationCard = ({ gambar, judul, link, isLight = false }) => {
  const [flipped, setFlipped] = useState(false);
  const wrapRef = useRef(null);

  return (
    <article className='relative'>
      <section
        ref={wrapRef}
        onClick={() => setFlipped((v) => !v)}
        className="cursor-pointer max-w-[410px] min-h-[400px] rounded-2xl p-1 relative"
        style={{ perspective: 1000 }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-between rounded-2xl p-6 border ${isLight ? 'border-amber-200/80' : 'border-white/20'}`}
            style={{ backfaceVisibility: 'hidden', gap: '16px', background: isLight ? '#fff7e6' : 'linear-gradient(135deg, rgba(30,30,35,0.98) 0%, rgba(15,15,20,0.98) 100%)' }}
          >
            <div className={`w-full rounded-2xl p-4 flex items-center justify-center ${isLight ? 'bg-[#fff2d8]' : 'bg-black/40'}`}>
              <img src={`/img/${gambar}`} className="max-h-[220px] w-auto object-contain" alt={judul ? `Sertifikat ${judul}` : "Sertifikat"} width="320" height="220" loading="lazy" />
            </div>
            <div className="w-full flex flex-col items-center gap-4">
              <h1 className={`${isLight ? 'text-slate-900' : 'text-white'} font-semibold text-lg md:text-2xl text-center leading-snug`}>{judul}</h1>
              <div className="mt-2">
                <button className={`${isLight ? 'bg-[#ffeccc] text-slate-900 border border-amber-200 hover:bg-[#ffdfa8]' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'} font-semibold cursor-pointer px-6 py-2 rounded-xl transition-all duration-200`}>See More Detail</button>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-between rounded-2xl p-6 text-center border ${isLight ? 'border-amber-200/80' : 'border-white/20'}`}
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', background: isLight ? '#fff7e6' : 'linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(30,30,35,0.98) 100%)' }}
          >
            <div />
            <div>
              <h2 className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold text-xl mb-2`}>Certificate Detail</h2>
              <p className={`text-sm px-4 mb-4 ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{judul}</p>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <button className={`mt-3 px-4 py-2 rounded-md font-semibold transition-all duration-200 ${isLight ? 'bg-[#ffeccc] text-slate-900 border border-amber-200 hover:bg-[#ffdfa8]' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`}>Open</button>
              </a>
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFlipped(false);
                }}
                className={`mt-3 text-sm underline ${isLight ? 'text-gray-600' : 'text-gray-300'}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default CertificationCard