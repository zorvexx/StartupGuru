import React from 'react';
import { Link } from 'react-router-dom';
import InsightsSlider from '../components/InsightsSlider';

export default function Home() {
    return (
        <div className="page-home">
            <section className="hero">
                <div className="container">
                    <span className="badge">Human-First Startup Insights</span>
                    <h1>Analyze Your Startup Idea with Real Founder Logic</h1>
                    <p>
                        Get actionable evaluation on market feasibility, unit economics, and competitive scope.
                        Connected to an end-to-end fullstack React & MongoDB architecture.
                    </p>
                    <div className="hero-cta-group">
                        <Link to="/submit" className="btn btn-primary">
                            Submit Your Idea
                        </Link>
                        <Link to="/database" className="btn btn-secondary">
                            View Live Database
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container section">
                <div className="section-header">
                    <h2>Core Evaluation Pillars</h2>
                    <p>Every startup hypothesis passes through 4 key validation lenses.</p>
                </div>
                <div className="cards-grid">
                    <div className="card">
                        <span className="step-num">01</span>
                        <h3>Feasibility Analysis</h3>
                        <p>Assess if technology, timeline, and architectural complexity are viable for your initial stage.</p>
                    </div>
                    <div className="card">
                        <span className="step-num">02</span>
                        <h3>Market Demand</h3>
                        <p>Evaluate target audience purchasing intent and differentiate from legacy incumbents.</p>
                    </div>
                    <div className="card">
                        <span className="step-num">03</span>
                        <h3>Timing & Relevance</h3>
                        <p>Examine whether macro tech or cultural shifts make this the exact right moment to launch.</p>
                    </div>
                    <div className="card">
                        <span className="step-num">04</span>
                        <h3>Unit Economics</h3>
                        <p>Inspect monetization channels, customer acquisition costs, and path to self-sustaining runway.</p>
                    </div>
                </div>
            </section>

            <section className="container section">
                <div className="section-header">
                    <h2>Founder Insights & Tips</h2>
                    <p>Interactive slider powered by React state hooks.</p>
                </div>
                <InsightsSlider />
            </section>
        </div>
    );
}
