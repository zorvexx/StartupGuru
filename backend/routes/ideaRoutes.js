const express = require('express');
const router = express.Router();
const {
    getAllIdeas,
    getIdeaById,
    createIdea,
    deleteIdea,
    getStatus
} = require('../controllers/ideaController');

// Router endpoints
router.get('/status', getStatus);
router.get('/ideas', getAllIdeas);
router.get('/ideas/:id', getIdeaById);
router.post('/ideas', createIdea);
router.delete('/ideas/:id', deleteIdea);

module.exports = router;
