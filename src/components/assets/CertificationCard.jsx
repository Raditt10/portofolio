import React, { useState, useRef } from 'react'

const CertificationCard = ({ gambar, judul, link }) => {
  const [flipped, setFlipped] = useState(false);
  const wrapRef = useRef(null);

  return (
    <article className='relative'>
      <section
        ref={wrapRef}
        onClick={() => setFlipped(v => !v)}
        className={`cursor-pointer max-w-[410px] min-h-[400px] rounded-2xl p-1 relative`}
        style={{ perspective: 1000 }}
      >
        <div
          className='relative w-full h-full'
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front */}
          <div className='absolute inset-0 flex flex-col items-center justify-between rounded-2xl p-6'
               style={{ backfaceVisibility: 'hidden', gap: '16px' }}>
            <div className='w-full rounded-2xl p-4 bg-gradient-to-r from-[#280087] to-[#C00000] flex items-center justify-center'>
              <img src={`/img/${gambar}`} className='max-h-[220px] w-auto object-contain' alt="" />
            </div>
            <div className='w-full flex flex-col items-center gap-4'>
              <h1 className='text-white font-semibold text-lg md:text-2xl text-center leading-snug'>{judul}</h1>
              <div className="mt-2">
                <button className="text-white font-semibold bg-gradient-to-tr from-[#280087] to-[#C00000] cursor-pointer px-6 py-2 rounded-xl">See More</button>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className='absolute inset-0 flex flex-col items-center justify-between rounded-2xl p-6 text-center'
               style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', background: 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))' }}>
            <div />
            <div>
              <h2 className='text-white font-bold text-xl mb-2'>Certificate Detail</h2>
              <p className='text-sm text-gray-300 px-4 mb-4'>{judul}</p>
              <a href={link} target='_blank' rel='noopener noreferrer'>
                <button className='mt-3 px-4 py-2 bg-cyan-500 text-black rounded-md font-semibold'>Open</button>
              </a>
            </div>
            <div className='w-full flex justify-center'>
              <button onClick={(e) => { e.stopPropagation(); setFlipped(false); }} className='mt-3 text-sm text-gray-300 underline'>Close</button>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default CertificationCard