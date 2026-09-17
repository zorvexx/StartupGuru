import React, { useState } from 'react';
import { Sliders, Activity, ChevronDown, ChevronUp } from 'lucide-react';

const EstimatorSliders = () => {
  const [budget, setBudget] = useState(10000);
  const [market, setMarket] = useState(50000);
  const [timeline, setTimeline] = useState(6);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Dynamic formula for Viability Index
  const budgetFactor = Math.min(budget / 50000, 1) * 35;
  const marketFactor = Math.min(market / 200000, 1) * 40;
  const timelineFactor = Math.max(0, 1 - Math.abs(timeline - 6) / 12) * 25;

  let score = Math.round(budgetFactor + marketFactor + timelineFactor);
  score = Math.min(98, Math.max(20, score));

  const getScoreDescription = () => {
    if (score >= 80) return 'Excellent balance! Highly scalable budget, strong market reach, and efficient MVP horizon.';
    if (score >= 60) return 'Solid feasibility. Healthy resource allocation for an early-stage launch.';
    if (score >= 40) return 'Moderate readiness. Consider extending your budget or refining your target market focus.';
    return 'Early concept phase. Higher budget or tighter timeline recommended for faster validation.';
  };

  const getGradientStyle = (val, min, max) => {
    const pct = ((val - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #f39c12 0%, #f39c12 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
    };
  };

  return (
    <div class="estimator-box">
      <h2>Interactive Startup Viability Calculator</h2>
      <p style={{ color: '#666', marginBottom: '24px', fontSize: '15px' }}>
        Adjust the sliders below to calculate your startup's estimated launch viability index & market readiness.
      </p>

      <div class="estimator-grid">
        <div class="sliders-group">
          {/* Budget Slider */}
          <div class="slider-field">
            <div class="slider-header">
              <label htmlFor="budgetSlider">Estimated Initial Budget ($):</label>
              <span class="slider-value">${budget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              id="budgetSlider"
              min="1000"
              max="100000"
              step="1000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              class="custom-slider"
              style={getGradientStyle(budget, 1000, 100000)}
            />
            <div class="slider-range-labels">
              <span>$1,000</span>
              <span>$50,000</span>
              <span>$100,000+</span>
            </div>
          </div>

          {/* Market Slider */}
          <div class="slider-field">
            <div class="slider-header">
              <label htmlFor="marketSlider">Target Audience Size (Users):</label>
              <span class="slider-value">{market.toLocaleString()} users</span>
            </div>
            <input
              type="range"
              id="marketSlider"
              min="5000"
              max="500000"
              step="5000"
              value={market}
              onChange={(e) => setMarket(Number(e.target.value))}
              class="custom-slider"
              style={getGradientStyle(market, 5000, 500000)}
            />
            <div class="slider-range-labels">
              <span>5,000</span>
              <span>250,000</span>
              <span>500,000+</span>
            </div>
          </div>

          {/* Timeline Slider */}
          <div class="slider-field">
            <div class="slider-header">
              <label htmlFor="timelineSlider">Development Timeline (Months):</label>
              <span class="slider-value">{timeline} Months</span>
            </div>
            <input
              type="range"
              id="timelineSlider"
              min="1"
              max="18"
              step="1"
              value={timeline}
              onChange={(e) => setTimeline(Number(e.target.value))}
              class="custom-slider"
              style={getGradientStyle(timeline, 1, 18)}
            />
            <div class="slider-range-labels">
              <span>1 Mo</span>
              <span>9 Mos</span>
              <span>18 Mos</span>
            </div>
          </div>
        </div>

        {/* Viability Gauge Result Card */}
        <div class="estimator-result-card">
          <h3 style={{ fontSize: '15px', color: '#ecf0f1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Viability & Readiness Index
          </h3>
          <div style={{ margin: '15px 0' }}>
            <span class="score-number">{score}</span>
            <span class="score-unit">/100</span>
          </div>

          <div class="score-bar-container">
            <div class="score-bar-fill" style={{ width: `${score}%` }} />
          </div>

          <p style={{ fontSize: '13px', color: '#ecf0f1', lineHeight: '1.5' }}>
            {getScoreDescription()}
          </p>

          <button
            type="button"
            class="btn-breakdown"
            onClick={() => setShowBreakdown(!showBreakdown)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '14px' }}
          >
            {showBreakdown ? 'Hide Breakdown' : 'View Metric Breakdown'}
            {showBreakdown ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showBreakdown && (
            <div class="score-breakdown">
              <div class="breakdown-item">
                <span>Capital Weight:</span>
                <strong style={{ color: '#f39c12' }}>{budgetFactor.toFixed(1)} / 35</strong>
              </div>
              <div class="breakdown-item">
                <span>Market Scale:</span>
                <strong style={{ color: '#f39c12' }}>{marketFactor.toFixed(1)} / 40</strong>
              </div>
              <div class="breakdown-item">
                <span>Timeline Horizon:</span>
                <strong style={{ color: '#f39c12' }}>{timelineFactor.toFixed(1)} / 25</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstimatorSliders;
