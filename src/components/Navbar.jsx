import React, { useState, useEffect, useCallback } from 'react'
import { navlinks } from '../../constant'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Deteksi mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll handler untuk mobile saja
  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 10
        setScrolled(isScrolled)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false)
  }, [])

  // Desktop navbar - TIDAK DIUBAH sama sekali
  const DesktopNavbar = () => (
    <nav className={`hidden md:flex justify-center font-sora font-semibold text-white items-center h-20 transition-all duration-500 fixed z-50 w-full px-8 ${
      scrolled 
        ? 'bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50' 
        : 'bg-transparent'
    }`}>
      <div className="relative group">
        <div className="relative px-8 py-3.5 rounded-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 group-hover:border-amber-200/40 group-hover:from-white/15 group-hover:via-amber-50/10 group-hover:to-white/15 group-hover:shadow-lg group-hover:shadow-amber-200/20">
          {/* Elegant glow on hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-amber-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="relative px-4 py-2 group/logo">
              <h1 className='text-2xl text-white logo-minecraft transition-all duration-300 group-hover/logo:drop-shadow-[0_0_12px_rgba(248,236,222,0.6)] group-hover/logo:scale-105'>
                R'e
              </h1>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </div>
          
            {/* Navigation Links */}
            <ul className='relative flex gap-1'>
              {navlinks.map((navlink, index) => (
              <li key={navlink.id} className="relative group/item">
                <a 
                  href={navlink.link}
                  className='relative block text-base font-medium px-6 py-2.5 rounded-full transition-all duration-300 text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-amber-50/10 hover:via-white/10 hover:to-amber-50/10 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(248,236,222,0.4)]'
                >
                  {/* Elegant amber shine effect */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-amber-100/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10">{navlink.text}</span>
                </a>
                {index < navlinks.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                )}
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )

  // Mobile Header - diubah menjadi floating dan tidak menghalangi
  const MobileHeader = () => (
    <header className={`md:hidden flex justify-between items-center transition-all duration-300 fixed top-4 left-4 right-4 z-50 px-4 py-3 rounded-2xl ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-lg border border-white/10 shadow-lg' 
        : 'bg-black/70 backdrop-blur-md'
    }`} style={{ marginTop: 'env(safe-area-inset-top, 0)' }}>
      <div className="relative z-10">
        <h1 className='text-xl font-semibold text-white logo-minecraft drop-shadow-[0_0_8px_rgba(248,236,222,0.4)]'>
          R'e
        </h1>
      </div>
      
      <button
        onClick={toggleSidebar}
        className='relative z-10 text-white p-2 rounded-xl transition-all duration-300 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md border border-white/20 hover:border-amber-200/40 hover:from-white/15 hover:via-amber-50/10 hover:to-white/15 active:scale-95 hover:shadow-lg hover:shadow-amber-200/20'
        aria-label='Toggle menu'
      >
        <div className="relative w-6 h-6 flex flex-col items-center justify-center">
          <span className={`absolute w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            isSidebarOpen ? 'rotate-45 top-3' : 'top-1.5'
          }`} />
          <span className={`absolute w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            isSidebarOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100 top-3'
          }`} />
          <span className={`absolute w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            isSidebarOpen ? '-rotate-45 top-3' : 'top-4.5'
          }`} />
        </div>
      </button>
    </header>
  )

  // Mobile Sidebar - floating sidebar bukan fullscreen
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />
      
      {/* Floating Sidebar */}
      <aside
        className={`md:hidden fixed top-4 right-4 z-50 w-72 rounded-2xl bg-gradient-to-br from-black/98 via-black/95 to-black/98 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 transition-all duration-300 transform ${
          isSidebarOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{ marginTop: `calc(env(safe-area-inset-top, 0) + 60px)` }}
      >
        {/* Navigation */}
        <nav className='p-4'>
          <div className="relative px-4 py-4 rounded-2xl bg-gradient-to-br from-white/8 via-white/5 to-white/8 backdrop-blur-md border border-white/15 shadow-xl shadow-black/30">
            <ul className='relative flex flex-col gap-2'>
              {navlinks.map((navlink, index) => (
                <li key={navlink.id} className="group/link">
                  <a
                    href={navlink.link}
                    onClick={closeSidebar}
                    className='relative block text-base font-medium px-6 py-4 rounded-xl transition-all duration-300 text-white/85 hover:text-white hover:bg-gradient-to-r hover:from-amber-50/10 hover:via-white/10 hover:to-amber-50/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-200/10 overflow-hidden border border-transparent hover:border-white/10'
                  >
                    {/* Elegant amber shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/15 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10">{navlink.text}</span>
                  </a>
                  {index < navlinks.length - 1 && (
                    <div className="my-2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  )

  return (
    <>
      <DesktopNavbar /> {/* TIDAK DIUBAH */}
      <MobileHeader />  {/* Diubah menjadi floating */}
      <MobileSidebar /> {/* Diubah menjadi floating */}
      
      {/* Spacer untuk mobile header agar konten tidak tertutup */}
      <div className="md:hidden h-20" />
    </>
  )
}

export default Navbar