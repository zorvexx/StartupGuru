import React from 'react';

export default function AboutPage() {
    return (
        <div className="container section">
            <div className="section-header">
                <h2>About StartupGuru</h2>
                <p>Empowering student founders, engineers, and creators with honest, data-driven startup critique.</p>
            </div>

            <div className="about-grid">
                <div className="about-card">
                    <h3>💡 Honest Founder Feedback</h3>
                    <p>
                        We cut through AI buzzword spam to provide practical, realistic critique of early-stage products before
                        founders spend months building the wrong feature set.
                    </p>
                </div>
                <div className="about-card">
                    <h3>🎯 Customer Problem Discovery</h3>
                    <p>
                        Understanding who genuinely pays for your solution is 90% of early venture success. We assist founders in
                        formulating tight customer interview scripts.
                    </p>
                </div>
                <div className="about-card">
                    <h3>🛠️ Architecture & WAD Project Demo</h3>
                    <p>
                        This project is engineered as a fullstack Web Application Development (WAD) showcase with modular Express routes,
                        Mongoose models, and React Router navigation.
                    </p>
                </div>
            </div>

            <div className="tech-stack-card">
                <h3>Architecture Stack</h3>
                <div className="tech-badges">
                    <span className="tech-tag">React 19 (SPA)</span>
                    <span className="tech-tag">React Router v7</span>
                    <span className="tech-tag">Node.js Express REST API</span>
                    <span className="tech-tag">MongoDB Atlas / Mongoose</span>
                    <span className="tech-tag">Vite Build Tool</span>
                </div>
            </div>
        </div>
    );
}
