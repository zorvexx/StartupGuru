const Idea = require('../models/Idea');
const { getDBStatus } = require('../config/db');
const { evaluateStartupIdea } = require('../utils/mlModel');

// In-memory demo fallback storage
let memoryIdeas = [
    {
        _id: 'demo-1',
        founderName: 'Aarav Sharma',
        founderEmail: 'aarav@eduflow.io',
        startupName: 'EduFlow',
        industry: 'EdTech',
        pitch: 'AI-driven peer learning platform connecting college students for interactive problem solving and retention.',
        status: 'Reviewed',
        mlEvaluation: evaluateStartupIdea(
            'AI-driven peer learning platform connecting college students for interactive problem solving and retention.',
            'EdTech',
            'EduFlow'
        ),
        createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
        _id: 'demo-2',
        founderName: 'Priya Nair',
        founderEmail: 'priya@payease.dev',
        startupName: 'PayEase',
        industry: 'FinTech',
        pitch: 'Smart automated invoice reconciliation for local freelancers and SME retail vendors to save time.',
        status: 'Under Review',
        mlEvaluation: evaluateStartupIdea(
            'Smart automated invoice reconciliation for local freelancers and SME retail vendors to save time.',
            'FinTech',
            'PayEase'
        ),
        createdAt: new Date(Date.now() - 43200000).toISOString()
    }
];

// Helper to ensure every document always has rich ML evaluation data
const ensureMLEvaluation = (idea) => {
    const doc = idea.toObject ? idea.toObject() : { ...idea };
    if (!doc.mlEvaluation || !doc.mlEvaluation.competitors || doc.mlEvaluation.competitors.length === 0) {
        doc.mlEvaluation = evaluateStartupIdea(doc.pitch || '', doc.industry || 'Other', doc.startupName || 'Your Startup');
    }
    return doc;
};

// GET /api/ideas - Retrieve all startup ideas
exports.getAllIdeas = async (req, res) => {
    try {
        if (getDBStatus()) {
            const ideas = await Idea.find().sort({ createdAt: -1 });
            const enriched = ideas.map(ensureMLEvaluation);
            return res.status(200).json(enriched);
        }
        res.status(200).json(memoryIdeas.map(ensureMLEvaluation));
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch ideas', details: err.message });
    }
};

// GET /api/ideas/:id - Retrieve single idea
exports.getIdeaById = async (req, res) => {
    try {
        const { id } = req.params;
        if (getDBStatus()) {
            const idea = await Idea.findById(id);
            if (!idea) return res.status(404).json({ error: 'Idea not found' });
            return res.status(200).json(ensureMLEvaluation(idea));
        }
        const idea = memoryIdeas.find(item => item._id === id);
        if (!idea) return res.status(404).json({ error: 'Idea not found' });
        res.status(200).json(ensureMLEvaluation(idea));
    } catch (err) {
        res.status(500).json({ error: 'Error fetching idea', details: err.message });
    }
};

// POST /api/ideas - Create new startup idea with deep ML evaluation
exports.createIdea = async (req, res) => {
    try {
        const { founderName, founderEmail, startupName, industry, pitch } = req.body;

        if (!founderName || !founderEmail || !startupName || !industry || !pitch) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Run full intelligence & competitor benchmark model
        const mlEvaluation = evaluateStartupIdea(pitch, industry, startupName);

        if (getDBStatus()) {
            const newIdea = new Idea({
                founderName,
                founderEmail,
                startupName,
                industry,
                pitch,
                mlEvaluation
            });
            const saved = await newIdea.save();
            return res.status(201).json({
                success: true,
                message: 'Idea saved to MongoDB Atlas with Competitor Benchmark & Feature Roadmap!',
                data: saved,
                mlEvaluation
            });
        }

        // In-memory fallback
        const saved = {
            _id: 'demo-' + (memoryIdeas.length + 1),
            founderName,
            founderEmail,
            startupName,
            industry,
            pitch,
            status: 'Under Review',
            mlEvaluation,
            createdAt: new Date().toISOString()
        };
        memoryIdeas.unshift(saved);
        res.status(201).json({
            success: true,
            message: 'Idea saved with Competitor Benchmark & Feature Roadmap (Demo mode)!',
            data: saved,
            mlEvaluation
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create idea', details: err.message });
    }
};

// DELETE /api/ideas/:id - Remove an idea
exports.deleteIdea = async (req, res) => {
    try {
        const { id } = req.params;
        if (getDBStatus()) {
            await Idea.findByIdAndDelete(id);
        } else {
            memoryIdeas = memoryIdeas.filter(item => item._id !== id);
        }
        res.status(200).json({ success: true, message: 'Idea removed successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete idea', details: err.message });
    }
};

// GET /api/status - Health check
exports.getStatus = (req, res) => {
    const isLive = getDBStatus();
    res.status(200).json({
        backend: 'Connected & Healthy',
        database: isLive ? 'MongoDB Atlas (Live Cloud)' : 'In-Memory Demo Database',
        isAtlasConnected: isLive,
        serverTime: new Date().toISOString()
    });
};
