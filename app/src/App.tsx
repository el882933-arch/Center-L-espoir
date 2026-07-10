import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import DataGrid from './sections/DataGrid';
import FloatingContext from './sections/FloatingContext';
import Manifesto from './sections/Manifesto';
import CustomCursor from './sections/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  return (
    <div
      style={{
        cursor: 'none',
      }}
      onMouseEnter={() => {
        document.body.style.cursor = 'none';
      }}
    >
      <CustomCursor />

      {/* Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '1.5rem 3vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mixBlendMode: 'difference',
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#ffffff',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
          onClick={(e) => {
            e.preventDefault();
            lenisRef.current?.scrollTo(0);
          }}
        >
          CENTER L'ESPOIR
        </a>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {[
            { label: 'Programs', href: '#formations' },
            { label: 'About', href: '#data' },
            { label: 'Contact', href: '#manifesto' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 500,
                color: '#ffffff',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                position: 'relative',
              }}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(item.href);
                if (target) {
                  lenisRef.current?.scrollTo(target as HTMLElement);
                }
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.opacity = '1';
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <DataGrid />
        <FloatingContext />
        <Manifesto />
      </main>

      {/* Hide default cursor globally */}
      <style>{`
        * { cursor: none !important; }
        @media (pointer: coarse) {
          * { cursor: auto !important; }
        }
      `}</style>
    </div>
  );
}

export default App;
