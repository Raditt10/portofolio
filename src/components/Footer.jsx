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
  const glowRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    email: "",
    message: "", 
    isSubmitting: false
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const EMAILJS_SERVICE_ID = "service_kkmzp89";
  const EMAILJS_TEMPLATE_ID = "template_gl1shr7"; 
  const EMAILJS_PUBLIC_KEY = "EG9qC9jkGx6_xS4cu";
  
  const fullText = "Front-End Developer & UI/UX Designer";

  // Typing effect with glitch (desktop only)
  useEffect(() => {
    // Check if mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768;
    
    // If mobile, show full text immediately without animation
    if (isMobile) {
      setTypedText(fullText);
      setIsTyping(false);
      return;
    }

    // Desktop typing animation
    let currentIndex = 0;
    let typingInterval;
    let glitchInterval;

    const typeText = () => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        
        // Random glitch effect after typing
        glitchInterval = setInterval(() => {
          const shouldGlitch = Math.random() > 0.7;
          if (shouldGlitch) {
            const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
            const randomPos = Math.floor(Math.random() * fullText.length);
            const glitchedText = 
              fullText.substring(0, randomPos) + 
              glitchChars[Math.floor(Math.random() * glitchChars.length)] + 
              fullText.substring(randomPos + 1);
            setTypedText(glitchedText);
            
            setTimeout(() => {
              setTypedText(fullText);
            }, 50);
          }
        }, 3000);
      }
    };

    typingInterval = setInterval(typeText, 100);

    return () => {
      clearInterval(typingInterval);
      if (glitchInterval) clearInterval(glitchInterval);
    };
  }, []); 

  // Mouse tracking untuk glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const footer = footerRef.current;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      opacity: 0,
      y: 50
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(line, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(logoSection, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.2)"
    }, "-=0.4")
    .to(contactSection, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(socialSection, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.2)"
    }, "-=0.4")
    .to(form, {
      opacity: 1,
      y: 0,
      duration: 0.8,
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
        <div className="fixed top-6 right-6 z-[10000] animate-slideInRight">
          <div className={`relative px-6 py-4 rounded-xl backdrop-blur-xl border shadow-2xl min-w-[320px] max-w-md ${
            toast.type === 'success' 
              ? 'bg-gradient-to-r from-emerald-900/90 to-green-900/90 border-emerald-500/50 shadow-emerald-500/20' 
              : 'bg-gradient-to-r from-red-900/90 to-rose-900/90 border-red-500/50 shadow-red-500/20'
          }`}>
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-xl blur-xl opacity-50 ${
              toast.type === 'success' ? 'bg-emerald-500/30' : 'bg-red-500/30'
            }`} />
            
            {/* Content */}
            <div className="relative flex items-start gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                toast.type === 'success' ? 'bg-emerald-500/20' : 'bg-red-500/20'
              }`}>
                {toast.type === 'success' ? (
                  <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              
              {/* Message */}
              <div className="flex-1">
                <h4 className={`font-semibold text-sm mb-1 ${
                  toast.type === 'success' ? 'text-emerald-100' : 'text-red-100'
                }`}>
                  {toast.type === 'success' ? 'Success!' : 'Error'}
                </h4>
                <p className={`text-sm ${
                  toast.type === 'success' ? 'text-emerald-200/90' : 'text-red-200/90'
                }`}>
                  {toast.message}
                </p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setToast({ show: false, message: '', type: '' })}
                className={`flex-shrink-0 p-1 rounded-lg transition-colors ${
                  toast.type === 'success' 
                    ? 'hover:bg-emerald-500/20 text-emerald-300' 
                    : 'hover:bg-red-500/20 text-red-300'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className={`absolute bottom-0 left-0 h-1 rounded-b-xl ${
              toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
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
        className="relative min-h-screen overflow-hidden py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-black"
        style={{ fontFamily: "Sora Variable" }}
      >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Mouse Glow Effect */}
      <div 
        ref={glowRef}
        className="absolute pointer-events-none z-10 transition-opacity duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: mousePosition.x > 0 ? 1 : 0
        }}
      />

      {/* Top line dengan efek cyberpunk */}
      <div 
        ref={lineRef}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60"
        style={{
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
        }}
      />

      {/* Footer content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-12 lg:gap-8 pt-12 sm:pt-16 md:pt-20 max-w-7xl mx-auto relative z-20">
        
        {/* Logo Section */}
        <div 
          ref={logoSectionRef}
          className="flex flex-col items-center lg:items-start order-1 lg:order-1 group relative"
        >
          {/* Cyberpunk border effect */}
          <div className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden">
            <div 
              className="absolute inset-[-2px] rounded-2xl opacity-70"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
                  linear-gradient(180deg, transparent 95%, #06b6d4 100%)
                `,
                backgroundSize: '20px 20px',
                animation: 'gridMove 2s linear infinite'
              }}
            />
          </div>

         <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-300">
  {/* Cyberpunk Frame untuk Gambar */}
  <div className="relative inline-block group/img">
    {/* Outer Glow Effect */}
    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-purple-600/30 to-cyan-500/30 blur-xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"></div>
    
    {/* Animated Border Frame */}
    <div className="absolute -inset-2 rounded-xl overflow-hidden opacity-0 group-hover/img:opacity-100 transition-all duration-700">
      <div 
        className="absolute inset-0 rounded-xl opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
            linear-gradient(180deg, transparent 95%, #06b6d4 100%)
          `,
          backgroundSize: '15px 15px',
          animation: 'gridMove 1.5s linear infinite'
        }}
      />
      
      {/* Rotating Corner Brackets */}
      <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-cyan-400 animate-spin" style={{animationDuration: '3s'}} />
      <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-purple-400 animate-spin" style={{animationDuration: '3s', animationDelay: '0.5s'}} />
      <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-purple-400 animate-spin" style={{animationDuration: '3s', animationDelay: '1s'}} />
      <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-cyan-400 animate-spin" style={{animationDuration: '3s', animationDelay: '1.5s'}} />
      
      {/* Scanning Lines */}
      <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan rounded-full" style={{animationDuration: '2s'}} />
      <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan rounded-full" style={{animationDuration: '2s', animationDelay: '1s', top: '30%'}} />
    </div>

    {/* Main Image Container */}
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-900/50 to-cyan-900/50 backdrop-blur-sm">
      {/* Inner Glow */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"></div>
      
      {/* Holographic Effect Overlay */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover/img:opacity-30 transition-opacity duration-500 mix-blend-overlay bg-gradient-to-br from-purple-400 via-transparent to-cyan-400"></div>
      
      {/* The Image - NO PADDING, FULL COVERAGE */}
      <img
        src="/img/meow.jpg"
        loading="lazy"
        className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-lg transition-all duration-500 group-hover/img:scale-110 group-hover/img:rotate-1 filter group-hover/img:brightness-110 group-hover/img:contrast-110 drop-shadow-2xl z-10 object-cover block"
        alt="LOGO RS"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
          margin: 0,
          padding: 0
        }}
      />
      
      {/* Floating Particles around image */}
      <div className="absolute -inset-2 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-0 group-hover/img:opacity-100"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 15)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>
    </div>

    {/* Pulse Ring Effect */}
    <div className="absolute inset-0 rounded-lg border-2 border-transparent opacity-0 group-hover/img:opacity-100 group-hover/img:border-cyan-400/50 transition-all duration-1000 animate-pulse"></div>
        </div>

        <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl mt-4 sm:mt-5 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent group-hover:animate-pulse transition-all duration-300">
          R'e 
        </h3>
        <div className="relative mt-2 sm:mt-3 min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem]">
          <h4 className="text-cyan-300 font-medium text-sm sm:text-base md:text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-2 relative">
            {/* Main Text with Typing Effect */}
            <span className="relative inline-block">
              {typedText}
              {/* Cursor */}
              {isTyping && (
                <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-cyan-400 ml-1 animate-pulse" />
              )}
              
              {/* Glitch Layers */}
              <span 
                className="absolute top-0 left-0 text-purple-500 opacity-0 pointer-events-none animate-glitch-1"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
              >
                {typedText}
              </span>
              <span 
                className="absolute top-0 left-0 text-cyan-500 opacity-0 pointer-events-none animate-glitch-2"
                style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
              >
                {typedText}
              </span>
              
              {/* Scanline Effect */}
              <span className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scanline pointer-events-none" />
            </span>
          </h4>
        </div>

        {/* Additional floating elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500 delay-300"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500 delay-500" style={{animationDelay: '0.3s'}}></div>
      </div>
              </div>

        {/* Contact Section */}
        <div 
          ref={contactSectionRef}
          className="flex flex-col items-center lg:items-center order-2 lg:order-2 w-full lg:w-auto max-w-md lg:max-w-none"
        >
          {/* Contact Info */}
          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Contact
            </h2>
            <div className="flex gap-3 items-center justify-center p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30">
              <img
                src="/img/email.png"
                alt="Email icon"
                className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 filter brightness-0 invert"
              />
              <h3 className="text-cyan-300 text-sm sm:text-base md:text-lg font-mono">
                iniakuraditt@gmail.com
              </h3>
            </div>
          </div>

          {/* Collaboration Form */}
          <div className="flex flex-col items-center text-center w-full">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 lg:mb-7 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
              className="flex flex-col w-full lg:w-auto items-center gap-4 relative group"
            >
              {/* Form cyberpunk border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden pointer-events-none">
                <div 
                  className="absolute inset-[-2px] rounded-2xl opacity-70"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
                      linear-gradient(180deg, transparent 95%, #06b6d4 100%)
                    `,
                    backgroundSize: '20px 20px',
                    animation: 'gridMove 2s linear infinite'
                  }}
                />
              </div>

              {/* Email Input */}
              <div className="relative w-full">
                <input
                  className="bg-gray-900/80 backdrop-blur-sm w-full sm:w-80 md:w-96 h-12 sm:h-14 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm md:text-base border border-gray-600/50 focus:border-purple-500 transition-all duration-300 placeholder-gray-400"
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={formData.isSubmitting}
                />
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse" />
                </div>
              </div>
              
              {/* Message Textarea */}
              <div className="relative w-full">
                <textarea
                  className="bg-gray-900/80 backdrop-blur-sm w-full sm:w-80 md:w-96 h-24 sm:h-28 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm md:text-base border border-gray-600/50 focus:border-purple-500 transition-all duration-300 resize-none placeholder-gray-400"
                  name="message"
                  placeholder="Tell me about your project or collaboration idea..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={formData.isSubmitting}
                  maxLength={500}
                />
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
                </div>
              </div>
              
              <div className="text-gray-400 text-xs text-right w-full sm:w-80 md:w-96">
                {formData.message.length}/500 characters
              </div>

              <button
                type="submit"
                disabled={formData.isSubmitting}
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-sm md:text-base whitespace-nowrap px-8 sm:px-10 py-3 sm:py-4 rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mt-2 group/btn"
                style={{
                  boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
                }}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                
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
  className="flex flex-col items-center lg:items-end order-3 lg:order-3 group relative"
