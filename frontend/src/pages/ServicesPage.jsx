import React from 'react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
    const services = [
        {
            title: 'Feasibility Analysis',
            desc: 'We examine the technology stack, hardware constraints, team skills, and runway feasibility.',
            details: 'Includes architectural blueprint review, external API dependencies check, and deployment costs.'
        },
        {
            title: 'Market Research & Competitive Matrix',
            desc: 'Analyze target audience demographics, incumbent competitors, and your distinctive wedge.',
            details: 'Includes customer persona discovery, pricing elasticity studies, and differentiation scoring.'
        },
        {
            title: 'Trend & Timing Relevance',
            desc: 'Evaluate why this specific product must exist today rather than 5 years ago or 5 years in the future.',
            details: 'Evaluates macro regulations, AI platform shifts, customer behavioral shifts, and market inflection points.'
        },
        {
            title: 'Unit Economics & Scope Review',
            desc: 'Deep-dive into Customer Acquisition Cost (CAC), Lifetime Value (LTV), and break-even timelines.',
            details: 'Provides a standard 12-month financial projection model and burn-rate assessment.'
        }
    ];

    return (
        <div className="container section">
            <div className="section-header">
                <h2>Our Analysis Services</h2>
                <p>Comprehensive founder advisory modules backed by empirical market data.</p>
            </div>

            <div className="cards-grid">
                {services.map((item, idx) => (
                    <div className="card" key={idx}>
                        <span className="step-num">0{idx + 1}</span>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                        <hr className="divider" />
                        <small className="card-subtext">{item.details}</small>
                    </div>
                ))}
            </div>

            <div className="cta-box">
                <h3>Ready to test your concept?</h3>
                <p>Submit your startup idea to receive initial advisory notes.</p>
                <Link to="/submit" className="btn btn-primary">
                    Submit Idea Now
                </Link>
            </div>
        </div>
    );
}
