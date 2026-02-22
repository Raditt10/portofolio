import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
// UPDATE: Menambahkan import ikon sosial media dari lucide-react
import { Send, Check, AlertCircle, X, Mail, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    message: "", 
    isSubmitting: false
  });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === 'light';

  // EmailJS Config
  const EMAILJS_SERVICE_ID = "service_kkmzp89";
  const EMAILJS_TEMPLATE_ID = "template_gl1shr7"; 
  const EMAILJS_PUBLIC_KEY = "EG9qC9jkGx6_xS4cu";
  
  useEffect(() => {
    const updateTheme = () => {
      setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
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
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.message.trim()) {
      setToast({ show: true, message: "Please fill in all fields", type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
      return;
    }

    setFormData(prev => ({ ...prev, isSubmitting: true }));

    try {
      const templateParams = {
        to_email: "iniakuraditt@gmail.com",
        from_email: formData.email,
        user_message: formData.message, 
        reply_to: formData.email,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);

      playSuccessSound();
      setToast({ show: true, message: "Message sent successfully!", type: 'success' });
      setFormData({ email: "", message: "", isSubmitting: false });
      
      setTimeout(() => setToast({ show: false, message: '', type: '' }), 4500);
    } catch (error) {
      console.error("Error:", error);
      setToast({ show: true, message: 'Failed to send message.', type: 'error' });
      setFormData(prev => ({ ...prev, isSubmitting: false }));
      setTimeout(() => setToast({ show: false, message: '', type: '' }), 4500);
    }
  };

  // Data Social Media dengan komponen Ikon
  const socialLinks = [
    { 
      href: "https://www.instagram.com/rafaa_ndl?igsh=MXVuenhyaHgzeGhjMw==", 
      icon: <Instagram size={20} />, 
      label: "Instagram" 
    },
    { 
      href: "https://www.youtube.com/@iniakuraditt", 
      icon: <Youtube size={22} />, 
      label: "YouTube" 
    },
    { 
      href: "https://www.linkedin.com/in/rafaditya-syahputra-789809399/", 
      icon: <Linkedin size={20} />, 
      label: "LinkedIn" 
    },
  ];

  return (
    <footer id="contact" className="relative pt-24 pb-12 overflow-hidden scroll-mt-24 font-sans">
      
      {/* --- TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`fixed top-6 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border backdrop-blur-xl ${
                isLight 
                    ? "bg-white/90 border-gray-200 text-black" 
                    : "bg-black/90 border-white/20 text-white"
            }`}
          >
            {toast.type === 'success' ? (
                <div className={`p-1 rounded-full ${isLight ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <Check size={14} strokeWidth={3} />
                </div>
            ) : (
                <div className="p-1 rounded-full bg-red-500 text-white">
                    <AlertCircle size={14} strokeWidth={3} />
                </div>
            )}
            <span className="text-sm font-medium pr-2">{toast.message}</span>
            <button onClick={() => setToast({ show: false, message: '', type: '' })} className="opacity-50 hover:opacity-100">
                <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? 'bg-white' : 'bg-black'}`} />
        <div className="absolute inset-0 opacity-[0.05]" 
            style={{ 
                backgroundImage: `linear-gradient(${isLight ? '#000' : '#fff'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? '#000' : '#fff'} 1px, transparent 1px)`, 
                backgroundSize: '40px 40px' 
            }} 
        />
      </div>

      {/* --- SEPARATOR LINE --- */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* --- LEFT SECTION: Info & Social --- */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-12">
            
            {/* Logo Area */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <div className={`relative w-24 h-24 mx-auto lg:mx-0 rounded-2xl overflow-hidden border ${isLight ? 'border-gray-100' : 'border-white/10'}`}>
                    <img 
                        src="/img/meow.jpg" 
                        alt="Logo" 
                        className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-500"
                    />
                </div>
                <div>
                    <h2 className={`text-3xl font-bold mb-2 ${isLight ? 'text-black' : 'text-white'}`}>Let's Connect</h2>
                    <p className={`max-w-xs mx-auto lg:mx-0 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                        Have a project in mind? Let's build something extraordinary together.
                    </p>
                </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-colors ${
                    isLight 
                        ? 'bg-gray-50 border-gray-200 text-gray-800' 
                        : 'bg-white/5 border-white/10 text-gray-200'
                }`}
            >
                <Mail size={18} />
                <span className="font-mono text-sm">iniakuraditt@gmail.com</span>
            </motion.div>

            {/* Social Links (UPDATED: Menggunakan Lucide Icons) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
            >
                {socialLinks.map((social, idx) => (
                    <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 group ${
                            isLight 
                                ? 'border-gray-200 text-black hover:border-black hover:bg-black hover:text-white' 
                                : 'border-white/20 text-white hover:border-white hover:bg-white hover:text-black'
                        }`}
                    >
                        <div className="transition-transform duration-300 group-hover:scale-110">
                            {social.icon}
                        </div>
                    </a>
                ))}
            </motion.div>
          </div>

          {/* --- RIGHT SECTION: Form --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative p-8 rounded-3xl border ${
                isLight 
                    ? 'bg-white border-gray-100 shadow-2xl shadow-gray-100' 
                    : 'bg-white/5 border-white/5 shadow-2xl shadow-black/50'
            }`}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                        Your Email
                    </label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={formData.isSubmitting}
                        className={`w-full px-4 py-3 rounded-lg outline-none transition-all duration-300 border ${
                            isLight 
                                ? 'bg-gray-50 border-gray-200 text-black focus:border-black focus:bg-white' 
                                : 'bg-black/20 border-white/10 text-white focus:border-white/50 focus:bg-black/40'
                        }`}
                        placeholder="example@domain.com"
                    />
                </div>

                <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                        Message
                    </label>
                    <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={formData.isSubmitting}
                        maxLength={500}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg outline-none transition-all duration-300 resize-none border ${
                            isLight 
                                ? 'bg-gray-50 border-gray-200 text-black focus:border-black focus:bg-white' 
                                : 'bg-black/20 border-white/10 text-white focus:border-white/50 focus:bg-black/40'
                        }`}
                        placeholder="Tell me about your project..."
                    />
                    <div className={`text-xs text-right mt-2 ${isLight ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formData.message.length}/500
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={formData.isSubmitting}
                    className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                        isLight
                            ? 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-300'
                            : 'bg-white text-black hover:bg-gray-200 disabled:bg-gray-800 disabled:text-gray-500'
                    }`}
                >
                    {formData.isSubmitting ? (
                        <>
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message <Send size={16} />
                        </>
                    )}
                </button>
            </form>
          </motion.div>

        </div>

        {/* --- COPYRIGHT --- */}
        <div className="mt-20 pt-8 border-t border-dashed border-gray-200 dark:border-white/10 text-center">
            <p className={`text-sm font-medium ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                © 2025 Ra'e. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;