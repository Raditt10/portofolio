# Rafaditya Syahputra - Portfolio Website

A modern, interactive portfolio website for Rafaditya Syahputra, a Full Stack Developer showcasing projects, skills, education, and technical expertise with smooth animations and responsive design.

## 🛠 Built With

**Frontend Technologies**
- **React** - Component-based UI library
- **Framer Motion** - Modern animation library
- **GSAP** - Professional-grade animations
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **React Fast Marquee** - Smooth marquee animations

**Animation & Effects**
- GSAP Timeline - Sequential animations
- Framer Motion - Smooth component transitions
- Scroll Trigger - Scroll-based animations
- CSS Transforms - 3D effects
- Parallax Scrolling - Depth effects

**UI/UX Features**
- Responsive Design - Mobile-first approach
- Dark/Light Theme Toggle
- Smooth Page Transitions
- Interactive Components
- Optimized Performance

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx              # Landing section with intro
│   ├── Navbar.jsx            # Navigation bar
│   ├── About.jsx             # About section with marquee background
│   ├── Educations.jsx        # Education timeline
│   ├── TechStack.jsx         # Technology skills display
│   ├── Achievements.jsx      # Awards & certifications
│   ├── Gallery.jsx           # Project gallery
│   ├── Projects.jsx          # Featured projects
│   ├── Footer.jsx            # Footer section
│   └── assets/
│       ├── Modal.jsx         # Reusable modal
│       ├── CountUp.jsx       # Number counter animation
│       ├── SplitText.jsx     # Text split animation
│       └── ...
├── App.jsx
├── main.jsx
└── index.css
```

## 🎯 Key Features

✨ **Smooth Animations** - GSAP & Framer Motion powered effects
🎨 **Modern Design** - Clean, professional UI with gradients
📱 **Fully Responsive** - Works on mobile, tablet, and desktop
🌓 **Theme Toggle** - Dark and light mode support
⚙️ **Optimized Performance** - Prefers-reduced-motion support
🎭 **Interactive Elements** - Hover effects, modal dialogs
📊 **Tech Stack Showcase** - 19+ technologies displayed
🏆 **Achievements** - Certifications and competitions
📚 **Education Timeline** - Interactive journey visualization

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- pnpm or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Raditt10/Porto-React.git
cd Porto-React

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## 📦 Scripts

```bash
pnpm dev          # Start development server
pnpm run build    # Build for production
pnpm run preview  # Preview production build
pnpm run lint     # Run ESLint
```

## 🎨 Sections

### 🎯 Hero
- Dynamic role text cycling animation
- Static name "Rafaditya Syahputra"
- Scroll indicator
- GitHub link

### 📖 About
- Personal introduction
- Background marquee with tech stack icons
- Parallax scroll effect
- CV download button

### 🎓 Educations
- Timeline view of education history
- Paper plane animation tracker
- School logos
- Organizations/clubs involved

### 💻 Tech Stack
- 19 technologies displayed
- Category filtering
- Monochrome design (grayscale)
- Simpleicons CDN integration
- Responsive grid layout

### 🏆 Achievements
- Certifications display
- Competitions & awards
- Achievement cards

### 🎭 Gallery & Projects
- Interactive project showcase
- Lightbox viewer
- Responsive masonry layout

## 🎨 Customization

### Change Theme Colors
Edit Tailwind theme in `tailwind.config.js` or use CSS variables.

### Update Tech Stack
Edit `techstack` array in `TechStack.jsx`:

```jsx
const techstack = [
  {
    id: 1,
    name: "React",
    category: "Frontend",
    level: "Advanced",
    src: "https://cdn.simpleicons.org/react/61DAFB",
  },
  // Add more technologies...
];
```

### Modify Education Timeline
Edit `timelineData` array in `Educations.jsx` to add/remove education entries.

## 📱 Responsive Design

| Device | Layout | Features |
|--------|--------|----------|
| Mobile | Single column | Touch-optimized |
| Tablet | 2-column | Enhanced interactions |
| Desktop | Full layout | All animations |

## 🔧 Performance Optimizations

- Lazy loading for images
- Optimized GSAP animations
- Prefers-reduced-motion support
- Efficient re-renders with React
- Simpleicons CDN for reliable icon loading
- Minimal background gradients
- Removed heavy shadow effects

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- Email: iniakuraditt@gmail.com

## 🙏 Acknowledgments

- GSAP team for amazing animation library
- Framer Motion for modern animations
- Tailwind CSS for utility-first approach
- React community for inspiration
- Simpleicons for icon library

---

<div align="center">
⭐ Don't forget to star this repo if you found it helpful!

Made with ❤️ by Rafaditya Syahputra • 2025
</div>
