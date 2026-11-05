const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getSession,
    logout,
    getAllUsers
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/session', getSession);
router.post('/logout', logout);
router.get('/users', getAllUsers);

module.exports = router;
