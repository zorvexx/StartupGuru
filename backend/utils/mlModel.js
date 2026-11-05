/**
 * Startup Idea AI/ML Intelligence & Competitor Benchmark Engine
 * Analyzes pitch text, maps to real competitors, detects feature gaps,
 * and generates tactical feature recommendations & differentiation strategies.
 */

// 1. Benchmark Competitor Knowledge Base by Industry
const COMPETITOR_BENCHMARKS = {
    'SaaS': [
        { name: 'Notion', focus: 'All-in-one workspace & modular docs', edge: 'High customizability, community templates' },
        { name: 'Linear', focus: 'High-speed issue tracking for devs', edge: 'Opinionated workflow, zero-latency keyboard shortcuts' },
        { name: 'ClickUp', focus: 'Comprehensive project management', edge: 'Broad feature coverage, aggressive pricing' }
    ],
    'FinTech': [
        { name: 'Stripe', focus: 'Developer-first payment processing', edge: 'World-class APIs, seamless checkout conversion' },
        { name: 'Razorpay', focus: 'Full-suite neo-banking & payroll', edge: 'Deep local banking rails, automated vendor reconciliation' },
        { name: 'Brex', focus: 'Corporate cards & cash management', edge: 'High limits, automated receipt capture' }
    ],
    'HealthTech': [
        { name: 'Practo', focus: 'Doctor appointment booking & telemedicine', edge: 'Large verified provider network, pharmacy integration' },
        { name: 'Noom', focus: 'Psychology-driven weight loss & habits', edge: 'Behavioral CBT curriculum, dedicated coaches' },
        { name: 'Whoop', focus: 'Wearable strain & recovery tracking', edge: 'Subscription-based physiological feedback loops' }
    ],
    'EdTech': [
        { name: 'Duolingo', focus: 'Gamified bite-sized language learning', edge: 'Addictive streak mechanics, AI placement test' },
        { name: 'Quizlet', focus: 'Crowdsourced flashcards & study tools', edge: 'Viral student-to-student sharing loops' },
        { name: 'Coursera', focus: 'Accredited university certificates', edge: 'Institutional credibility, enterprise B2B sales' }
    ],
    'E-Commerce': [
        { name: 'Shopify', focus: 'D2C independent storefront engine', edge: 'Massive app store ecosystem, integrated checkout' },
        { name: 'Meesho', focus: 'Social commerce for regional tier-2/3', edge: 'Zero-commission reseller network, WhatsApp sharing' },
        { name: 'Blinkit / Zepto', focus: '10-minute dark-store quick commerce', edge: 'Hyperlocal micro-warehousing, algorithmic inventory' }
    ],
    'CleanTech': [
        { name: 'Tesla Energy', focus: 'Battery storage & solar microgrids', edge: 'End-to-end hardware-software integration' },
        { name: 'Watershed', focus: 'Enterprise carbon accounting SaaS', edge: 'Audit-ready reporting, supply chain emission tracking' }
    ],
    'Other': [
        { name: 'Substack', focus: 'Direct creator monetization & newsletters', edge: 'Simple publishing, network recommendation loop' },
        { name: 'Zapier', focus: 'No-code API automation platform', edge: 'Thousands of pre-built integrations' }
    ]
};

// 2. High-Impact Feature Suggestion Bank by Domain
const FEATURE_RECOMMENDATIONS = {
    'SaaS': [
        {
            feature: 'One-Click CSV / Legacy Tool Importer',
            why: 'Reduces onboarding drop-off by eliminating manual data entry from competitors.',
            priority: 'High'
        },
        {
            feature: 'Keyboard Shortcut Architecture (Cmd/Ctrl + K Palette)',
            why: 'Power users love speed. Linear and Superhuman built multi-billion reputations on snappy keyboard navigation.',
            priority: 'Medium'
        },
        {
            feature: 'Automated Weekly Slack/Email Summary Digest',
            why: 'Drives habitual team re-engagement without forcing users to log in every single day.',
            priority: 'High'
        }
    ],
    'FinTech': [
        {
            feature: 'Instant WhatsApp / SMS Payment Reminders',
            why: 'Customers pay 4x faster when payment links appear directly in mobile messaging apps.',
            priority: 'High'
        },
        {
            feature: 'Automated Tax / GST Ready Export',
            why: 'Accounting and compliance are top reasons business owners switch payment platforms.',
            priority: 'High'
        },
        {
            feature: 'Zero-Trust Role-Based Access Controls (RBAC)',
            why: 'Crucial security feature required to move upmarket to enterprise and institutional clients.',
            priority: 'Medium'
        }
    ],
    'HealthTech': [
        {
            feature: 'Daily Habit Streak & Micro-Reward Mechanism',
            why: 'Health tech fails when users drop off after day 14. Daily streaks keep retention above 60%.',
            priority: 'High'
        },
        {
            feature: 'HIPAA / Digital Health Data Export for Doctors',
            why: 'Users trust apps that easily share verified reports directly with their personal physicians.',
            priority: 'High'
        },
        {
            feature: 'Community Accountability Pods',
            why: 'Peer accountability improves patient outcome adherence by 35% compared to solo tracking.',
            priority: 'Medium'
        }
    ],
    'EdTech': [
        {
            feature: 'Bite-Sized 3-Minute Micro-Learning Cards',
            why: 'Long 60-minute video lectures have under 12% completion rates. Micro-modules 3x completion.',
            priority: 'High'
        },
        {
            feature: 'Peer Q&A Upvoting & Bounty Rewards',
            why: 'Crowdsources doubt-solving without hiring expensive full-time tutors.',
            priority: 'High'
        },
        {
            feature: 'Shareable LinkedIn / Resume Micro-Certificate',
            why: 'Students want proof of work to showcase to prospective recruiters.',
            priority: 'Medium'
        }
    ],
    'E-Commerce': [
        {
            feature: '1-Click Direct WhatsApp Ordering Loop',
            why: 'Bypasses cumbersome checkout carts and increases checkout conversion by up to 28%.',
            priority: 'High'
        },
        {
            feature: 'Personalized Smart Bundle Recommendations',
            why: 'Boosts Average Order Value (AOV) by recommending complementary add-on accessories at checkout.',
            priority: 'High'
        },
        {
            feature: 'Transparent Real-Time Inventory & Live Delivery Tracking',
            why: 'Reduces Customer Support ticket volume and "Where is my order" queries by over 50%.',
            priority: 'Medium'
        }
    ],
    'CleanTech': [
        {
            feature: 'Live Carbon Savings & Monetary ROI Calculator',
            why: 'Buyers commit faster when ecological impact is translated into tangible monetary dollars saved.',
            priority: 'High'
        },
        {
            feature: 'Automated Regulatory Compliance PDF Generator',
            why: 'Helps enterprise clients qualify for government green subsidies and ESG audits.',
            priority: 'High'
        }
    ],
    'Other': [
        {
            feature: 'Self-Serve Interactive Product Walkthrough',
            why: 'Reduces initial user confusion and speeds up time-to-first-value.',
            priority: 'High'
        },
        {
            feature: 'Public Product Roadmap with User Feature Voting',
            why: 'Turns early adopters into loyal evangelists who feel co-invested in your product.',
            priority: 'Medium'
        }
    ]
};

