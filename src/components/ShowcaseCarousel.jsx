import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const stories = [
  {
    id: 1,
    badge: 'EdTech Success',
    quote: '"StudySwap reached 50,000 active students in 6 months."',
    description: 'StartupGuru helped us refine our core target audience and value proposition before spending heavily on digital marketing.',
    founder: 'Alex Rivera',
    title: 'Founder of StudySwap',
  },
  {
    id: 2,
    badge: 'FinTech Success',
    quote: '"Validated our Micro-Investment app in under 2 weeks."',
    description: 'The feasibility analysis gave us clarity on regulatory hurdles and helped us pivot early to a B2B SaaS model.',
    founder: 'Sarah Chen',
    title: 'Co-founder of PayPulse',
  },
  {
    id: 3,
    badge: 'HealthTech Success',
    quote: '"Secured seed funding with our validated roadmap."',
    description: 'Investors were impressed by the structured feasibility score and user demand data we gathered with StartupGuru.',
    founder: 'Marcus Vance',
    title: 'Founder of HealthFlow',
  },
];

const ShowcaseCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <div
      class="carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button class="carousel-btn prev-btn" onClick={prevSlide} aria-label="Previous Slide">
        <ChevronLeft size={22} />
      </button>

      <div class="carousel-track-container">
        <div
          class="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {stories.map((story) => (
            <div key={story.id} class="carousel-slide">
              <div class="slide-card">
                <div class="slide-badge">{story.badge}</div>
                <h3>{story.quote}</h3>
                <p>{story.description}</p>
                <div class="founder-info">
                  <strong>{story.founder}</strong> &bull; {story.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button class="carousel-btn next-btn" onClick={nextSlide} aria-label="Next Slide">
        <ChevronRight size={22} />
      </button>

      <div class="carousel-dots">
        {stories.map((_, index) => (
          <span
            key={index}
            class={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowcaseCarousel;
