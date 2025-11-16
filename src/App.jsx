import { gsap } from "gsap";
import '@fontsource-variable/sora';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useState } from 'react';

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

  return (
    <main className='bg-black overflow-x-hidden'>
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
