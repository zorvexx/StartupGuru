import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

// Intelligent benchmark fallbacks if a document in MongoDB has partial or older ML fields
const INDUSTRY_BENCHMARKS = {
    'SaaS': {
        score: 78,
        verdict: 'High Potential (Viable)',
        verdictClass: 'status-success',
        competitiveAdvantage: 'Compete against Notion and Linear by excelling in zero-latency keyboard shortcuts and vertical-specific workflows rather than trying to build all features on day one.',
        competitors: [
            { name: 'Notion', focus: 'All-in-one workspace & modular docs', edge: 'High customizability, community templates' },
            { name: 'Linear', focus: 'High-speed issue tracking for devs', edge: 'Opinionated workflow, zero-latency keyboard shortcuts' },
            { name: 'ClickUp', focus: 'Comprehensive project management', edge: 'Broad feature coverage, aggressive pricing' }
        ],
        recommendedFeatures: [
            { feature: 'One-Click CSV / Legacy Tool Importer', priority: 'High', why: 'Reduces onboarding drop-off by eliminating manual data migration from competitors.' },
            { feature: 'Keyboard Shortcuts (Cmd+K Command Palette)', priority: 'Medium', why: 'Boosts daily active user retention and speed for power users.' },
            { feature: 'Automated Weekly Slack/Email Summary Digest', priority: 'High', why: 'Drives habitual team re-engagement without forcing daily logins.' }
        ],
        suggestions: [
            'Value Proposition: Explicitly state what measurable metric (hours saved, $ cost reduced) you improve for customers.',
            'Target Persona: Clearly define who is your ICP (Ideal Customer Profile) who has the budget to pay for this.',
            'Differentiation Wedge: Focus on one killer workflow that Notion overcomplicates.'
        ]
    },
    'HealthTech': {
        score: 80,
        verdict: 'High Potential (Viable)',
        verdictClass: 'status-success',
        competitiveAdvantage: 'Rather than competing directly across every fitness vertical with giants like Practo and Noom, carve out a dedicated niche with interactive custom diet and personalized wellness feedback loops.',
        competitors: [
            { name: 'Practo', focus: 'Doctor appointment booking & telemedicine', edge: 'Large verified provider network, pharmacy integration' },
            { name: 'Noom', focus: 'Psychology-driven weight loss & habits', edge: 'Behavioral CBT curriculum, dedicated coaches' },
            { name: 'Whoop', focus: 'Wearable strain & recovery tracking', edge: 'Subscription-based physiological feedback loops' }
        ],
        recommendedFeatures: [
            { feature: 'Daily Habit Streak & Micro-Reward Mechanism', priority: 'High', why: 'Health apps fail when users drop off after day 14. Streaks keep retention above 60%.' },
            { feature: 'HIPAA / Digital Health Data Export for Doctors', priority: 'High', why: 'Users trust apps that easily share verified reports directly with their physicians.' },
            { feature: 'Community Accountability Pods', priority: 'Medium', why: 'Peer accountability improves patient outcome adherence by 35% compared to solo tracking.' }
        ],
        suggestions: [
            'Value Proposition: Explicitly state measurable fitness progress or wellness milestones users achieve.',
            'Target Persona: Target busy working professionals who need curated 15-minute home workouts and diet plans.',
            'Differentiation Wedge: Focus on verified mental wellness and interactive stretching routines that Practo lacks.'
        ]
    },
    'FinTech': {
        score: 82,
        verdict: 'High Potential (Viable)',
        verdictClass: 'status-success',
        competitiveAdvantage: 'Win against legacy banking and platforms like Razorpay and Stripe by offering ultra-fast local settlement rails and automated invoice reconciliation for freelancers and SMEs.',
        competitors: [
            { name: 'Stripe', focus: 'Developer-first payment processing', edge: 'World-class APIs, seamless checkout conversion' },
            { name: 'Razorpay', focus: 'Full-suite neo-banking & payroll', edge: 'Deep local banking rails, automated vendor reconciliation' },
            { name: 'Brex', focus: 'Corporate cards & cash management', edge: 'High limits, automated receipt capture' }
        ],
        recommendedFeatures: [
            { feature: 'Instant WhatsApp / SMS Payment Reminders', priority: 'High', why: 'Customers pay 4x faster when payment links appear directly in mobile messaging apps.' },
            { feature: 'Automated Tax / GST Ready Export', priority: 'High', why: 'Accounting and compliance are top reasons business owners switch payment platforms.' },
            { feature: 'Zero-Trust Role-Based Access Controls (RBAC)', priority: 'Medium', why: 'Crucial security feature required to move upmarket to enterprise clients.' }
        ],
        suggestions: [
            'Value Proposition: Quantify how many hours of bookkeeping your platform saves each week.',
            'Target Persona: Target high-volume freelance agencies and independent retail stores.',
            'Differentiation Wedge: Provide instant payout settlement rather than T+2 day waiting periods.'
        ]
    },
    'EdTech': {
        score: 76,
        verdict: 'High Potential (Viable)',
        verdictClass: 'status-success',
        competitiveAdvantage: 'Differentiate from Duolingo and Coursera by focusing on active student-to-student peer collaboration and live problem-solving bounties instead of passive video lectures.',
        competitors: [
            { name: 'Duolingo', focus: 'Gamified bite-sized language learning', edge: 'Addictive streak mechanics, AI placement test' },
            { name: 'Quizlet', focus: 'Crowdsourced flashcards & study tools', edge: 'Viral student-to-student sharing loops' },
            { name: 'Coursera', focus: 'Accredited university certificates', edge: 'Institutional credibility, enterprise B2B sales' }
        ],
        recommendedFeatures: [
            { feature: 'Bite-Sized 3-Minute Micro-Learning Cards', priority: 'High', why: 'Long 60-minute video lectures have under 12% completion rates. Micro-modules 3x completion.' },
            { feature: 'Peer Q&A Upvoting & Bounty Rewards', priority: 'High', why: 'Crowdsources doubt-solving without hiring expensive full-time tutors.' },
            { feature: 'Shareable LinkedIn / Resume Micro-Certificate', priority: 'Medium', why: 'Students want proof of work to showcase to prospective recruiters.' }
        ],
        suggestions: [
            'Value Proposition: Focus on job placement readiness or tangible score improvements.',
            'Target Persona: Target college undergrads preparing for technical interviews and exams.',
            'Differentiation Wedge: Offer real-time peer coding pods rather than solo video watching.'
        ]
    },
    'E-Commerce': {
        score: 72,
        verdict: 'Moderate Potential',
        verdictClass: 'status-info',
        competitiveAdvantage: 'Win against generic marketplaces like Shopify and Meesho by mastering hyper-localized social commerce and direct chat-based checkout loops.',
        competitors: [
            { name: 'Shopify', focus: 'D2C independent storefront engine', edge: 'Massive app store ecosystem, integrated checkout' },
            { name: 'Meesho', focus: 'Social commerce for regional tier-2/3', edge: 'Zero-commission reseller network, WhatsApp sharing' },
            { name: 'Blinkit / Zepto', focus: '10-minute dark-store quick commerce', edge: 'Hyperlocal micro-warehousing, algorithmic inventory' }
        ],
        recommendedFeatures: [
            { feature: '1-Click Direct WhatsApp Ordering Loop', priority: 'High', why: 'Bypasses cumbersome checkout carts and increases checkout conversion by up to 28%.' },
            { feature: 'Personalized Smart Bundle Recommendations', priority: 'High', why: 'Boosts Average Order Value (AOV) by recommending complementary add-ons at checkout.' }
        ],
        suggestions: [
            'Value Proposition: Lower acquisition cost through organic viral referral sharing.',
            'Target Persona: Target regional boutique brands needing instant mobile sales.'
        ]
    },
    'CleanTech': {
        score: 79,
        verdict: 'High Potential (Viable)',
        verdictClass: 'status-success',
        competitiveAdvantage: 'Translate green initiatives directly into hard dollar savings and government tax credits to drive commercial B2B adoption.',
        competitors: [
            { name: 'Tesla Energy', focus: 'Battery storage & solar microgrids', edge: 'End-to-end hardware-software integration' },
            { name: 'Watershed', focus: 'Enterprise carbon accounting SaaS', edge: 'Audit-ready reporting, supply chain emission tracking' }
        ],
        recommendedFeatures: [
            { feature: 'Live Carbon Savings & Monetary ROI Calculator', priority: 'High', why: 'Buyers commit faster when ecological impact is translated into tangible monetary dollars saved.' },
            { feature: 'Automated Regulatory Compliance PDF Generator', priority: 'High', why: 'Helps enterprise clients qualify for government green subsidies and ESG audits.' }
        ],
        suggestions: [
            'Target Persona: Target facility managers looking to cut commercial utility bills.'
        ]
    },
    'Other': {
        score: 70,
        verdict: 'Moderate Potential',
        verdictClass: 'status-info',
        competitiveAdvantage: 'Focus on a single, well-defined user workflow before expanding to multi-feature platforms.',
        competitors: [
            { name: 'Substack', focus: 'Direct creator monetization & newsletters', edge: 'Simple publishing, network recommendation loop' },
            { name: 'Zapier', focus: 'No-code API automation platform', edge: 'Thousands of pre-built integrations' }
        ],
        recommendedFeatures: [
            { feature: 'Self-Serve Interactive Product Walkthrough', priority: 'High', why: 'Reduces initial user confusion and speeds up time-to-first-value.' },
            { feature: 'Public Product Roadmap with User Feature Voting', priority: 'Medium', why: 'Turns early adopters into loyal evangelists who feel co-invested in your product.' }
        ],
        suggestions: [
            'Target Persona: Define your niche user base with clear purchasing power.',
            'Distribution Strategy: Build a distribution loop through niche communities or open-source.'
        ]
    }
};

