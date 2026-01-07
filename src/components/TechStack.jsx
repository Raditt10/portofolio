import React, { useEffect, useState, useMemo, useRef } from "react";

// Tech stack data with simpleicons CDN for reliable icon loading
const techstack = [
  {
    id: 1,
    name: "React",
    category: "Frontend",
    level: "Advanced",
    src: "https://cdn.simpleicons.org/react/61DAFB",
    color: "#61DAFB",
  },
  {
    id: 2,
    name: "Next.js",
    category: "Fullstack",
    level: "Advanced",
    src: "https://cdn.simpleicons.org/nextdotjs/000000",
    color: "#000000",
  },
  {
    id: 3,
    name: "TypeScript",
    category: "Language",
    level: "Advanced",
    src: "https://cdn.simpleicons.org/typescript/3178C6",
    color: "#3178C6",
  },
  {
    id: 4,
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Expert",
    src: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    color: "#06B6D4",
  },
  {
    id: 5,
    name: "Node.js",
    category: "Backend",
    level: "Advanced",
    src: "https://cdn.simpleicons.org/nodedotjs/339933",
    color: "#339933",
  },
  {
    id: 6,
    name: "MongoDB",
    category: "Database",
    level: "Intermediate",
    src: "https://cdn.simpleicons.org/mongodb/47A248",
    color: "#47A248",
  },
  {
    id: 7,
    name: "Git",
    category: "Tools",
    level: "Expert",
    src: "https://cdn.simpleicons.org/git/F05032",
    color: "#F05032",
  },
  {
    id: 8,
    name: "Docker",
    category: "DevOps",
    level: "Intermediate",
    src: "https://cdn.simpleicons.org/docker/2496ED",
    color: "#2496ED",
  },
  {
    id: 9,
    name: "AWS",
    category: "Cloud",
    level: "Intermediate",
    src: "https://logo.svgcdn.com/logos/aws.svg",
    color: "#FF9900",
  },
  {
    id: 10,
    name: "GraphQL",
    category: "Backend",
    level: "Intermediate",
    src: "https://cdn.simpleicons.org/graphql/E10098",
    color: "#E10098",
  },
  {
    id: 11,
    name: "Redux",
    category: "Frontend",
    level: "Advanced",
    src: "https://cdn.simpleicons.org/redux/764ABC",
    color: "#764ABC",
  },
  {
    id: 12,
    name: "Figma",
    category: "Design",
    level: "Intermediate",
    src: "https://cdn.simpleicons.org/figma/F24E1E",
    color: "#F24E1E",
  },
  {
    id: 13,
    name: "PostgreSQL",
    category: "Database",
    level: "Intermediate",
    src: "https://cdn.simpleicons.org/postgresql/4169E1",
    color: "#4169E1",
  },
  {
    id: 14,
    name: "Python",
    category: "Language",
    level: "Advanced",
    src: "https://cdn.simpleicons.org/python/3776AB",
    color: "#3776AB",
  },
  {
    id: 15,
    name: "Vue.js",
    category: "Frontend",
    level: "Intermediate",
    src: "https://cdn.simpleicons.org/vuedotjs/4FC08D",
    color: "#4FC08D",
  },
  {
    id: 16,
    name: "PHP",
    category: "Language",
    level: "Intermediate",
    src: "https://cdn.simpleicons.org/php/777BB4",
    color: "#777BB4",
  },
  {
    id: 17,
    name: "Laravel",
    category: "Backend",
    level: "Advanced",
    src: "https://cdn.simpleicons.org/laravel/FF2D20",
    color: "#FF2D20",
  },
];

const FALLBACK_PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><rect width='64' height='64' rx='12' fill='%23222'/><path d='M20 36h24v4H20zm0-8h24v4H20z' fill='%23fff' opacity='0.85'/></svg>";

// Level badges configuration
const levelBadges = {
  Expert: { color: "from-emerald-500 to-teal-600", text: "text-emerald-100" },
  Advanced: { color: "from-blue-500 to-cyan-600", text: "text-blue-100" },
  Intermediate: { color: "from-purple-500 to-indigo-600", text: "text-purple-100" },
};

