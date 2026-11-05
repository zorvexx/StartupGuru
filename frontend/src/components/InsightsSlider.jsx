import React, { useState } from 'react';

const TIPS = [
    {
        title: '💡 1. Validate Pain Points Early',
        description: 'Interview at least 10 real potential users before writing code. Confirm people actively desire a solution.'
    },
    {
        title: '🎯 2. Focus on a Clear Niche',
        description: 'Never attempt to build for everyone at once. Solve a specific bottleneck for a well-defined group first.'
    },
    {
        title: '⚡ 3. Keep the MVP Lean',
        description: 'Your Minimum Viable Product should center on one core feature delivering unambiguous value from day one.'
    },
    {
        title: '📊 4. Know Your Unit Economics',
        description: 'Ensure Customer Acquisition Cost (CAC) remains well below Lifetime Value (LTV) for long-term health.'
    }
];

export default function InsightsSlider() {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((prevIdx) => (prevIdx === 0 ? TIPS.length - 1 : prevIdx - 1));
    const next = () => setCurrent((prevIdx) => (prevIdx === TIPS.length - 1 ? 0 : prevIdx + 1));

    return (
        <div className="slider-wrapper">
            <div className="slider-box">
                <button className="slide-btn prev-btn" onClick={prev} aria-label="Previous Slide">
                    &#10094;
                </button>

                <div className="slide-content">
                    <h3>{TIPS[current].title}</h3>
                    <p>{TIPS[current].description}</p>
                </div>

                <button className="slide-btn next-btn" onClick={next} aria-label="Next Slide">
                    &#10095;
                </button>
            </div>

            <div className="dots-box">
                {TIPS.map((_, idx) => (
                    <span
                        key={idx}
                        className={`dot ${idx === current ? 'active' : ''}`}
                        onClick={() => setCurrent(idx)}
                    />
                ))}
            </div>
        </div>
    );
}
