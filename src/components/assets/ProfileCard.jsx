import React, { useEffect, useRef, useCallback, useMemo, useState } from "react";
import "./ProfileCard.css";

const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
};

const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const round = (value, precision = 3) =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value,
  fromMin,
  fromMax,
  toMin,
  toMax
) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent = ({
  avatarUrl = "<Placeholder for avatar URL>",
  iconUrl = "<Placeholder for icon URL>",
  grainUrl = "<Placeholder for grain URL>",
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;

    const updateCardTransform = (
      offsetX,
      offsetY,
      card,
      wrap
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (
      duration,
      startX,
      startY,
      card,
      wrap
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers]
  );

  const handleDeviceOrientation = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const { beta, gamma } = event;
      if (!beta || !gamma) return;

      animationHandlers.updateCardTransform(
        card.clientHeight / 2 + gamma * mobileTiltSensitivity,
        card.clientWidth / 2 + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        card,
        wrap
      );
    },
    [animationHandlers, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap) return;

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;
    const deviceOrientationHandler = handleDeviceOrientation;

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== 'https:') return;
      if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
        window.DeviceMotionEvent
          .requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(err => console.error(err));
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };

    card.addEventListener("pointerenter", pointerEnterHandler);
    card.addEventListener("pointermove", pointerMoveHandler);
    card.addEventListener("pointerleave", pointerLeaveHandler);
    card.addEventListener("click", handleClick);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", pointerEnterHandler);
      card.removeEventListener("pointermove", pointerMoveHandler);
      card.removeEventListener("pointerleave", pointerLeaveHandler);
      card.removeEventListener("click", handleClick);
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      animationHandlers.cancelAnimation();
    };
  }, [
    enableTilt,
    enableMobileTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation,
  ]);

  const cardStyle = useMemo(
    () =>
    ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--behind-gradient": showBehindGradient
        ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT)
        : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
    }),
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  // Local state for expanded info overlay
  const [expanded, setExpanded] = useState(false);
  const openInfo = useCallback((e) => {
    // prevent click from bubbling to the card (which may trigger device permission handler)
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    setExpanded(true);
  }, []);
  const closeInfo = useCallback((e) => {
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    setExpanded(false);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper profile-glass-luxury ${className}`.trim()}
      style={cardStyle}
    >
      <section ref={cardRef} className="pc-card profile-glass-luxury-inner">
        <div className="pc-inside">
          {/* Animated Gradient Border */}
          <div className="profile-animated-border"></div>
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-content pc-avatar-content">
            <div
              className="profile-avatar-wrapper"
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={e => e.currentTarget.classList.add('hovered')}
              onMouseLeave={e => e.currentTarget.classList.remove('hovered')}
            >
              <img
                className="avatar profile-avatar-luxury"
                src={avatarUrl}
                alt={`${name || "User"} avatar`}
                loading="lazy"
                onError={(e) => {
                  const target = e.target;
                  target.style.display = "none";
                }}
                onClick={(e) => openInfo(e)}
              />
              {/* Anime Glow & Sparkle Badge */}
              <span className="profile-glow-badge-anime" style={{
                position: 'absolute',
                right: 4,
                bottom: 4,
                width: 28,
                height: 28,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}>
                {/* Aura Glow */}
                <span className="profile-anime-aura"></span>
                {/* Sparkle Stars */}
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`profile-anime-sparkle sparkle-${i}`}></span>
                ))}
                {/* Inti badge */}
                <span style={{
                  position: 'relative',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fff 60%, #38bdf8 100%)',
                  boxShadow: '0 0 8px 2px #fff, 0 0 16px 4px #38bdf8',
                  opacity: 0.98,
                  border: '2px solid #a21caf',
                }}></span>
              </span>
            </div>
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    <img
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name || "User"} mini avatar`}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target;
                        target.style.opacity = "0.5";
                        target.src = avatarUrl;
                      }}
                    />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle font-semibold text-lg text-white/90">@{handle}</div>
                    <div className="pc-status text-xs text-cyan-300 font-medium">{status}</div>
                  </div>
                </div>
                <a href="https://www.instagram.com/rafaa_ndl?igsh=MXVuenhyaHgzeGhjMw==" target="_blank" rel="noopener noreferrer">
                  <button
                    className="pc-contact-btn profile-contact-luxury"
                    onClick={handleContactClick}
                    style={{ pointerEvents: "auto" }}
                    type="button"
                    aria-label={`Contact ${name || "user"}`}
                  >
                    {contactText}
                  </button>
                </a>
              </div>
            )}
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h3 className="font-bold text-2xl text-white/95 mb-1 tracking-wide profile-name-luxury">{name}</h3>
              <p className="text-cyan-200 text-base font-medium mb-2 profile-title-luxury">{title}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Info overlay shown when avatar is clicked */}
      {expanded && (
        <div
          className="pc-info-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={closeInfo}
          role="dialog"
          aria-modal="true"
          aria-label="About me"
        >
          <div
            className="bg-gradient-to-br from-gray-900/90 to-black/80 rounded-2xl p-6 max-w-lg w-[92%] mx-4 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1 profile-name-luxury">{name}</h2>
                <p className="text-cyan-300 mb-3 profile-title-luxury">{title}</p>
                <p className="text-sm text-gray-300 mb-4">I&apos;m a front-end developer focusing on building interactive, accessible, and performant user interfaces. I enjoy working with React, Tailwind CSS, and modern animation libraries.</p>
                <div className="flex gap-3 items-center">
                  <a href="https://github.com/raditt10" target="_blank" rel="noopener noreferrer" className="text-sm px-3 py-2 bg-white/5 rounded-md hover:bg-cyan-500/20 transition">GitHub</a>
                  <a href="https://www.instagram.com/rafaa_ndl" target="_blank" rel="noopener noreferrer" className="text-sm px-3 py-2 bg-white/5 rounded-md hover:bg-pink-500/20 transition">Instagram</a>
                  <a href="mailto:example@example.com" className="text-sm px-3 py-2 bg-white/5 rounded-md hover:bg-emerald-500/20 transition">Email</a>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button onClick={closeInfo} aria-label="Close" className="text-gray-300 hover:text-white bg-white/5 p-2 rounded-md">✕</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;