// Positive business keywords
const POSITIVE_INDICATORS = [
    'problem', 'solution', 'automate', 'recurring', 'subscription', 'save time',
    'b2b', 'api', 'platform', 'marketplace', 'efficiency', 'cost reduction',
    'workflow', 'customer', 'retention', 'niche', 'data', 'scale', 'revenue',
    'integration', 'security', 'verified', 'ai', 'cloud', 'direct'
];

const RISK_INDICATORS = [
    'uber for', 'next facebook', 'billion dollar', 'everyone will use',
    'no competitors', 'guaranteed', 'easy money', 'revolutionary secret'
];

const INDUSTRY_WEIGHTS = {
    'SaaS': 1.15,
    'FinTech': 1.10,
    'HealthTech': 1.12,
    'EdTech': 1.05,
    'CleanTech': 1.08,
    'E-Commerce': 0.95,
    'Other': 0.90
};

/**
 * Evaluates startup pitch, benchmarks against market competitors, and generates feature roadmap
 */
function evaluateStartupIdea(pitch = '', industry = 'Other', startupName = 'Your Project') {
    const text = pitch.toLowerCase();
    let baseScore = 50;

    // Feature 1: Depth analysis
    const wordCount = pitch.trim().split(/\s+/).length;
    if (wordCount >= 40) baseScore += 15;
    else if (wordCount >= 20) baseScore += 8;
    else baseScore -= 10;

    // Feature 2: Positive signal extraction
    let matchedPositive = [];
    POSITIVE_INDICATORS.forEach(word => {
        if (text.includes(word)) {
            matchedPositive.push(word);
            baseScore += 3;
        }
    });

    // Feature 3: Risk signal penalty
    let matchedRisks = [];
    RISK_INDICATORS.forEach(word => {
        if (text.includes(word)) {
            matchedRisks.push(word);
            baseScore -= 12;
        }
    });

    // Multiplier
    const multiplier = INDUSTRY_WEIGHTS[industry] || 1.0;
    let finalScore = Math.round(baseScore * multiplier);
    finalScore = Math.max(20, Math.min(96, finalScore));

    // Verdict
    let verdict = 'Needs Validation';
    let verdictClass = 'status-warning';
    if (finalScore >= 75) {
        verdict = 'High Potential (Viable)';
        verdictClass = 'status-success';
    } else if (finalScore >= 55) {
        verdict = 'Moderate Potential';
        verdictClass = 'status-info';
    }

    // 1. Benchmark Competitors
    const competitors = COMPETITOR_BENCHMARKS[industry] || COMPETITOR_BENCHMARKS['Other'];

    // 2. Feature Recommendations
    const recommendedFeatures = FEATURE_RECOMMENDATIONS[industry] || FEATURE_RECOMMENDATIONS['Other'];

    // 3. Strategic Differentiator advice
    const competitiveAdvantage = `To compete with existing players like ${competitors[0].name} and ${competitors[1].name}, ${startupName} should not try to copy all their features. Instead, win by being 10x faster or significantly more specialized for your initial niche.`;

    // 4. Actionable Improvement Suggestions
    const improvementTips = [];
    if (matchedPositive.length < 2) {
        improvementTips.push('Value Proposition: Explicitly state what measurable metric (e.g., hours saved, $ cost reduced) you improve for customers.');
    }
    if (!text.includes('customer') && !text.includes('user')) {
        improvementTips.push('Target Persona: Clearly define who is your ICP (Ideal Customer Profile) who has the budget to pay for this.');
    }
    improvementTips.push(`Differentiation Wedge: Focus on one killer workflow that ${competitors[0].name} overcomplicates.`);
    improvementTips.push('Distribution Strategy: Establish an organic distribution channel (e.g. open-source, niche community, or programmatic SEO).');

    return {
        score: finalScore,
        verdict,
        verdictClass,
        matchedKeywords: matchedPositive.slice(0, 4),
        competitors,
        recommendedFeatures,
        competitiveAdvantage,
        suggestions: improvementTips
    };
}

module.exports = { evaluateStartupIdea };
