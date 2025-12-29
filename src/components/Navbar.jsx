import React, { useState, useEffect, useCallback } from 'react'
import { navlinks } from '../../constant'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.dataset.theme || localStorage.getItem('theme') || 'dark'
  })

  const isLight = theme === 'light'

  // Deteksi mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Animasi masuk navbar mobile
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isMobile])

  // Sync with global theme (observes data-theme on <html>)
  useEffect(() => {
    if (typeof document === 'undefined') return
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          const current = document.documentElement.dataset.theme
          setTheme(current || 'dark')
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
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

  const toggleThemeMode = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.dataset.theme = newTheme
    localStorage.setItem('theme', newTheme)
  }, [theme])

  // Desktop navbar - TIDAK DIUBAH sama sekali
  const DesktopNavbar = () => (
    <nav className={`hidden md:flex justify-center font-sora font-semibold items-center h-14 transition-all duration-500 fixed z-50 w-full px-8 bg-transparent mt-6`} role="navigation" aria-label="Main Navigation">
      <div className="relative group">
        <div className={`relative px-6 py-2.5 rounded-full backdrop-blur-md transition-all duration-500 group-hover:shadow-lg ${
          isLight
            ? 'bg-white/60 border border-slate-200/50 group-hover:bg-white/70 group-hover:border-amber-300/60 group-hover:shadow-amber-200/30'
            : 'bg-white/10 border border-white/15 group-hover:bg-white/15 group-hover:border-amber-200/40 group-hover:shadow-amber-200/20'
        }`}>
          {/* Elegant glow on hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-amber-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="relative px-4 py-2 group/logo flex items-center">
              <span className="sr-only">Home</span>
              <a href="#home" aria-label="Home" tabIndex={0} className="flex items-center">
                <img
                  src="/img/logo2.png"
                  alt="Logo"
                  className="h-20 w-20 object-contain drop-shadow-lg transition-all duration-300 group-hover/logo:scale-110"
                  style={{ maxHeight: '5rem', filter: 'drop-shadow(0 2px 16px rgba(0,0,0,0.22))', marginTop: '-0.5rem', marginBottom: '-0.5rem' }}
                />
              </a>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </div>
          
            {/* Navigation Links */}
            <ul className='relative flex gap-1'>
              {navlinks.map((navlink, index) => (
              <li key={navlink.id} className="relative group/item">
                <a 
                  href={navlink.link}
                  className={`relative block text-base font-medium px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 ${
                    isLight
                      ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/90 hover:border hover:border-slate-200/80'
                      : 'text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-amber-50/10 hover:via-white/10 hover:to-amber-50/10 hover:drop-shadow-[0_0_15px_rgba(248,236,222,0.4)]'
                  }`}
                  tabIndex={0}
                  aria-label={navlink.text}
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
            
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleThemeMode}
              className="relative w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
              style={{
                borderColor: isLight ? 'rgba(100, 116, 139, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                backgroundColor: isLight ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)'
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" style={{color: isLight ? '#475569' : '#ffffff'}}>
                  <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-9.45-9.45 1 1 0 0 0-1.19-1.19A10 10 0 1 0 22 14.05 1 1 0 0 0 21.64 13Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-amber-500" fill="currentColor">
                  <path d="M12 18a6 6 0 1 0-6-6 6 6 0 0 0 6 6Zm0-14a1 1 0 0 0 1-1V2a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1Zm0 16a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1Zm10-7h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2ZM3 12H2a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm14.95-6.95a1 1 0 0 0-1.41 0l-.71.71a1 1 0 1 0 1.41 1.41l.71-.71a1 1 0 0 0 0-1.41ZM7.17 16.83a1 1 0 0 0-1.41 0l-.71.71a1 1 0 0 0 1.41 1.41l.71-.71a1 1 0 0 0 0-1.41Zm12.02 1.41a1 1 0 0 0 0-1.41l-.71-.71a1 1 0 0 0-1.41 1.41l.71.71a1 1 0 0 0 1.41 0ZM7.17 7.17a1 1 0 0 0 0-1.41l-.71-.71a1 1 0 1 0-1.41 1.41l.71.71a1 1 0 0 0 1.41 0Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )

  // Mobile Header - dengan animasi slide down
  const MobileHeader = () => (
    <header 
      className={`md:hidden flex items-center justify-between gap-3 transition-all duration-500 fixed top-4 left-4 right-4 z-50 px-4 py-3 rounded-2xl ${
        scrolled 
          ? (isLight ? 'bg-white/90 backdrop-blur-lg border border-slate-200 shadow-lg shadow-slate-200/50' : 'bg-black/80 backdrop-blur-lg border border-white/10 shadow-lg')
          : (isLight ? 'bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-sm shadow-slate-200/40' : 'bg-black/70 backdrop-blur-md')
      }`} 
      style={{ 
        marginTop: 'env(safe-area-inset-top, 0)',
        transform: isVisible ? 'translateY(0)' : 'translateY(-120%)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out'
      }}
    >
      <div className="relative z-10 flex items-center">
        <a href="#home" aria-label="Home" tabIndex={0} className="flex items-center">
          <img
            src="/img/logo2.png"
            alt="Logo"
            className="h-24 w-24 object-contain drop-shadow-lg"
            style={{ maxHeight: '6rem', filter: 'drop-shadow(0 2px 14px rgba(0,0,0,0.20))' }}
          />
        </a>
      </div>

      <div className="flex items-center gap-2 ml-auto mr-2">
        <button
          type="button"
          onClick={toggleThemeMode}
          className="relative z-10 p-2 rounded-xl transition-all duration-300 backdrop-blur-md active:scale-95"
          style={{
            backgroundColor: isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.08)',
            borderColor: isLight ? 'rgb(226, 232, 240)' : 'rgba(255, 255, 255, 0.2)',
            border: '1px solid'
          }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="white">
              <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-9.45-9.45 1 1 0 0 0-1.19-1.19A10 10 0 1 0 22 14.05 1 1 0 0 0 21.64 13Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-amber-500" fill="currentColor">
              <path d="M12 18a6 6 0 1 0-6-6 6 6 0 0 0 6 6Zm0-14a1 1 0 0 0 1-1V2a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1Zm0 16a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1Zm10-7h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2ZM3 12H2a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm14.95-6.95a1 1 0 0 0-1.41 0l-.71.71a1 1 0 1 0 1.41 1.41l.71-.71a1 1 0 0 0 0-1.41ZM7.17 16.83a1 1 0 0 0-1.41 0l-.71.71a1 1 0 0 0 1.41 1.41l.71-.71a1 1 0 0 0 0-1.41Zm12.02 1.41a1 1 0 0 0 0-1.41l-.71-.71a1 1 0 0 0-1.41 1.41l.71.71a1 1 0 0 0 1.41 0ZM7.17 7.17a1 1 0 0 0 0-1.41l-.71-.71a1 1 0 1 0-1.41 1.41l.71.71a1 1 0 0 0 1.41 0Z" />
            </svg>
          )}
        </button>
        
        <button
          onClick={toggleSidebar}
          className={`relative z-10 p-2 rounded-xl transition-all duration-300 backdrop-blur-md active:scale-95 ${
            isLight
              ? 'text-slate-800 bg-white/90 border border-slate-200 hover:border-amber-300/70 hover:shadow-lg hover:shadow-amber-200/30'
              : 'text-white bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/20 hover:border-amber-200/40 hover:from-white/15 hover:via-amber-50/10 hover:to-white/15 hover:shadow-lg hover:shadow-amber-200/20'
          }`}
          aria-label='Toggle menu'
        >
          <div className="relative w-6 h-6 flex flex-col items-center justify-center">
            <span className={`absolute w-6 h-0.5 ${isLight ? 'bg-slate-800' : 'bg-white'} rounded-full transition-all duration-300 ${
              isSidebarOpen ? 'rotate-45 top-3' : 'top-1.5'
            }`} />
            <span className={`absolute w-6 h-0.5 ${isLight ? 'bg-slate-800' : 'bg-white'} rounded-full transition-all duration-300 ${
              isSidebarOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100 top-3'
            }`} />
            <span className={`absolute w-6 h-0.5 ${isLight ? 'bg-slate-800' : 'bg-white'} rounded-full transition-all duration-300 ${
              isSidebarOpen ? '-rotate-45 top-3' : 'top-4.5'
            }`} />
          </div>
        </button>
      </div>
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
        className={`md:hidden fixed top-4 right-4 z-50 w-72 rounded-2xl backdrop-blur-xl transition-all duration-300 transform ${
          isSidebarOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } ${isLight ? 'bg-white/95 border border-slate-200 shadow-2xl shadow-slate-200/50' : 'bg-gradient-to-br from-black/98 via-black/95 to-black/98 border border-white/10 shadow-2xl shadow-black/50'}`}
        style={{ marginTop: `calc(env(safe-area-inset-top, 0) + 60px)` }}
      >
        {/* Navigation */}
        <nav className='p-4'>
          <div className={`relative px-4 py-4 rounded-2xl backdrop-blur-md shadow-xl ${
            isLight
              ? 'bg-white/90 border border-slate-200 shadow-slate-200/40'
              : 'bg-gradient-to-br from-white/8 via-white/5 to-white/8 border border-white/15 shadow-black/30'
          }`}>
            <ul className='relative flex flex-col gap-2'>
              {navlinks.map((navlink, index) => (
                <li key={navlink.id} className="group/link">
                  <a
                    href={navlink.link}
                    onClick={closeSidebar}
                    className={`relative block text-base font-medium px-6 py-4 rounded-xl transition-all duration-300 overflow-hidden border border-transparent hover:scale-[1.02] ${
                      isLight
                        ? 'text-slate-800 hover:text-slate-900 hover:bg-slate-100/90 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/40'
                        : 'text-white/85 hover:text-white hover:bg-gradient-to-r hover:from-amber-50/10 hover:via-white/10 hover:to-amber-50/10 hover:shadow-lg hover:shadow-amber-200/10 hover:border-white/10'
                    }`}
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
      
      {/* Spacer untuk mobile header agar konten tidak tertutup; invisible so it doesn't look like a second navbar */}
      <div className="md:hidden h-20 invisible" />
    </>
  )
}

export default Navbar