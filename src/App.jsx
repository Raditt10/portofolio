import { gsap } from "gsap";
import '@fontsource-variable/sora';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar'
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Gallery from './components/Gallery';
import Journey from './components/Journey';
import Projetcs from './components/Projetcs';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import About from './components/About';
import Opening from './components/Opening';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return document.documentElement.dataset.theme || 'dark';
  });
  const isLight = theme === 'light';

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
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

  return (
    <main className='overflow-x-hidden' style={{
      background: isLight
        ? 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #e0e7ff 100%)'
        : 'linear-gradient(135deg, #040507 0%, #0a0d12 50%, #050608 100%)'
    }}>
      <CustomCursor />
      {showOpening && <Opening onComplete={() => setShowOpening(false)} />}
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Gallery />
      <Journey />
      <Projetcs />
      <Achievements />
      <Footer />
    </main>
  )
}

export default App
