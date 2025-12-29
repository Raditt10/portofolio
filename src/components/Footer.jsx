import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const lineRef = useRef(null);
  const logoSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const socialSectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    message: "", 
    isSubmitting: false
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [toast, setToast] = useState({ show: false, message: '', type: '', isExiting: false });
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const root = document.documentElement;
      return root.getAttribute('data-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });
  const isLight = themeMode === 'light';

  const EMAILJS_SERVICE_ID = "service_kkmzp89";
  const EMAILJS_TEMPLATE_ID = "template_gl1shr7"; 
  const EMAILJS_PUBLIC_KEY = "EG9qC9jkGx6_xS4cu";
  
  useEffect(() => {
    try {
      const root = document.documentElement;
      const initial = root.getAttribute('data-theme') || 'dark';
      setThemeMode(initial);
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'data-theme') {
            const current = root.getAttribute('data-theme') || 'dark';
            setThemeMode(current);
          }
        }
      });
      observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
      return () => observer.disconnect();
    } catch {}
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    const line = lineRef.current;
    const logoSection = logoSectionRef.current;
    const contactSection = contactSectionRef.current;
    const socialSection = socialSectionRef.current;
    const form = formRef.current;

    if (!footer || !line || !logoSection || !contactSection || !socialSection || !form) return;

    gsap.set([line, logoSection, contactSection, socialSection, form], { y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    });

    tl.to(line, { y: 0, duration: 0.6, ease: "power2.out" })
    .to(logoSection, { y: 0, duration: 0.6, ease: "back.out(1.2)" }, "-=0.3")
    .to(contactSection, { y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
    .to(socialSection, { y: 0, duration: 0.6, ease: "back.out(1.2)" }, "-=0.3")
    .to(form, { y: 0, duration: 0.6, ease: "power2.out" }, "-=0.6");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const playSuccessSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    setTimeout(() => {
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      osc2.frequency.value = 1000;
      osc2.type = 'sine';
      gain2.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      osc2.start(audioContext.currentTime);
      osc2.stop(audioContext.currentTime + 0.4);
    }, 150);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.message.trim()) {
      setStatusMessage("Please fill in all fields");
      return;
    }

    setFormData(prev => ({ ...prev, isSubmitting: true }));
    setStatusMessage("");

    try {
      const templateParams = {
        to_email: "iniakuraditt@gmail.com",
        from_email: formData.email,
        user_message: formData.message, 
        subject: `Collaboration Request from ${formData.email}`,
        reply_to: formData.email,
        timestamp: new Date().toLocaleString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long',
          day: 'numeric', hour: '2-digit', minute: '2-digit'
        })
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);

      playSuccessSound();
      setToast({ show: true, message: "", type: 'success', isExiting: false });
      setFormData({ email: "", message: "", isSubmitting: false });
      
      setTimeout(() => {
        setToast(prev => ({ ...prev, isExiting: true }));
        setTimeout(() => setToast({ show: false, message: '', type: '', isExiting: false }), 500);
      }, 4500);
    } catch (error) {
      console.error("Error:", error);
      setToast({ show: true, message: 'Failed to send message.', type: 'error', isExiting: false });
      setFormData(prev => ({ ...prev, isSubmitting: false }));
      setTimeout(() => {
        setToast(prev => ({ ...prev, isExiting: true }));
        setTimeout(() => setToast({ show: false, message: '', type: '', isExiting: false }), 500);
      }, 4500);
    }
  };

  return (
    <>
      {toast.show && (
        <div className={`fixed top-6 left-1/2 z-[10000] ${
          toast.isExiting ? 'animate-[slideUpFade_0.5s_cubic-bezier(0.4,0,0.2,1)_forwards]' : 'animate-[slideDownBounce_0.8s_cubic-bezier(0.16,1,0.3,1)]'
        }`} style={{ transform: 'translateX(-50%)' }}>
          <div className={`relative px-4 py-3 sm:px-6 sm:py-4 rounded-xl backdrop-blur-md shadow-2xl min-w-[280px] sm:min-w-[340px] border ${
            isLight ? 'bg-white/95 border-gray-200' : 'bg-gray-900/95 border-white/10'
          } ${toast.isExiting ? '' : 'animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]'}`}>
            {/* Progress Bar at Bottom - Minecraft Style */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-800/80 rounded-b-xl overflow-hidden border-t border-gray-700/50">
              <div className={`h-full relative ${isLight ? 'bg-green-500' : 'bg-green-400'}`} 
                   style={{ 
                     animation: 'progressBar 5s linear forwards',
                     imageRendering: 'pixelated',
                     boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                   }}>
                {/* Minecraft-style segments */}
                <div className="absolute inset-0 flex">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex-1 border-r border-gray-900/20" style={{ imageRendering: 'pixelated' }} />
                  ))}
                </div>
                {/* Highlight effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20" style={{ imageRendering: 'pixelated' }} />
              </div>
            </div>
            
            <div className="relative flex items-center gap-3 sm:gap-4">
              {/* Checkmark Icon with Scale Animation */}
              <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 ${
                isLight ? 'bg-green-50 border-green-200' : 'bg-green-500/10 border-green-500/30'
              } ${toast.isExiting ? 'animate-[fadeOutScale_0.3s_ease-out_forwards]' : 'animate-[checkPop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_0.4s_both]'}`}>
                <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${isLight ? 'text-green-600' : 'text-green-400'} ${
                  toast.isExiting ? '' : 'animate-[drawCheck_0.6s_cubic-bezier(0.65,0,0.35,1)_0.6s_both]'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ strokeDasharray: 24, strokeDashoffset: toast.isExiting ? 0 : 24 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Message with Fade In */}
              <div className={`flex-1 ${
                toast.isExiting ? 'animate-[fadeOutRight_0.3s_ease-out_forwards]' : 'animate-[fadeInSlide_0.5s_cubic-bezier(0.16,1,0.3,1)_0.5s_both]'
              }`}>
                <p className={`text-sm sm:text-base font-medium ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  Pesan berhasil dikirim!
                </p>
              </div>
              {/* Close Button */}
              <button onClick={() => {
                setToast(prev => ({ ...prev, isExiting: true }));
                setTimeout(() => setToast({ show: false, message: '', type: '', isExiting: false }), 500);
              }}
                className={`flex-shrink-0 p-1 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isLight ? 'hover:bg-gray-100 text-gray-400 hover:text-gray-600' : 'hover:bg-white/10 text-gray-400 hover:text-white'
                } ${toast.isExiting ? 'animate-[fadeOutScale_0.2s_ease-out_forwards]' : 'animate-[fadeInScale_0.4s_cubic-bezier(0.16,1,0.3,1)_0.6s_both]'}`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer id="contact" ref={footerRef} className="relative min-h-screen overflow-hidden py-20 px-4 sm:px-6 md:px-8 lg:px-12" style={{ fontFamily: "Sora Variable" }}>
        <div ref={lineRef} className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r ${isLight ? 'from-transparent via-black/20 to-transparent' : 'from-transparent via-white/30 to-transparent'}`} />

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-12 lg:gap-8 pt-12 sm:pt-16 md:pt-20 max-w-7xl mx-auto relative z-20">
          
          <div ref={logoSectionRef} className="flex flex-col items-center lg:items-start order-1 lg:order-1 group relative">
            <div className={`relative p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 ${isLight ? 'bg-white/80 border-amber-100 group-hover:border-amber-200 shadow-[0_12px_35px_rgba(0,0,0,0.08)]' : 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-white/10 group-hover:border-white/30'}`}>
              <div className="relative inline-block group/img">
                <div className="relative overflow-hidden rounded-lg bg-black/20">
                  <img src="/img/meow.jpg" loading="lazy" className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-lg transition-all duration-300 group-hover/img:scale-105 filter group-hover/img:brightness-110 z-10 object-cover block" alt="Logo" style={{ margin: 0, padding: 0 }} />
                </div>
              </div>
              <h3 className={`font-bold text-2xl sm:text-3xl md:text-4xl mt-4 sm:mt-5 bg-clip-text text-transparent transition-all duration-300`}
                  style={{
                    backgroundImage: isLight ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)' : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
                    backgroundClip: 'text', WebkitBackgroundClip: 'text'
                  }}>
                <img src="/img/logo2.png" alt="Logo" className="inline-block h-14 sm:h-16 md:h-20 w-auto object-contain align-middle" style={{ maxHeight: '5rem' }} />
              </h3>
              <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLight ? 'bg-amber-200' : 'bg-white/30'}`}></div>
              <div className={`absolute -bottom-2 -left-2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLight ? 'bg-amber-100' : 'bg-white/20'}`}></div>
            </div>
          </div>

          <div ref={contactSectionRef} className="flex flex-col items-center lg:items-center order-2 lg:order-2 w-full lg:w-auto max-w-md lg:max-w-none">
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isLight ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)' : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
                    backgroundClip: 'text', WebkitBackgroundClip: 'text'
                  }}>Contact</h2>
              <div className={`flex gap-3 items-center justify-center p-3 rounded-lg border ${isLight ? 'bg-white/80 border-amber-100 shadow-[0_10px_25px_rgba(0,0,0,0.06)]' : 'bg-white/5 border-white/10'}`}>
                <img src="/img/email.png" alt="Email" className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${isLight ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]' : 'filter brightness-0 invert'}`} />
                <h3 className={`${isLight ? 'text-slate-900' : 'text-white'} text-sm sm:text-base md:text-lg font-mono`}>iniakuraditt@gmail.com</h3>
              </div>
            </div>

            <div className="flex flex-col items-center text-center w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 lg:mb-7 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isLight ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)' : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
                    backgroundClip: 'text', WebkitBackgroundClip: 'text'
                  }}>Get in Touch</h2>
              
              {statusMessage && (
                <div className={`mb-4 p-4 rounded-lg text-center max-w-md backdrop-blur-sm border ${
                  statusMessage.includes("✅") ? "bg-green-500/20 text-green-300 border-green-500/50" : "bg-red-500/20 text-red-300 border-red-500/50"
                }`}>{statusMessage}</div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col w-full lg:w-auto items-center gap-4 relative">
                <div className="relative w-full">
                  <input className={`backdrop-blur-sm w-full sm:w-80 md:w-96 h-12 sm:h-14 px-4 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base border transition-all duration-300 placeholder-gray-400 ${isLight ? 'bg-white/90 text-slate-900 border-amber-100 focus:ring-amber-200 focus:border-amber-300' : 'bg-gray-900/80 text-white border-white/10 focus:ring-white/30 focus:border-white/30'}`}
                    type="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleInputChange} required disabled={formData.isSubmitting} />
                </div>
                
                <div className="relative w-full">
                  <textarea className={`backdrop-blur-sm w-full sm:w-80 md:w-96 h-24 sm:h-28 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base border transition-all duration-300 resize-none placeholder-gray-400 ${isLight ? 'bg-white/90 text-slate-900 border-amber-100 focus:ring-amber-200 focus:border-amber-300' : 'bg-gray-900/80 text-white border-white/10 focus:ring-white/30 focus:border-white/30'}`}
                    name="message" placeholder="Tell me about your project or collaboration idea..." value={formData.message} onChange={handleInputChange} required disabled={formData.isSubmitting} maxLength={500} />
                </div>
                
                <div className={`${isLight ? 'text-gray-600' : 'text-gray-400'} text-xs text-right w-full sm:w-80 md:w-96`}>
                  {formData.message.length}/500 characters
                </div>

                <button type="submit" disabled={formData.isSubmitting}
                  className={`relative overflow-hidden font-bold text-sm md:text-base whitespace-nowrap px-8 sm:px-10 py-3 sm:py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 border ${isLight ? 'bg-[#ffeccc] text-slate-900 border-amber-200 hover:bg-[#ffdfa8] hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]' : 'bg-white/10 hover:bg-white/20 border-white/20 text-white hover:shadow-lg'}`}>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {formData.isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

          <div ref={socialSectionRef} className="flex flex-col items-center lg:items-end order-3 lg:order-3 relative">
            <div className={`relative p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 ${isLight ? 'bg-white/80 border-amber-100 hover:border-amber-200 shadow-[0_12px_35px_rgba(0,0,0,0.08)]' : 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-white/10 hover:border-white/30'}`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 text-center lg:text-right bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isLight ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)' : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
                    backgroundClip: 'text', WebkitBackgroundClip: 'text'
                  }}>Social</h2>
              <div className="flex justify-center gap-5 sm:gap-6 md:gap-8 items-center flex-wrap">
                {[
                  { href: "https://www.instagram.com/rafaa_ndl?igsh=MXVuenhyaHgzeGhjMw==", src: "/img/instagram.png", alt: "Instagram" },
                  { href: "https://www.youtube.com/@iniakuraditt", src: "/img/youtube.png", alt: "YouTube" },
                  { href: "https://www.linkedin.com/in/rafaditya-syahputra-789809399/", src: "/img/linkin.png", alt: "LinkedIn" },
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="block group/social relative touch-manipulation active:scale-95" aria-label={social.alt}>
                    <div className="absolute -inset-2 rounded-full opacity-0 group-hover/social:opacity-40 transition-opacity duration-300 blur-lg bg-white/30" />
                    <div className="relative transform transition-all duration-300 group-hover/social:scale-105">
                      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 rounded-full overflow-hidden shadow-xl transition-colors duration-300 flex items-center justify-center ${isLight ? 'bg-white hover:bg-amber-50 border border-amber-100' : 'bg-white/90 hover:bg-white'}`}>
                        <img src={social.src} alt={social.alt} className="w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 object-contain transition-transform duration-300 group-hover/social:scale-105" loading="lazy" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                      </div>
                    </div>
                    <div className="hidden sm:block absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/social:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30">
                      <div className={`px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-lg ${isLight ? 'bg-white' : 'bg-white/90'}`}>
                        <p className="text-black text-xs font-semibold">{social.alt}</p>
                      </div>
                      <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${isLight ? 'bg-white' : 'bg-white/90'}`} />
                    </div>
                    <div className="sm:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-active/social:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                      <p className="text-black text-[10px] font-semibold whitespace-nowrap bg-white/90 px-2 py-1 rounded shadow-lg">{social.alt}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex relative justify-center items-center mt-20 pb-8 z-20">
          <div className={`absolute -top-10 left-1/2 w-10/12 -translate-x-1/2 h-0.5 bg-gradient-to-r ${isLight ? 'from-transparent via-black/15 to-transparent' : 'from-transparent via-white/30 to-transparent'}`} />
          <h1 className="font-bold text-sm md:text-base tracking-wide bg-clip-text text-transparent"
              style={{
                backgroundImage: isLight ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)' : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                backgroundClip: 'text', WebkitBackgroundClip: 'text'
              }}>© Ra'e All rights reserved.</h1> 
        </div>

        <style jsx>{`
          @keyframes slideDownBounce {
            0% { 
              transform: translateX(-50%) translateY(-100px) scale(0.95);
              opacity: 0;
            }
            50% { 
              transform: translateX(-50%) translateY(4px) scale(1.01);
              opacity: 1;
            }
            75% { 
              transform: translateX(-50%) translateY(-2px) scale(0.995);
            }
            100% { 
              transform: translateX(-50%) translateY(0) scale(1);
              opacity: 1;
            }
          }
          
          @keyframes slideUpFade {
            0% { 
              transform: translateX(-50%) translateY(0) scale(1);
              opacity: 1;
            }
            100% { 
              transform: translateX(-50%) translateY(-40px) scale(0.97);
              opacity: 0;
            }
          }

          @keyframes scaleIn {
            0% { 
              transform: scale(0.95);
              opacity: 0;
            }
            100% { 
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes checkPop {
            0% { 
              transform: scale(0);
              opacity: 0;
            }
            40% { 
              transform: scale(1.05);
            }
            100% { 
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes drawCheck {
            0% { 
              stroke-dashoffset: 24;
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% { 
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }

          @keyframes fadeInSlide {
            0% { 
              transform: translateX(-15px);
              opacity: 0;
            }
            100% { 
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes fadeInScale {
            0% { 
              transform: scale(0.8);
              opacity: 0;
            }
            100% { 
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes fadeOutScale {
            0% { 
              transform: scale(1);
              opacity: 1;
            }
            100% { 
              transform: scale(0.8);
              opacity: 0;
            }
          }

          @keyframes fadeOutRight {
            0% { 
              transform: translateX(0);
              opacity: 1;
            }
            100% { 
              transform: translateX(10px);
              opacity: 0;
            }
          }

          @keyframes progressBar {
            0% { width: 100%; }
            100% { width: 0%; }
          }
        `}</style>
      </footer>
    </>
  );
};

export default Footer;