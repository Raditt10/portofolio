import React, { useEffect, useRef, useState } from 'react';

// Simple viewport-aware mount wrapper that only renders children
// once its placeholder enters the viewport. Helps defer below-the-fold
// bundles and cut initial JS bytes.
export default function LazyMount({ children, height = 500, rootMargin = '400px' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || isVisible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  if (!isVisible) {
    return <div ref={ref} style={{ minHeight: height }} />;
  }
  return <>{children}</>;
}
