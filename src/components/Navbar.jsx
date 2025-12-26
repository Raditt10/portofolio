import React, { useState, useEffect } from 'react'
import { navlinks } from '../../constant'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`hidden md:flex justify-center font-sora font-semibold text-white items-center h-20 transition-all duration-300 fixed z-50 w-full px-8 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-gray-700/50' 
          : 'bg-transparent'
      }`}>
        <div className="relative">
          <div className="relative px-6 py-3 rounded-full bg-gray-900/60 backdrop-blur-sm border border-gray-700/50">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="relative px-4 py-2">
                <h1 className='text-2xl text-white' style={{ fontFamily: 'Minecraft, monospace' }}>
                  R'e
                </h1>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-600" />
              </div>
            
              {/* Navigation Links */}
              <ul className='relative flex gap-1'>
                {navlinks.map((navlink, index) => (
                <li key={navlink.id} className="relative">
                  <a 
                    href={navlink.link}
                    className='relative block text-base font-medium px-6 py-2.5 rounded-full transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5'
                  >
                    {navlink.text}
                  </a>
                  {index < navlinks.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-gray-600" />
                  )}
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className={`md:hidden flex justify-between items-center h-20 transition-all duration-300 fixed z-50 w-full px-6 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-gray-700/50' 
          : 'bg-transparent'
      }`}>
        <div className="relative z-10">
          <h1 className='text-xl font-semibold text-white' style={{ fontFamily: 'Minecraft, monospace' }}>
            R'e
          </h1>
        </div>
        
        <button
          onClick={toggleSidebar}
          className='relative z-10 text-white p-3 rounded-lg transition-all duration-200 bg-gray-900/60 border border-gray-700/50 hover:bg-gray-800/60 active:scale-95'
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

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40'
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed top-0 right-0 h-full w-full max-w-[400px] sm:max-w-[450px] bg-black/95 backdrop-blur-md border-l border-gray-700/50 z-50 transform transition-transform duration-300 ease-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-700/50 relative z-10'>
          <h1 className='text-xl font-bold text-white' style={{ fontFamily: 'Minecraft, monospace' }}>R'e</h1>
          <button
            onClick={closeSidebar}
            className='text-white p-2 hover:bg-gray-800/60 rounded-lg transition-all duration-200 border border-gray-700/50'
            aria-label='Close menu'
          >
            <div className="relative w-6 h-6">
              <span className="absolute left-0 top-3 w-6 h-0.5 bg-white rotate-45" />
              <span className="absolute left-0 top-3 w-6 h-0.5 bg-white -rotate-45" />
            </div>
          </button>
        </div>
        
        {/* Navigation */}
        <nav className='p-6 relative z-10'>
          <div className="relative px-4 py-4 rounded-2xl bg-gray-900/60 backdrop-blur-sm border border-gray-700/50">
            <ul className='relative flex flex-col gap-2'>
              {navlinks.map((navlink, index) => (
                <li key={navlink.id}>
                  <a
                    href={navlink.link}
                    onClick={closeSidebar}
                    className='block text-base font-medium px-6 py-3 rounded-lg transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5'
                  >
                    {navlink.text}
                  </a>
                  {index < navlinks.length - 1 && (
                    <div className="my-2 w-full h-px bg-gray-700" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>


    </>
  )
}

export default Navbar