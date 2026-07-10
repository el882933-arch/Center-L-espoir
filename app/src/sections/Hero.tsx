import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const pathEl = document.getElementById('wave-path');
    if (!pathEl) return;
    const path = pathEl as unknown as SVGPathElement;

    let phase = 0;
    let animId: number;

    function updateWave(phase: number, scrollY: number) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const diagonal = Math.sqrt(width * width + height * height);
      const frequency = 0.01 + scrollY * 0.00005;
      const amplitude = 50 + scrollY * 0.1;
      let d = 'M 0 0';

      for (let x = 0; x <= diagonal; x += 5) {
        const y = height / 2 + Math.sin(x * frequency + phase) * amplitude;
        const rotation = (Math.PI / 4);
        const rx = x * Math.cos(rotation) - y * Math.sin(rotation);
        const ry = x * Math.sin(rotation) + y * Math.cos(rotation);
        d += ` L ${rx} ${ry}`;
      }
      path.setAttribute('d', d);
    }

    function animate() {
      phase += 0.02;
      updateWave(phase, window.scrollY);
      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    const words = titleRef.current.querySelectorAll('.word');
    words.forEach((word, i) => {
      gsap.from(word, {
        yPercent: 105,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.3 + i * 0.15,
      });
    });

    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        yPercent: 105,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.3 + words.length * 0.15 + 0.2,
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 10,
        background: '#111111',
      }}
    >
      {/* SVG Sine Wave */}
      <svg
        id="hero-svg"
        className="w-full h-full absolute inset-0 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <path
          id="wave-path"
          d=""
          fill="none"
          stroke="#22d3ee"
          strokeWidth="0.15"
          filter="url(#glow)"
        />
      </svg>

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <h1
          ref={titleRef}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(4rem, 8vw, 10rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.25em',
            overflow: 'hidden',
          }}
        >
          <span className="word" style={{ display: 'inline-block', overflow: 'hidden' }}>
            <span style={{ display: 'inline-block' }}>CENTER</span>
          </span>{' '}
          <span className="word" style={{ display: 'inline-block', overflow: 'hidden' }}>
            <span style={{ display: 'inline-block' }}>L'ESPOIR</span>
          </span>
        </h1>
        <div style={{ overflow: 'hidden' }}>
          <p
            ref={subtitleRef}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.05em',
            }}
          >
            Where ambition meets precision.
          </p>
        </div>
      </div>
    </section>
  );
}
