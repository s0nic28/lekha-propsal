import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrame: number;
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      dotX = mouseX;
      dotY = mouseY;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = dotX + 'px';
        dotRef.current.style.top = dotY + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top = ringY + 'px';
      }
      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animFrame = requestAnimationFrame(animate);

    // Hover effect on interactive elements
    const handleEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '56px';
        ringRef.current.style.height = '56px';
        ringRef.current.style.borderColor = 'rgba(181,158,232,0.9)';
      }
    };
    const handleLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.borderColor = 'rgba(201,184,240,0.6)';
      }
    };

    const interactives = document.querySelectorAll('button, a, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
