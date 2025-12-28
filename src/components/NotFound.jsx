import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const themeStyles = {
    dark: {
      bg: 'linear-gradient(135deg, #040507 0%, #0a0d12 50%, #050608 100%)',
      heading: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
      text: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
    },
    light: {
      bg: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #e0e7ff 100%)',
      heading: 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)',
      text: '#1f2937',
      secondary: 'rgba(51,65,85,0.75)',
    }
  };

  const navigate = useNavigate();
  return (
    <div
      style={{ 
        fontFamily: "Sora Variable",
        background: themeStyles[theme].bg,
        minHeight: "100vh",
      }}
      className="flex items-center justify-center px-6"
    >
      <div className="text-center max-w-2xl">
        {/* 404 */}
        <h1
          className="text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none mb-4"
          style={{
            background: themeStyles[theme].heading,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          404
        </h1>

        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          style={{ color: themeStyles[theme].text }}
        >
          Halaman Tidak Ditemukan
        </h2>

        {/* Description */}
        <p
          className="text-base sm:text-lg mb-8"
          style={{ color: themeStyles[theme].secondary }}
        >
          Sepertinya kamu nyasar ke galaksi lain...
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-gray-900 to-black rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
          style={{ cursor: 'pointer' }}
        >
          <svg 
            className="w-5 h-5"
            style={{ color: themeStyles[theme].text }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span 
            className="font-semibold"
            style={{ color: themeStyles[theme].text }}
          >
            Kembali lagi
          </span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;