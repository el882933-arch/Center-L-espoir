import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MetricProps {
  value: string;
  label: string;
  index: number;
}

function AnimatedMetric({ value, label, index }: MetricProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          const digitEls = containerRef.current!.querySelectorAll('.digit-track');
          const chars = value.split('');

          digitEls.forEach((track, i) => {
            const char = chars[i];
            if (char >= '0' && char <= '9') {
              const targetDigit = parseInt(char);
              const digitHeight = track.parentElement!.clientHeight;

              gsap.to(track, {
                y: -targetDigit * digitHeight,
                duration: 2.5,
                ease: 'power4.out',
                delay: i * 0.2 + index * 0.15,
              });
            }
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [value, index]);

  const renderDigits = () => {
    return value.split('').map((char, i) => {
      if (char >= '0' && char <= '9') {
        return (
          <div
            key={i}
            style={{
              display: 'inline-block',
              height: '1em',
              overflow: 'hidden',
              verticalAlign: 'top',
              position: 'relative',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <div className="digit-track" style={{ display: 'flex', flexDirection: 'column' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                <span
                  key={d}
                  style={{
                    display: 'block',
                    height: '1em',
                    lineHeight: '1em',
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        );
      }
      return (
        <span
          key={i}
          style={{
            display: 'inline-block',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        border: '1px solid rgba(255,255,255,0.15)',
        padding: 'clamp(2rem, 4vw, 4rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          lineHeight: 1,
          color: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {renderDigits()}
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(0.875rem, 1.2vw, 1.1rem)',
          color: 'rgba(255,255,255,0.6)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </p>
    </div>
  );
}

const metrics = [
  { value: '98%', label: 'Success Rate' },
  { value: '12+', label: 'Years of Excellence' },
  { value: '2500+', label: 'Students Trained' },
  { value: '6', label: 'Core Disciplines' },
];

export default function DataGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.data-grid-title', {
        yPercent: 105,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from('.data-grid-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="data"
      style={{
        position: 'relative',
        background: '#111111',
        padding: 'clamp(6rem, 15vw, 15rem) 5vw',
        zIndex: 15,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 8rem)' }}>
          <div style={{ overflow: 'hidden' }}>
            <h2
              className="data-grid-title"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: 1.1,
              }}
            >
              Committed to high standards.
            </h2>
          </div>
          <p
            className="data-grid-subtitle"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '600px',
              margin: '1.5rem auto 0',
              lineHeight: 1.6,
            }}
          >
            At Center L'Espoir, we quantify success. Our curriculum is designed to deliver measurable outcomes, transforming students into highly skilled professionals.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.1)',
          }}
        >
          {metrics.map((metric, i) => (
            <AnimatedMetric
              key={metric.label}
              value={metric.value}
              label={metric.label}
              index={i}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(4rem, 8vw, 8rem)' }}>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.02em',
            }}
          >
            Driven by curiosity. Defined by results.
          </p>
        </div>
      </div>
    </section>
  );
}
