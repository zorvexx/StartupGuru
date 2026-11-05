const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    feature: String,
    why: String,
    priority: String
}, { _id: false });

const competitorSchema = new mongoose.Schema({
    name: String,
    focus: String,
    edge: String
}, { _id: false });

const ideaSchema = new mongoose.Schema({
    founderName: {
        type: String,
        required: [true, 'Founder name is required'],
        trim: true
    },
    founderEmail: {
        type: String,
        required: [true, 'Founder email is required'],
        trim: true,
        lowercase: true
    },
    startupName: {
        type: String,
        required: [true, 'Startup name is required'],
        trim: true
    },
    industry: {
        type: String,
        required: [true, 'Industry category is required']
    },
    pitch: {
        type: String,
        required: [true, 'Pitch description is required']
    },
    status: {
        type: String,
        default: 'Under Review'
    },
    mlEvaluation: {
        score: { type: Number, default: 50 },
        verdict: { type: String, default: 'Pending Evaluation' },
        verdictClass: { type: String, default: 'status-info' },
        competitiveAdvantage: { type: String },
        competitors: [competitorSchema],
        recommendedFeatures: [featureSchema],
        suggestions: [{ type: String }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'StartupGuru'
});

module.exports = mongoose.model('Idea', ideaSchema, 'StartupGuru');
