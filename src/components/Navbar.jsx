import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navlinks } from '../../constant'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === 'light';

  // --- THEME SYNC ---
  useEffect(() => {
    const updateTheme = () => {
        setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), [])
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])

  const toggleThemeMode = useCallback(() => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark'
    setThemeMode(newTheme)
    document.documentElement.dataset.theme = newTheme
    localStorage.setItem('theme', newTheme)
  }, [themeMode])

  // --- DESKTOP NAVBAR ---
  const DesktopNavbar = () => (
    <nav className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative flex items-center px-2 py-2 rounded-full border backdrop-blur-xl transition-all duration-300 ${
            isLight 
                ? 'bg-white/80 border-gray-200 shadow-lg shadow-gray-200/50' 
                : 'bg-black/80 border-white/10 shadow-xl shadow-black/50'
        }`}
      >
        {/* Logo */}
        <a href="#home" className="pl-4 pr-6 flex items-center">
            <img 
                src="/img/logo2.png" 
                alt="Logo" 
                // PERBAIKAN: Logo default saat Dark Mode (tidak ada filter). 
                // Saat Light Mode, kita invert agar menjadi hitam (jika logo aslinya putih).
                className={`h-10 w-auto object-contain transition-all duration-300 hover:scale-110 ${isLight ? 'invert' : ''}`} 
            />
        </a>

        {/* Separator */}
        <div className={`w-px h-6 mr-2 ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />

        {/* Links */}
        <ul className="flex items-center gap-1">
            {navlinks.map((link) => (
                <li key={link.id}>
                    <a 
                        href={link.link}
                        className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-opacity-10 ${
                            isLight 
                                ? 'text-gray-600 hover:text-black hover:bg-black' 
                                : 'text-gray-400 hover:text-white hover:bg-white'
                        }`}
                    >
                        {link.text}
                    </a>
                </li>
            ))}
        </ul>

        {/* Theme Toggle */}
        <button 
            onClick={toggleThemeMode}
            className={`ml-4 p-2 rounded-full transition-all duration-300 ${
                isLight 
                    ? 'bg-gray-100 text-black hover:bg-gray-200' 
                    : 'bg-white/10 text-white hover:bg-white/20'
            }`}
        >
            {isLight ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
        </button>
      </motion.div>
    </nav>
  )

  // --- MOBILE HEADER ---
  const MobileHeader = () => (
    <header 
        className={`md:hidden fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-4 py-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
            scrolled
                ? (isLight ? 'bg-white/90 border-gray-200 shadow-lg' : 'bg-black/90 border-white/10 shadow-lg')
                : (isLight ? 'bg-white/50 border-transparent' : 'bg-black/50 border-transparent')
        }`}
    >
        {/* Logo */}
        <a href="#home">
            <img 
                src="/img/logo2.png" 
                alt="Logo" 
                // PERBAIKAN: Sama seperti desktop, hanya invert saat light mode
                className={`h-8 w-auto object-contain ${isLight ? 'invert' : ''}`} 
            />
        </a>

        <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
                onClick={toggleThemeMode}
                className={`p-2 rounded-xl transition-all ${
                    isLight 
                        ? 'bg-gray-100 text-black' 
                        : 'bg-white/10 text-white'
                }`}
            >
                {isLight ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
            </button>

            {/* Hamburger Menu */}
            <button 
                onClick={toggleSidebar}
                className={`p-2 rounded-xl transition-all ${
                    isLight 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black'
                }`}
            >
                <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
                    <span className={`block w-full h-0.5 bg-current transition-all ${isSidebarOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-full h-0.5 bg-current transition-all ${isSidebarOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-full h-0.5 bg-current transition-all ${isSidebarOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
            </button>
        </div>
    </header>
  )

  // --- MOBILE SIDEBAR ---
  const MobileSidebar = () => (
    <AnimatePresence>
        {isSidebarOpen && (
            <>
                {/* Overlay */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
                />
                
                {/* Sidebar Panel */}
                <motion.aside
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`fixed top-4 right-4 bottom-4 w-72 z-[70] md:hidden rounded-2xl overflow-hidden flex flex-col border ${
                        isLight 
                            ? 'bg-white border-gray-200' 
                            : 'bg-neutral-900 border-neutral-800'
                    }`}
                >
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <span className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>Menu</span>
                            <button onClick={closeSidebar} className={`p-2 rounded-full hover:bg-opacity-10 ${isLight ? 'hover:bg-black text-black' : 'hover:bg-white text-white'}`}>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <ul className="flex flex-col gap-2">
                            {navlinks.map((link, i) => (
                                <motion.li 
                                    key={link.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <a 
                                        href={link.link} 
                                        onClick={closeSidebar}
                                        className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                                            isLight 
                                                ? 'text-gray-600 hover:text-black hover:bg-gray-100' 
                                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        {link.text}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-8 border-t border-dashed border-gray-200 dark:border-neutral-800">
                            <p className={`text-xs text-center ${isLight ? 'text-gray-400' : 'text-gray-600'}`}>
                                © 2024 Rafaditya Syahputra
                            </p>
                        </div>
                    </div>
                </motion.aside>
            </>
        )}
    </AnimatePresence>
  )

  return (
    <>
      <DesktopNavbar />
      <MobileHeader />
      <MobileSidebar />
    </>
  )
}

export default Navbar