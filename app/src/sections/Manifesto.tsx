import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the word elements
      const words = sectionRef.current!.querySelectorAll('.word');
      words.forEach((word) => {
        const parent = word.parentElement;
        if (parent && parent.classList.contains('left')) {
          gsap.fromTo(
            word,
            { y: '150%' },
            {
              y: '-150%',
              duration: 8,
              ease: 'none',
              repeat: -1,
            }
          );
        } else if (parent && parent.classList.contains('right')) {
          gsap.fromTo(
            word,
            { y: '-150%' },
            {
              y: '150%',
              duration: 8,
              ease: 'none',
              repeat: -1,
            }
          );
        }
      });

      // Animate the scrolling lines
      const lines = gsap.utils.toArray<HTMLElement>('.manifesto-line');
      const wrap = gsap.utils.wrap(-7.5, 375);
      const xStart = window.innerWidth;

      lines.forEach((line, i) => {
        gsap.set(line, { x: xStart });
        gsap.to(line, {
          x: -2500,
          duration: 40,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(wrap),
          },
          delay: i * -2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lines = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div
      ref={sectionRef}
      id="manifesto"
      className="manifesto-wrapper"
      style={{
        position: 'relative',
        zIndex: 10,
        background: '#01257D',
        overflow: 'hidden',
      }}
    >
      {/* Fixed content with left/right skewed panels */}
      <div
        className="content"
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100vh',
          zIndex: 2,
          overflow: 'hidden',
        }}
      >
        <div
          className="left"
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffffff',
            transform: 'skewY(-5deg)',
            zIndex: 3,
            overflow: 'hidden',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div
              className="word"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              CENTER L'ESPOIR
            </div>
          </div>
        </div>
        <div
          className="right"
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#0a0a0a',
            background: '#01257D',
            transform: 'skewY(5deg)',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div
              className="word"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                color: 'rgba(0,0,0,0.3)',
              }}
            >
              CENTER L'ESPOIR
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling lines */}
      <div
        className="wrap"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {lines.map((i) => (
          <div
            key={i}
            className="manifesto-line"
            style={{
              position: 'absolute',
              top: `${5 + i * 4.5}%`,
              left: 0,
              transform: 'translateX(0) translateY(-50%) rotate(-5deg)',
            }}
          >
            <p
              className="manifesto-text"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(3rem, 10vw, 12rem)',
                whiteSpace: 'nowrap',
                background: '#01257D',
                padding: '0 2vw',
                color: 'rgba(255,255,255,0.08)',
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              EXCELLENCE EXCELLENCE EXCELLENCE
            </p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          padding: 'clamp(4rem, 8vw, 8rem) 5vw',
          textAlign: 'center',
          background: '#01257D',
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 400,
            color: '#ffffff',
            marginBottom: '2rem',
            lineHeight: 1.2,
          }}
        >
          Ready to begin your journey?
        </h2>
        <a
          href="#contact"
          style={{
            display: 'inline-block',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            fontWeight: 500,
            color: '#ffffff',
            background: '#D72323',
            padding: '1rem 3rem',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = '#b91c1c';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = '#D72323';
          }}
        >
          Join the next cohort
        </a>
      </div>

      {/* Footer */}
      <footer
        style={{
          position: 'relative',
          zIndex: 5,
          padding: 'clamp(3rem, 5vw, 5rem) 5vw',
          background: '#01257D',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '1.5rem',
              }}
            >
              Center L'Espoir
            </h4>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
              }}
            >
              Where ambition meets precision. Excellence in education since 2012.
            </p>
          </div>
          <div>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.5rem',
              }}
            >
              Programs
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Supplementary Hours', 'French', 'German', 'Spanish', 'Computer Science', 'Cybersecurity', 'Video Editing'].map(
                (item) => (
                  <li key={item} style={{ marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.6)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.color = '#22d3ee';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                      }}
                    >
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.5rem',
              }}
            >
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Email', value: 'contact@centerlespoir.ma' },
                { label: 'Phone', value: '+212 5XX-XXXXXX' },
                { label: 'Address', value: 'Your City, Morocco' },
              ].map((item) => (
                <li key={item.label} style={{ marginBottom: '1rem' }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.7rem',
                      color: 'rgba(255,255,255,0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            &copy; {new Date().getFullYear()} Center L'Espoir. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
