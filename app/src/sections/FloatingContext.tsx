import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: 'supplementary',
    image: '/context_01.jpg',
    title: 'Supplementary Hours',
    subtitle: 'Soutien Scolaire',
    description:
      'Our supplementary academic support program provides targeted reinforcement in core subjects. Students receive personalized attention from experienced educators, ensuring they master fundamental concepts and excel in their studies. Small group sessions allow for interactive learning and immediate feedback.',
    details: ['Mathematics', 'Physics & Chemistry', 'Biology', 'Philosophy'],
  },
  {
    id: 'languages',
    image: '/context_02.jpg',
    title: 'Modern Languages',
    subtitle: 'Langues Modernes',
    description:
      'Immerse yourself in the beauty of global communication. Our language programs go beyond grammar and vocabulary—we cultivate cultural fluency. Whether you aspire to study in France, work in Germany, or explore Latin America, our certified instructors will guide you to mastery.',
    details: ['French (DELF/DALF)', 'German (Goethe)', 'Spanish (DELE)'],
  },
  {
    id: 'digital',
    image: '/context_03.jpg',
    title: 'Digital Sciences',
    subtitle: 'Sciences Digitales',
    description:
      'Step into the future with our cutting-edge digital programs. From foundational computer science to advanced cybersecurity and creative video editing, we equip you with the technical skills demanded by the modern workforce. Hands-on projects and real-world applications are at the core of every course.',
    details: ['Computer Science', 'Cybersecurity Bootcamp', 'Video Editing & Motion Design'],
  },
];

export default function FloatingContext() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardImageRef = useRef<HTMLImageElement>(null);
  const cardTextRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const sectionEls = gsap.utils.toArray<HTMLElement>('.context-section');

      sectionEls.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            setActiveIndex(i);
            if (cardImageRef.current) {
              gsap.to(cardImageRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                  cardImageRef.current!.src = sections[i].image;
                  gsap.to(cardImageRef.current!, { opacity: 1, duration: 0.3 });
                },
              });
            }
            if (cardTextRef.current) {
              gsap.fromTo(
                cardTextRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, overwrite: true }
              );
            }
          },
          onEnterBack: () => {
            setActiveIndex(i);
            if (cardImageRef.current) {
              gsap.to(cardImageRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                  cardImageRef.current!.src = sections[i].image;
                  gsap.to(cardImageRef.current!, { opacity: 1, duration: 0.3 });
                },
              });
            }
            if (cardTextRef.current) {
              gsap.fromTo(
                cardTextRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, overwrite: true }
              );
            }
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="formations"
      style={{
        position: 'relative',
        background: '#111111',
        zIndex: 20,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: 'clamp(6rem, 10vw, 10rem) 5vw clamp(3rem, 5vw, 5rem)',
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 1.1,
          }}
        >
          Languages &amp; Formations
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '1rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Scroll to explore our programs
        </p>
      </div>

      <div
        ref={wrapperRef}
        className="context-wrapper"
        style={{
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* Left: Sticky Card */}
        <div
          className="context-card"
          style={{
            position: 'sticky',
            top: '20vh',
            width: '40vw',
            height: '60vh',
            flexShrink: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '75%', overflow: 'hidden' }}>
            <img
              ref={cardImageRef}
              src={sections[0].image}
              alt={sections[activeIndex].title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to top, #111111, transparent)',
              }}
            />
          </div>
          <div
            ref={cardTextRef}
            style={{
              padding: '1.5rem 2rem',
              background: '#111111',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.25rem',
              }}
            >
              {sections[activeIndex].title}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {sections[activeIndex].subtitle}
            </p>
          </div>
        </div>

        {/* Right: Scrolling Sections */}
        <div
          className="context-sections"
          style={{
            width: '50vw',
            marginLeft: 'auto',
            paddingRight: '5vw',
          }}
        >
          {sections.map((section) => (
            <div
              key={section.id}
              className="context-section"
              data-image={section.image}
              style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 'clamp(3rem, 5vw, 5rem) 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                }}
              >
                {section.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '2rem',
                }}
              >
                {section.subtitle}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.7,
                  maxWidth: '500px',
                  marginBottom: '2.5rem',
                }}
              >
                {section.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {section.details.map((detail) => (
                  <span
                    key={detail}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: '#22d3ee',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                      padding: '0.5rem 1rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout - Only visible below 768px */}
      <style>{`
        @media (max-width: 768px) {
          .context-wrapper {
            flex-direction: column !important;
          }
          .context-card {
            position: relative !important;
            top: 0 !important;
            width: 100% !important;
            height: 50vh !important;
            margin-bottom: 2rem;
          }
          .context-sections {
            width: 100% !important;
            margin-left: 0 !important;
            padding: 0 5vw !important;
          }
        }
      `}</style>
    </section>
  );
}
