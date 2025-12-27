import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from '@emailjs/browser';

// Register GSAP plugin
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
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const root = document.documentElement;
      return root.getAttribute('data-theme') || localStorage.getItem('theme') || 'dark';
    } catch {
      return 'dark';
    }
  });
  const isLight = themeMode === 'light';

  const EMAILJS_SERVICE_ID = "service_kkmzp89";
  const EMAILJS_TEMPLATE_ID = "template_gl1shr7"; 
  const EMAILJS_PUBLIC_KEY = "EG9qC9jkGx6_xS4cu";
  
  const fullText = "Full Stack Developer & UI/UX Designer";

  // Show full text immediately - no animations
  useEffect(() => {
    setTypedText(fullText);
    setIsTyping(false);
  }, []); 

  // Sync theme from html[data-theme]
  useEffect(() => {
    try {
      const root = document.documentElement;
      const initial = root.getAttribute('data-theme') || localStorage.getItem('theme') || 'dark';
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
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    const line = lineRef.current;
    const logoSection = logoSectionRef.current;
    const contactSection = contactSectionRef.current;
    const socialSection = socialSectionRef.current;
    const form = formRef.current;

    if (!footer || !line || !logoSection || !contactSection || !socialSection || !form) return;

    // Set initial states
    gsap.set([line, logoSection, contactSection, socialSection, form], {
      y: 40
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    });

    tl.to(line, {
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(logoSection, {
      y: 0,
      duration: 0.6,
      ease: "back.out(1.2)"
    }, "-=0.3")
    .to(contactSection, {
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(socialSection, {
      y: 0,
      duration: 0.6,
      ease: "back.out(1.2)"
    }, "-=0.3")
    .to(form, {
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.6");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      oscillator2.frequency.value = 1000;
      oscillator2.type = 'sine';
      gainNode2.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + 0.4);
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
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log("Sending email with params:", templateParams);

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", result);

      playSuccessSound();
      setToast({ show: true, message: "Message sent successfully! I'll get back to you soon.", type: 'success' });
      setFormData({
        email: "",
        message: "",
        isSubmitting: false
      });
      
      setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 5000);

    } catch (error) {
      console.error("Error sending email:", error);
      setToast({ show: true, message: 'Failed to send message. Please try again.', type: 'error' });
      setFormData(prev => ({ ...prev, isSubmitting: false }));
      
      setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 5000);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-3 right-3 sm:top-6 sm:right-6 z-[10000] animate-[slideInRight_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
          <div className={`relative px-2.5 py-2 sm:px-6 sm:py-4 rounded-md sm:rounded-xl backdrop-blur-xl border shadow-2xl min-w-[220px] max-w-[280px] sm:min-w-[320px] sm:max-w-md ${
            toast.type === 'success' 
              ? 'bg-gradient-to-br from-white/95 to-amber-50/95 border-white/50 shadow-amber-200/40' 
              : 'bg-gradient-to-r from-red-900/90 to-rose-900/90 border-red-500/50 shadow-red-500/20'
          }`}>
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-md sm:rounded-xl blur-xl opacity-30 ${
              toast.type === 'success' ? 'bg-amber-300/40' : 'bg-red-500/30'
            }`} />
            
            {/* Content */}
            <div className="relative flex items-start gap-1.5 sm:gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-5 h-5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                toast.type === 'success' ? 'bg-amber-400/20 border border-amber-400/30' : 'bg-red-500/20'
              }`}>
                {toast.type === 'success' ? (
                  <svg className="w-3 h-3 sm:w-5 sm:h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 sm:w-5 sm:h-5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              
              {/* Message */}
              <div className="flex-1">
                <h4 className={`font-bold text-xs sm:text-base mb-0.5 sm:mb-1 ${
                  toast.type === 'success' ? 'text-gray-800' : 'text-red-100'
                }`}>
                  {toast.type === 'success' ? 'Success!' : 'Error'}
                </h4>
                <p className={`text-[10px] sm:text-sm leading-snug sm:leading-relaxed ${
                  toast.type === 'success' ? 'text-gray-700' : 'text-red-200/90'
                }`}>
                  {toast.message}
                </p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setToast({ show: false, message: '', type: '' })}
                className={`flex-shrink-0 p-0.5 sm:p-1.5 rounded-md transition-all duration-300 ${
                  toast.type === 'success' 
                    ? 'hover:bg-amber-400/20 text-gray-600 hover:text-gray-800' 
                    : 'hover:bg-red-500/20 text-red-300'
                }`}
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className={`absolute bottom-0 left-0 h-0.5 sm:h-1 rounded-b-md sm:rounded-b-xl ${
              toast.type === 'success' ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-red-500'
            }`} style={{
              width: '100%',
              animation: 'progressBar 5s linear forwards'
            }} />
          </div>
        </div>
      )}

      <footer
        id="contact"
        ref={footerRef}
        className="relative min-h-screen overflow-hidden py-20 px-4 sm:px-6 md:px-8 lg:px-12"
        style={{ fontFamily: "Sora Variable" }}
      >
        {/* Simple top line */}
        <div 
          ref={lineRef}
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r ${isLight ? 'from-transparent via-black/20 to-transparent' : 'from-transparent via-white/30 to-transparent'}`}
        />

      {/* Footer content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-12 lg:gap-8 pt-12 sm:pt-16 md:pt-20 max-w-7xl mx-auto relative z-20">
        
        {/* Logo Section */}
        <div 
          ref={logoSectionRef}
          className="flex flex-col items-center lg:items-start order-1 lg:order-1 group relative"
        >
         <div className={`relative p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 ${isLight ? 'bg-white/80 border-amber-100 group-hover:border-amber-200 shadow-[0_12px_35px_rgba(0,0,0,0.08)]' : 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-white/10 group-hover:border-white/30'}`}>
  {/* Simple Image Frame */}
  <div className="relative inline-block group/img">
    {/* Main Image Container */}
    <div className="relative overflow-hidden rounded-lg bg-black/20">
      {/* The Image */}
      <img
        src="/img/meow.jpg"
        loading="lazy"
        className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-lg transition-all duration-300 group-hover/img:scale-105 filter group-hover/img:brightness-110 z-10 object-cover block"
        alt="LOGO RS"
        style={{
          margin: 0,
          padding: 0
        }}
      />
    </div>
        </div>

        <h3 className={`font-bold text-2xl sm:text-3xl md:text-4xl mt-4 sm:mt-5 bg-clip-text text-transparent transition-all duration-300 ${isLight ? '' : ''}`}
            style={{
              backgroundImage: isLight
                ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text'
            }}
        >
          Ra'e 
        </h3>
        <div className="relative mt-2 sm:mt-3 min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem]">
          <h4 className={`${isLight ? 'text-slate-800' : 'text-white/80'} font-medium text-sm sm:text-base md:text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-2 relative`}>
            {/* Main Text with Typing Effect */}
            <span className="relative inline-block">
              {typedText}
            </span>
          </h4>
        </div>

        {/* Additional simple elements */}
        <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLight ? 'bg-amber-200' : 'bg-white/30'}`}></div>
        <div className={`absolute -bottom-2 -left-2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLight ? 'bg-amber-100' : 'bg-white/20'}`}></div>
      </div>
        </div>

        {/* Contact Section */}
        <div 
          ref={contactSectionRef}
          className="flex flex-col items-center lg:items-center order-2 lg:order-2 w-full lg:w-auto max-w-md lg:max-w-none"
        >
          {/* Contact Info */}
          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4 bg-clip-text text-transparent"
                style={{
                  backgroundImage: isLight
                    ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text'
                }}
            >
              Contact
            </h2>
            <div className={`flex gap-3 items-center justify-center p-3 rounded-lg border ${isLight ? 'bg-white/80 border-amber-100 shadow-[0_10px_25px_rgba(0,0,0,0.06)]' : 'bg-white/5 border-white/10'}`}>
              <img
                src="/img/email.png"
                alt="Email icon"
                className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 filter brightness-0 invert"
              />
              <h3 className={`${isLight ? 'text-slate-900' : 'text-white'} text-sm sm:text-base md:text-lg font-mono`}>
                iniakuraditt@gmail.com
              </h3>
            </div>
          </div>

          {/* Collaboration Form */}
          <div className="flex flex-col items-center text-center w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 lg:mb-7 bg-clip-text text-transparent"
                style={{
                  backgroundImage: isLight
                    ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text'
                }}
            >
              Get in Touch
            </h2>
            
            {/* Status Message */}
            {statusMessage && (
              <div className={`mb-4 p-4 rounded-lg text-center max-w-md backdrop-blur-sm border ${
                statusMessage.includes("✅") 
                  ? "bg-green-500/20 text-green-300 border-green-500/50" 
                  : "bg-red-500/20 text-red-300 border-red-500/50"
              }`}>
                {statusMessage}
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col w-full lg:w-auto items-center gap-4 relative"
            >
              {/* Email Input */}
              <div className="relative w-full">
                <input
                  className={`backdrop-blur-sm w-full sm:w-80 md:w-96 h-12 sm:h-14 px-4 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base border transition-all duration-300 placeholder-gray-400 ${isLight ? 'bg-white/90 text-slate-900 border-amber-100 focus:ring-amber-200 focus:border-amber-300' : 'bg-gray-900/80 text-white border-white/10 focus:ring-white/30 focus:border-white/30'}`}
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={formData.isSubmitting}
                />
              </div>
              
              {/* Message Textarea */}
              <div className="relative w-full">
                <textarea
                  className={`backdrop-blur-sm w-full sm:w-80 md:w-96 h-24 sm:h-28 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base border transition-all duration-300 resize-none placeholder-gray-400 ${isLight ? 'bg-white/90 text-slate-900 border-amber-100 focus:ring-amber-200 focus:border-amber-300' : 'bg-gray-900/80 text-white border-white/10 focus:ring-white/30 focus:border-white/30'}`}
                  name="message"
                  placeholder="Tell me about your project or collaboration idea..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={formData.isSubmitting}
                  maxLength={500}
                />
              </div>
              
              <div className={`${isLight ? 'text-gray-600' : 'text-gray-400'} text-xs text-right w-full sm:w-80 md:w-96`}>
                {formData.message.length}/500 characters
              </div>

              <button
                type="submit"
                disabled={formData.isSubmitting}
                className={`relative overflow-hidden font-bold text-sm md:text-base whitespace-nowrap px-8 sm:px-10 py-3 sm:py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 border ${isLight ? 'bg-[#ffeccc] text-slate-900 border-amber-200 hover:bg-[#ffdfa8] hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]' : 'bg-white/10 hover:bg-white/20 border-white/20 text-white hover:shadow-lg'}`}
              >
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
      {/* Social Section */}
<div 
  ref={socialSectionRef}
  className="flex flex-col items-center lg:items-end order-3 lg:order-3 relative"
>
  {/* Main Content */}
  <div className={`relative p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 ${isLight ? 'bg-white/80 border-amber-100 hover:border-amber-200 shadow-[0_12px_35px_rgba(0,0,0,0.08)]' : 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-white/10 hover:border-white/30'}`}>
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 text-center lg:text-right bg-clip-text text-transparent"
        style={{
          backgroundImage: isLight
            ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text'
        }}
    >
      Social
    </h2>
    <div className="flex justify-center gap-5 sm:gap-6 md:gap-8 items-center flex-wrap">
      {[
        { 
          href: "https://www.instagram.com/rafaa_ndl?igsh=MXVuenhyaHgzeGhjMw==", 
          src: "/img/instagram.png", 
          alt: "Instagram",
          glow: "purple",
          gradient: "from-purple-500 via-pink-500 to-orange-500"
        },
        { 
          href: "https://www.youtube.com/@iniakuraditt", 
          src: "/img/youtube.png", 
          alt: "YouTube",
          glow: "red",
          gradient: "from-red-500 via-red-600 to-pink-600"
        },
        { 
          href: "https://www.linkedin.com/in/rafaditya-syahputra-789809399/", 
          src: "/img/linkin.png", 
          alt: "LinkedIn", 
          glow: "blue",
          gradient: "from-blue-500 via-blue-600 to-cyan-500"
        },
      ].map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block group/social relative touch-manipulation active:scale-95"
          aria-label={social.alt}
        >
          {/* Subtle Glow on Hover */}
          <div className={`absolute -inset-2 rounded-full opacity-0 group-hover/social:opacity-40 transition-opacity duration-300 blur-lg bg-white/30`} />

          {/* Main Icon Container - Simplified */}
          <div className="relative transform transition-all duration-300 group-hover/social:scale-105">
            {/* Background Circle */}
            <div className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 rounded-full overflow-hidden shadow-xl transition-colors duration-300 flex items-center justify-center ${isLight ? 'bg-white hover:bg-amber-50 border border-amber-100' : 'bg-white/90 hover:bg-white'}`}>
              {/* Icon Image */}
              <img
                src={social.src}
                alt={social.alt}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 object-contain transition-transform duration-300 group-hover/social:scale-105"
                loading="lazy"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }}
              />
            </div>
          </div>

          {/* Tooltip - Desktop */}
          <div className="hidden sm:block absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/social:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30">
            <div className={`px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-lg ${isLight ? 'bg-white' : 'bg-white/90'}`}>
              <p className="text-black text-xs font-semibold">{social.alt}</p>
            </div>
            <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${isLight ? 'bg-white' : 'bg-white/90'}`} />
          </div>
          
          {/* Mobile Label */}
          <div className="sm:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-active/social:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
            <p className="text-black text-[10px] font-semibold whitespace-nowrap bg-white/90 px-2 py-1 rounded shadow-lg">{social.alt}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
    </div>
    </div>

      {/* Bottom section dengan copyright */}
      <div className="flex relative justify-center items-center mt-20 pb-8 z-20">
        <div className={`absolute -top-10 left-1/2 w-10/12 -translate-x-1/2 h-0.5 bg-gradient-to-r ${isLight ? 'from-transparent via-black/15 to-transparent' : 'from-transparent via-white/30 to-transparent'}`} />
        <h1 className="font-bold text-sm md:text-base tracking-wide bg-clip-text text-transparent"
            style={{
              backgroundImage: isLight
                ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)'
                : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text'
            }}
        >
          R'e • 2025
        </h1>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0; 
          }
          10% { opacity: 0.7; }
          50% { opacity: 1; }
          90% { opacity: 0.7; }
          100% { 
            transform: translateY(-100vh) translateX(50px); 
            opacity: 0; 
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes progressBar {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        @keyframes glitch-1 {
          0% {
            opacity: 0;
            transform: translate(0);
          }
          2% {
            opacity: 1;
            transform: translate(-2px, 2px);
          }
          4% {
            opacity: 0;
            transform: translate(0);
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes glitch-2 {
          0% {
            opacity: 0;
            transform: translate(0);
          }
          2% {
            opacity: 1;
            transform: translate(2px, -2px);
          }
          4% {
            opacity: 0;
            transform: translate(0);
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }

        .animate-glitch-1 {
          animation: glitch-1 0.3s infinite;
        }

        .animate-glitch-2 {
          animation: glitch-2 0.3s infinite;
          animation-delay: 0.15s;
        }

        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
      `}</style>
    </footer>
    </>
  );
};

export default Footer;