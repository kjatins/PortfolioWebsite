import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mousePosRef = useRef({ x: -100, y: -100 });
  const followerPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            'a, button, [role="button"], [data-framer-name="Link"], [data-framer-name="Menu button"], .cursor-pointer, .framer-1y832nb, .framer-1apfpzf, .framer-3jicop, .framer-ANnBW, .framer-i3ngA, .framer-xJIGr, .framer-kKXVO, .framer-VpOHf, .framer-O2MOq, .framer-jILoP, input, textarea, select, [tabindex]'
          )
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth fluid lerp animation loop for the blending circle
    const animate = () => {
      const targetX = mousePosRef.current.x;
      const targetY = mousePosRef.current.y;

      followerPosRef.current.x += (targetX - followerPosRef.current.x) * 0.22;
      followerPosRef.current.y += (targetY - followerPosRef.current.y) * 0.22;

      setFollowerPos({
        x: followerPosRef.current.x,
        y: followerPosRef.current.y,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999999] rounded-full will-change-transform"
      style={{
        left: `${followerPos.x}px`,
        top: `${followerPos.y}px`,
        width: isHovered ? '56px' : '26px',
        height: isHovered ? '56px' : '26px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
        mixBlendMode: 'difference',
        transition: 'width 0.2s cubic-bezier(0.25, 1, 0.5, 1), height 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    />
  );
};

