import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function SubmitIdea() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        founderName: '',
        founderEmail: '',
        startupName: '',
        industry: '',
        pitch: ''
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [mlResult, setMlResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.founderName.trim() || formData.founderName.trim().length < 2) {
            newErrors.founderName = 'Name must be at least 2 characters.';
        }
        if (
            !formData.founderEmail.trim() ||
            !formData.founderEmail.includes('@') ||
            !formData.founderEmail.includes('.')
        ) {
            newErrors.founderEmail = 'Please enter a valid email address.';
        }
        if (!formData.startupName.trim()) {
            newErrors.startupName = 'Startup name is required.';
        }
        if (!formData.industry) {
            newErrors.industry = 'Please choose an industry.';
        }
        if (!formData.pitch.trim() || formData.pitch.trim().length < 20) {
            newErrors.pitch = 'Problem & solution pitch must be at least 20 characters.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setSubmitting(true);
            const res = await api.createIdea(formData);
            setMlResult(res.mlEvaluation);
            setFormData({
                founderName: '',
                founderEmail: '',
                startupName: '',
                industry: '',
                pitch: ''
            });
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container section">
            <div className="form-container wide-container">
                <div className="section-header">
                    <h2>Startup Evaluation & Feature Gap Analysis</h2>
                    <p>Get instant ML viability scoring, benchmark competitors, and see recommended features to build.</p>
                </div>

                {/* Deep ML & Competitor Intelligence Card */}
                {mlResult && (
                    <div className="ml-intelligence-panel">
                        <div className="ml-result-header">
                            <div>
                                <span className="ml-badge">🤖 AI & Market Intelligence Report</span>
                                <h3>{mlResult.verdict}</h3>
                            </div>
                            <div className="ml-score-circle">
                                <span>{mlResult.score}</span>
                                <small>/100</small>
                            </div>
                        </div>

                        {/* Competitive Differentiation Edge */}
                        <div className="ml-section-box">
                            <h4>⚔️ Competitor Benchmark & Market Reality</h4>
                            <p className="edge-text">{mlResult.competitiveAdvantage}</p>
                            
                            <div className="competitor-grid">
                                {mlResult.competitors?.map((comp, idx) => (
                                    <div className="competitor-card" key={idx}>
                                        <div className="comp-name">🏢 {comp.name}</div>
                                        <div className="comp-focus"><strong>What they do:</strong> {comp.focus}</div>
                                        <div className="comp-edge"><strong>Their Moat:</strong> {comp.edge}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* High-Impact Features to Add */}
                        <div className="ml-section-box">
                            <h4>✨ Recommended Features to Build (To Win Over Competitors)</h4>
                            <div className="features-list">
                                {mlResult.recommendedFeatures?.map((feat, idx) => (
                                    <div className="feature-item" key={idx}>
                                        <div className="feature-header">
                                            <strong>{feat.feature}</strong>
                                            <span className={`priority-badge ${feat.priority.toLowerCase()}`}>
                                                {feat.priority} Priority
                                            </span>
                                        </div>
                                        <p className="feature-why">💡 <em>Why build this:</em> {feat.why}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actionable Suggestions */}
                        <div className="ml-section-box">
                            <h4>🚀 Tactical Recommendations to Improve Your Idea:</h4>
                            <ul className="suggestions-list">
                                {mlResult.suggestions?.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="ml-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/database')}
                            >
                                View in Live MongoDB Database →
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setMlResult(null)}
                            >
                                Submit Another Idea
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="founderName">Founder Name:</label>
                        <input
                            type="text"
                            id="founderName"
                            name="founderName"
                            placeholder="e.g. Alex Morgan"
                            value={formData.founderName}
                            onChange={handleChange}
                        />
                        {errors.founderName && <span className="error-msg">{errors.founderName}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="founderEmail">Email Address:</label>
                        <input
                            type="email"
                            id="founderEmail"
                            name="founderEmail"
                            placeholder="e.g. alex@example.com"
                            value={formData.founderEmail}
                            onChange={handleChange}
                        />
                        {errors.founderEmail && <span className="error-msg">{errors.founderEmail}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="startupName">Startup Name / Working Title:</label>
                        <input
                            type="text"
                            id="startupName"
                            name="startupName"
                            placeholder="e.g. StudySwap, QuickDocs"
                            value={formData.startupName}
                            onChange={handleChange}
                        />
                        {errors.startupName && <span className="error-msg">{errors.startupName}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="industry">Industry Category:</label>
                        <select
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                        >
                            <option value="">-- Select Industry --</option>
                            <option value="SaaS">B2B SaaS / Productivity (Notion, Linear, ClickUp)</option>
                            <option value="FinTech">FinTech / Finance (Stripe, Razorpay, Brex)</option>
                            <option value="HealthTech">HealthTech & Wellness (Practo, Noom, Whoop)</option>
                            <option value="EdTech">EdTech / Education (Duolingo, Quizlet, Coursera)</option>
                            <option value="E-Commerce">E-Commerce & Quick Commerce (Shopify, Meesho, Blinkit)</option>
                            <option value="CleanTech">CleanTech & Energy (Tesla Energy, Watershed)</option>
                            <option value="Other">Other / Creator Tools</option>
                        </select>
                        {errors.industry && <span className="error-msg">{errors.industry}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="pitch">Problem & Solution Description:</label>
                        <textarea
                            id="pitch"
                            name="pitch"
                            rows="4"
                            placeholder="Describe who faces this pain point and your unique workflow to solve it..."
                            value={formData.pitch}
                            onChange={handleChange}
                        />
                        {errors.pitch && <span className="error-msg">{errors.pitch}</span>}
                    </div>

                    <button type="submit" className="btn btn-submit" disabled={submitting}>
                        {submitting ? 'Analyzing against Competitors & Generating Roadmap...' : '⚡ Analyze Idea, Compare Competitors & Save'}
                    </button>
                </form>
            </div>
        </div>
    );
}