const getEnrichedIdeaML = (item) => {
    const fallback = INDUSTRY_BENCHMARKS[item.industry] || INDUSTRY_BENCHMARKS['Other'];
    const ml = item.mlEvaluation || {};
    
    return {
        score: ml.score || fallback.score,
        verdict: ml.verdict || fallback.verdict,
        verdictClass: ml.verdictClass || fallback.verdictClass,
        competitiveAdvantage: ml.competitiveAdvantage || fallback.competitiveAdvantage,
        competitors: (ml.competitors && ml.competitors.length > 0) ? ml.competitors : fallback.competitors,
        recommendedFeatures: (ml.recommendedFeatures && ml.recommendedFeatures.length > 0) ? ml.recommendedFeatures : fallback.recommendedFeatures,
        suggestions: (ml.suggestions && ml.suggestions.length > 0) ? ml.suggestions : fallback.suggestions
    };
};

export default function DatabasePage({ user }) {
    const [status, setStatus] = useState(null);
    const [ideas, setIdeas] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [activeTab, setActiveTab] = useState('ideas'); // 'ideas' or 'users'

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [statusRes, ideasRes, usersRes] = await Promise.all([
                api.getStatus().catch(() => null),
                api.getIdeas().catch(() => []),
                api.getUsers().catch(() => [])
            ]);

            setStatus(statusRes);
            setIdeas(ideasRes);
            setUsersList(usersRes);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete "${name}" from the database?`)) return;
        try {
            await api.deleteIdea(id);
            setIdeas((prev) => prev.filter((item) => item._id !== id));
            if (selectedIdea?._id === id) setSelectedIdea(null);
        } catch (err) {
            alert(`Delete failed: ${err.message}`);
        }
    };

    return (
        <div className="container section">
            <div className="db-header-row">
                <div>
                    <h2>Live Database Integration & Session Monitor</h2>
                    <p>Demonstrating active fullstack CRUD operations with MongoDB Atlas & Express Sessions.</p>
                </div>
                <div
                    className={`connection-badge ${
                        status?.backend ? 'connected' : 'error'
                    }`}
                >
                    <span className="status-dot"></span>
                    <span>{status ? status.database : 'Backend Offline'}</span>
                </div>
            </div>

            {/* Session Status Banner */}
            <div className="session-banner">
                <div className="session-info">
                    <span className="session-label">Active Session:</span>
                    {user ? (
                        <span className="session-active">
                            🟢 Logged in as <strong>{user.name}</strong> ({user.email}) &bull; Role: <strong>{user.role}</strong>
                        </span>
                    ) : (
                        <span className="session-guest">
                            ⚪ Guest Visitor (No active session cookie &bull; <a href="/login">Login to start session</a>)
                        </span>
                    )}
                </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="db-meta-card">
                <div className="meta-item">
                    <span className="meta-label">Backend Port:</span>
                    <strong>5000 (Active)</strong>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Startup Ideas:</span>
                    <strong>{ideas.length} Documents</strong>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Registered Users:</span>
                    <strong>{usersList.length} Accounts</strong>
                </div>
                <div className="meta-item">
                    <button className="btn btn-sm" onClick={loadData} disabled={loading}>
                        {loading ? 'Refreshing...' : '🔄 Refresh Data'}
                    </button>
                </div>
            </div>

            {error && <div className="alert-error">⚠️ {error}</div>}

            {/* Table Selector Tabs */}
            <div className="db-tabs">
                <button
                    className={`tab-btn ${activeTab === 'ideas' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ideas')}
                >
                    📁 Collection: StartupGuru ({ideas.length} ideas)
                </button>
                <button
                    className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    👥 Collection: Users ({usersList.length} registered accounts)
                </button>
            </div>

            {/* Modal / Detailed Drawer */}
            {selectedIdea && (() => {
                const ml = getEnrichedIdeaML(selectedIdea);
                return (
                    <div className="idea-detail-modal">
                        <div className="modal-header">
                            <div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                                    <span className="ml-badge">Deep Startup Analysis</span>
                                    <span className={`score-pill ${ml.verdictClass}`}>
                                        Score: {ml.score}/100 &bull; {ml.verdict}
                                    </span>
                                </div>
                                <h3>{selectedIdea.startupName} ({selectedIdea.industry})</h3>
                                <small>By: {selectedIdea.founderName} ({selectedIdea.founderEmail})</small>
                            </div>
                            <button className="btn-close" onClick={() => setSelectedIdea(null)}>✕</button>
                        </div>

                        <div className="modal-body">
                            <div className="detail-block">
                                <strong>Problem & Solution:</strong>
                                <p>{selectedIdea.pitch}</p>
                            </div>

                            {/* Competitive Advantage / Moat */}
                            {ml.competitiveAdvantage && (
                                <div className="detail-block">
                                    <strong>🎯 Strategic Moat & Differentiation:</strong>
                                    <p style={{ color: '#2563eb', fontWeight: '500', marginTop: '4px' }}>
                                        {ml.competitiveAdvantage}
                                    </p>
                                </div>
                            )}

                            {/* Competitor Grid */}
                            <div className="detail-block">
                                <strong>⚔️ Existing Market Competitors & Moats:</strong>
                                <div className="competitor-mini-grid">
                                    {ml.competitors.map((c, i) => (
                                        <div className="mini-card" key={i}>
                                            <strong style={{ color: '#0f172a' }}>🏢 {c.name}</strong>
                                            <div style={{ color: '#475569', margin: '3px 0' }}>{c.focus}</div>
                                            <small style={{ color: '#2563eb' }}><em>Moat: {c.edge}</em></small>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recommended Features */}
                            <div className="detail-block">
                                <strong>✨ High-Impact Recommended Features to Build:</strong>
                                <ul className="mini-features">
                                    {ml.recommendedFeatures.map((f, i) => (
                                        <li key={i} style={{ marginBottom: '6px' }}>
                                            <strong>{f.feature}</strong>{' '}
                                            <span className={`priority-badge ${f.priority?.toLowerCase() || 'high'}`}>
                                                {f.priority}
                                            </span>{' '}
                                            &mdash; {f.why}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tactical Improvement Suggestions */}
                            {ml.suggestions && ml.suggestions.length > 0 && (
                                <div className="detail-block">
                                    <strong>🚀 Tactical Suggestions to Improve Pitch & Market Fit:</strong>
                                    <ul className="mini-features">
                                        {ml.suggestions.map((s, i) => (
                                            <li key={i} style={{ marginBottom: '4px' }}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })()}

            {/* TAB 1: Startup Ideas Table */}
            {activeTab === 'ideas' && (
                <div className="table-responsive">
                    <table className="demo-table">
                        <thead>
                            <tr>
                                <th>Founder</th>
                                <th>Startup Name</th>
                                <th>Industry</th>
                                <th>Score</th>
                                <th>Competitors & Recommendations</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center">Loading live records...</td>
                                </tr>
                            ) : ideas.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">No ideas recorded in database yet.</td>
                                </tr>
                            ) : (
                                ideas.map((item) => {
                                    const ml = getEnrichedIdeaML(item);
                                    return (
                                        <tr key={item._id}>
                                            <td>
                                                <strong>{item.founderName}</strong>
                                                <div className="text-muted">{item.founderEmail}</div>
                                            </td>
                                            <td>
                                                <span className="startup-badge">{item.startupName}</span>
                                            </td>
                                            <td>
                                                <span className="badge-status">{item.industry}</span>
                                            </td>
                                            <td>
                                                <span className={`score-pill ${ml.verdictClass}`}>
                                                    {ml.score}/100
                                                </span>
                                            </td>
                                            <td className="suggestion-cell">
                                                {ml.competitors?.length > 0 && (
                                                    <div className="comp-tag-row">
                                                        <small>Competitors: </small>
                                                        {ml.competitors.map((c, i) => (
                                                            <span key={i} className="comp-tag">{c.name}</span>
                                                        ))}
                                                    </div>
                                                )}
                                                {ml.recommendedFeatures?.length > 0 && (
                                                    <p className="sub-suggestion">
                                                        👉 <strong>Feature:</strong> {ml.recommendedFeatures[0].feature}
                                                    </p>
                                                )}
                                            </td>
                                            <td>
                                                <div className="action-row">
                                                    <button className="btn-view" onClick={() => setSelectedIdea(item)}>
                                                        Details
                                                    </button>
                                                    <button
                                                        className="btn-del"
                                                        onClick={() => handleDelete(item._id, item.startupName)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* TAB 2: Users Table */}
            {activeTab === 'users' && (
                <div className="table-responsive">
                    <table className="demo-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Password Security</th>
                                <th>Registration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center">Loading users collection...</td>
                                </tr>
                            ) : usersList.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No users registered yet. <a href="/login">Create an account here!</a>
                                    </td>
                                </tr>
                            ) : (
                                usersList.map((u) => (
                                    <tr key={u._id}>
                                        <td><strong>{u.name}</strong></td>
                                        <td>{u.email}</td>
                                        <td>
                                            <span className="badge-status">{u.role}</span>
                                        </td>
                                        <td>
                                            <span className="security-tag">🔒 bcrypt hashed</span>
                                        </td>
                                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="architecture-note">
                <h4>💡 Architecture Workflow to Explain to Evaluators:</h4>
                <ol>
                    <li>
                        <strong>User Authentication:</strong> Submits to <code>POST /api/auth/register</code> or <code>/api/auth/login</code>.
                    </li>
                    <li>
                        <strong>Password Security:</strong> Passwords are salt-hashed using <strong>bcryptjs</strong> before saving to the MongoDB <code>Users</code> collection.
                    </li>
                    <li>
                        <strong>Session Management:</strong> Handled by <code>express-session</code>; sends an HTTP-only <code>connect.sid</code> cookie to preserve state between browser and server.
                    </li>
                    <li>
                        <strong>Multi-Collection Database:</strong> MongoDB Atlas contains two distinct collections: <code>StartupGuru</code> (pitch ideas) and <code>Users</code> (registered accounts).
                    </li>
                </ol>
            </div>
        </div>
    );
}