const TechStack = () => {
  const [theme, setTheme] = useState("dark");
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const containerRef = useRef(null);
  
  const isLight = theme === "light";

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(techstack.map(t => t.category)));
    return ["All", ...cats];
  }, []);

  // Filter tech by category
  const filteredTech = useMemo(() => {
    if (selectedCategory === "All") return techstack;
    return techstack.filter(tech => tech.category === selectedCategory);
  }, [selectedCategory]);

  // Sync theme
  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current);
    };
    
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    
    return () => observer.disconnect();
  }, []);

  // Preconnect to CDNs
  useEffect(() => {
    const links = [
      'https://cdn.jsdelivr.net',
      'https://raw.githubusercontent.com',
      'https://unpkg.com'
    ].map((href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      document.head.appendChild(link);
      return link;
    });
    return () => links.forEach((link) => document.head.removeChild(link));
  }, []);

  // Enhanced filter style - keep grayscale on hover for monochrome
  const filterStyle = useMemo(() => ({
    filter: isLight
      ? "grayscale(1) brightness(0.9) contrast(1.1)"
      : "grayscale(1) brightness(0.9) contrast(1.1)",
    transition: "all 0.3s ease-in-out",
  }), [isLight]);

  return (
    <section
      className="relative min-h-screen px-4 sm:px-6 py-20 sm:py-28 overflow-hidden"
        style={{ fontFamily: "Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
      ref={containerRef}
    >
      {/* Background aligned with About - radial gradient only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div 
          className="absolute inset-0"
          style={{
            background: isLight
              ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 50%)'
              : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)'
          }}
        />
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 px-4 mb-8 sm:mb-12 md:mb-16">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent font-semibold text-center font-comic"
            style={{
              fontFamily: '"Sensei Biased", system-ui, sans-serif',
              backgroundImage: isLight
                ? 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            Tech Stack
          </h1>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? isLight
                    ? "bg-gray-500 text-white shadow-lg"
                    : "bg-gray-600 text-white shadow-lg"
                  : isLight
                    ? "bg-white/80 text-slate-700 hover:bg-gray-100 border border-slate-200"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {filteredTech.map((tech) => {
            const isHovered = hoveredId === tech.id;
            const badgeConfig = levelBadges[tech.level] || levelBadges.Intermediate;
            
            return (
              <div
                key={tech.id}
                className={`group relative flex flex-col items-center p-4 sm:p-5 backdrop-blur-xl rounded-2xl border transition-all duration-500 cursor-pointer ${
                  isLight
                    ? "bg-white/70 border-gray-300 hover:border-gray-400"
                    : "bg-gray-900/40 border-gray-700/30 hover:border-gray-600/50"
                }`}
                style={{
                  transform: isHovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
                onMouseEnter={() => setHoveredId(tech.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Hover Glow Effect - Removed */}

                {/* Card Background Pattern */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0" />

                {/* Icon Container */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4">
                  {/* Animated Ring */}
                  <div 
                    className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                      isHovered ? 'opacity-50 scale-110' : 'opacity-0 scale-95'
                    } ${isLight ? 'border-gray-400' : 'border-white/30'}`}
                    style={{
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                  
                  {/* Icon */}
                  <div className="relative z-10">
                    <img
                      src={tech.src}
                      alt={tech.name}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                      style={{
                        filter: isHovered 
                          ? 'grayscale(1) brightness(1.1) drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                          : filterStyle.filter,
                        transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                      }}
                      loading="lazy"
                      decoding="async"
                      width="80"
                      height="80"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.dataset.fallbackApplied) return;
                        img.dataset.fallbackApplied = 'true';
                        img.src = FALLBACK_PLACEHOLDER;
                        img.style.filter = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Tech Name */}
                <h3 className={`text-base sm:text-lg font-semibold text-center mb-2 transition-colors duration-300 ${
                  isLight ? 'text-slate-800' : 'text-white'
                }`}>
                  {tech.name}
                </h3>

                {/* Level Badge - Grayscale */}
                <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  isLight 
                    ? 'bg-gray-300 text-gray-800'
                    : 'bg-white/20 text-white'
                }`}>
                  {tech.level}
                </div>

                {/* Category */}
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} font-medium`}>
                  {tech.category}
                </p>

                {/* Hover Details */}
                <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                } ${
                  isLight 
                    ? 'bg-white text-slate-800 shadow-lg border border-slate-200'
                    : 'bg-gray-800 text-white shadow-xl border border-gray-700'
                }`}>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2" 
                    style={{
                      backgroundColor: isLight ? '#ffffff' : '#1f2937',
                      borderRight: `1px solid ${isLight ? '#e2e8f0' : '#374151'}`,
                      borderBottom: `1px solid ${isLight ? '#e2e8f0' : '#374151'}`,
                    }}
                  />
                  Click to explore projects
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 sm:mt-24">
          <div className={`text-center mb-8 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            <h3 className="text-2xl font-bold mb-2">Stack Overview</h3>
            <p className="text-sm">Total technologies across all categories</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: "Total Tech", value: techstack.length },
              { label: "Categories", value: categories.length - 1 },
              { label: "Years Experience", value: "2+" },
              { label: "Projects Built", value: "7+" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl backdrop-blur-sm border text-center ${
                  isLight
                    ? "bg-white/70 border-amber-100"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                  isLight ? "text-amber-600" : "text-white"
                }`}>
                  {stat.value}
                </div>
                <div className={`text-xs font-medium ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
      </div>
    </section>
  );
};

export default TechStack;