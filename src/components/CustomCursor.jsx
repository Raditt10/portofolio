import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isGalleryModal, setIsGalleryModal] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.dataset.theme || 'dark';
  });

  const isLight = theme === 'light';
  useEffect(() => {
    const handleGalleryModal = (e) => {
      setIsGalleryModal(!!(e.detail && e.detail.open));
    };
    window.addEventListener('gallery-modal', handleGalleryModal);
    return () => window.removeEventListener('gallery-modal', handleGalleryModal);
  }, []);

  // Observe global theme changes
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          const current = document.documentElement.dataset.theme;
          setTheme(current || 'dark');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const checkHoverElements = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.type === 'submit' ||
        target.type === 'button' ||
        target.onclick !== null ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const animateCursor = () => {
      // Smooth follow for outer circle
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      // Faster follow for inner dot
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      if (cursor) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }
      
      if (cursorDot) {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      }

      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', checkHoverElements);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    animateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', checkHoverElements);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Hide custom cursor on mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  

  if (isMobile) {
    return null;
  }
  if (isGalleryModal) {
    // Saat modal gallery aktif, sembunyikan custom cursor dan munculkan cursor default hanya di overlay
    return <style>{`.gallery-modal-overlay, .gallery-modal-overlay * { cursor: default !important; }`}</style>;
  }

  return (
    <>
      {/* Outer Circle */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          width: isPointer ? '48px' : '36px',
          height: isPointer ? '48px' : '36px',
          marginLeft: isPointer ? '-24px' : '-18px',
          marginTop: isPointer ? '-24px' : '-18px',
          borderRadius: '50%',
          border: isLight ? '1.5px solid rgba(15, 23, 42, 0.35)' : '1.5px solid rgba(255, 255, 255, 0.4)',
          background: isLight
            ? 'radial-gradient(circle, rgba(15, 23, 42, 0.08) 0%, rgba(15, 23, 42, 0.04) 50%, transparent 100%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
          backdropFilter: 'blur(4px)',
          boxShadow: isPointer
            ? (isLight
                ? '0 0 20px rgba(15, 23, 42, 0.15), inset 0 0 10px rgba(15, 23, 42, 0.12)'
                : '0 0 20px rgba(255, 255, 255, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.1)')
            : (isLight
                ? '0 0 15px rgba(15, 23, 42, 0.12), inset 0 0 8px rgba(15, 23, 42, 0.08)'
                : '0 0 15px rgba(255, 255, 255, 0.1), inset 0 0 8px rgba(255, 255, 255, 0.08)'),
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease',
          borderColor: isPointer
            ? (isLight ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)')
            : (isLight ? 'rgba(15, 23, 42, 0.35)' : 'rgba(255, 255, 255, 0.4)'),
        }}
      />

      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-100 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          width: isPointer ? '6px' : '4px',
          height: isPointer ? '6px' : '4px',
          marginLeft: isPointer ? '-3px' : '-2px',
          marginTop: isPointer ? '-3px' : '-2px',
          borderRadius: '50%',
          background: isPointer 
            ? (isLight
                ? 'radial-gradient(circle, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 100%)'
                : 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 100%)')
            : (isLight
                ? 'radial-gradient(circle, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.6) 100%)'
                : 'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.6) 100%)'),
          boxShadow: isPointer 
            ? (isLight
                ? '0 0 12px rgba(15, 23, 42, 0.45), 0 0 20px rgba(15, 23, 42, 0.25)'
                : '0 0 12px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.3)')
            : (isLight
                ? '0 0 8px rgba(15, 23, 42, 0.4), 0 0 15px rgba(15, 23, 42, 0.2)'
                : '0 0 8px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.2)'),
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, box-shadow 0.3s ease',
        }}
      />

      {/* Hide default cursor kecuali saat modal gallery aktif */}
      <style>{`
        * {
          cursor: none !important;
        }
        a, button, input, textarea, select, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