>
  {/* Cyberpunk border effect */}
  <div className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden">
    <div 
      className="absolute inset-[-2px] rounded-2xl opacity-70"
      style={{
        backgroundImage: `
          linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
          linear-gradient(180deg, transparent 95%, #06b6d4 100%)
        `,
        backgroundSize: '20px 20px',
        animation: 'gridMove 2s linear infinite'
      }}
    />
    {/* Scanning Lines */}
    <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan rounded-full" />
    <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-scan-horizontal rounded-full" style={{animationDuration: '3s'}} />
    
    {/* Pulsing Corner Brackets */}
    <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-cyan-400 animate-pulse" />
    <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-purple-400 animate-pulse" style={{animationDelay: '0.3s'}} />
    <div className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-purple-400 animate-pulse" style={{animationDelay: '0.6s'}} />
    <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-cyan-400 animate-pulse" style={{animationDelay: '0.9s'}} />
  </div>

  {/* Main Content */}
  <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-300">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 text-center lg:text-right bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
          href: "https://github.com/Raditt10", 
          src: "/img/github.png", 
          alt: "GitHub", 
          glow: "blue",
          gradient: "from-blue-500 via-cyan-500 to-teal-500"
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
          <div className={`absolute -inset-2 rounded-full opacity-0 group-hover/social:opacity-60 group-active/social:opacity-60 transition-all duration-300 blur-lg bg-gradient-to-r ${social.gradient}`} />

          {/* Main Icon Container */}
          <div className="relative transform transition-all duration-300 group-hover/social:scale-110 group-active/social:scale-105" style={{transformStyle: 'preserve-3d'}}>
            {/* Outer Decorative Ring - Always Visible */}
            <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${social.gradient} opacity-30 animate-spin-slow blur-sm`} style={{animationDuration: '10s'}} />
            
            {/* Pulsing Outer Glow - Always Visible */}
            <div className={`absolute -inset-2 rounded-full bg-gradient-to-r ${social.gradient} opacity-15 animate-pulse blur-md`} />
            
            {/* Background Circle with Gradient - NO BORDER */}
            <div className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden shadow-xl transition-all duration-300`}>
              {/* Animated Gradient Background - Always Visible */}
              <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-25 group-hover/social:opacity-40 transition-opacity duration-300 animate-pulse`} style={{animationDuration: '3s'}} />
              
              {/* Glass Effect with Gradient Tint */}
              <div className={`absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-sm`} />
              
              {/* Rotating Border Accent - Always Visible */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className={`absolute -inset-[100%] bg-gradient-to-r ${social.gradient} opacity-25 animate-spin`} style={{animationDuration: '4s'}} />
              </div>
              
              {/* Icon Image with Enhanced Styling - NO GRID, NO CORNER ACCENTS, NO INNER RING */}
              <div className="absolute inset-0 p-2.5 sm:p-3 flex items-center justify-center z-10">
                <div className="relative w-full h-full">
                  {/* Icon Glow Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-15 rounded-lg blur-sm`} />
                  
                  <img
                    src={social.src}
                    alt={social.alt}
                    className="relative w-full h-full object-contain transition-all duration-300 group-hover/social:brightness-105 group-hover/social:scale-105"
                    loading="lazy"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                      transform: 'translateZ(5px)'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Floating Particles - Reduced */}
            <div className="absolute -inset-2 pointer-events-none opacity-0 group-hover/social:opacity-100 transition-opacity duration-300">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full animate-float bg-gradient-to-r ${social.gradient}`}
                  style={{
                    left: `${25 + (i * 25)}%`,
                    top: `${20 + (i * 20)}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2.5 + i * 0.5}s`
                  }}
                />
              ))}
            </div>
            
            {/* Starfield Effect - Reduced */}
            <div className="absolute inset-0 opacity-0 group-hover/social:opacity-60 transition-opacity duration-300 overflow-hidden rounded-full pointer-events-none">
              <div className="absolute top-2 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
              <div className="absolute bottom-2 right-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
            </div>
          </div>

          {/* Tooltip - Desktop */}
          <div className="hidden sm:block absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/social:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30">
            <div className={`px-3 py-1.5 bg-gradient-to-r ${social.gradient} rounded-lg backdrop-blur-sm shadow-lg`}>
              <p className="text-white text-xs font-semibold drop-shadow-lg">{social.alt}</p>
            </div>
            <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r ${social.gradient} rotate-45`} />
          </div>
          
          {/* Mobile Label */}
          <div className="sm:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-active/social:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
            <p className={`text-white text-[10px] font-semibold whitespace-nowrap bg-gradient-to-r ${social.gradient} px-2 py-1 rounded shadow-lg`}>{social.alt}</p>
          </div>
        </a>
      ))}
    </div>
  </div>

      {/* Floating elements */}
      <div className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500 delay-200"></div>
      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500 delay-400" style={{animationDelay: '0.2s'}}></div>
    </div>

    <style jsx>{`
      @keyframes scan-horizontal {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }
      .animate-scan-horizontal {
        animation: scan-horizontal 4s linear infinite;
      }
    `}</style>
      </div>

      {/* Bottom section dengan copyright */}
      <div className="flex relative justify-center items-center mt-20">
        <div className="absolute -top-10 left-1/2 w-10/12 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40" />
        <h1 className="font-bold text-sm md:text-base tracking-wide bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
          R'e • 2025
        </h1>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10"></div>

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