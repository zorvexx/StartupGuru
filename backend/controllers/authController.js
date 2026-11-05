const User = require('../models/User');
const { getDBStatus } = require('../config/db');
const bcrypt = require('bcryptjs');

// In-memory demo fallback users
let memoryUsers = [
    {
        _id: 'user-demo-1',
        name: 'Demo Founder',
        email: 'founder@startupguru.com',
        password: '$2a$10$DEMOHASHEDPASSWORDSAMPLE',
        role: 'Founder',
        createdAt: new Date().toISOString()
    }
];

// POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if user exists
        if (getDBStatus()) {
            const existing = await User.findOne({ email: normalizedEmail });
            if (existing) {
                return res.status(400).json({ error: 'An account with this email already exists.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                name: name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
                role: role || 'Founder'
            });

            const saved = await newUser.save();

            // Set session
            req.session.user = {
                id: saved._id,
                name: saved.name,
                email: saved.email,
                role: saved.role
            };

            return res.status(201).json({
                success: true,
                message: 'Account created successfully and saved to MongoDB Atlas!',
                user: req.session.user
            });
        }

        // In-memory mode fallback
        const existing = memoryUsers.find(u => u.email === normalizedEmail);
        if (existing) {
            return res.status(400).json({ error: 'An account with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            _id: 'user-' + (memoryUsers.length + 1),
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: role || 'Founder',
            createdAt: new Date().toISOString()
        };
        memoryUsers.push(newUser);

        req.session.user = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };

        res.status(201).json({
            success: true,
            message: 'Registered in demo session mode!',
            user: req.session.user
        });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed', details: err.message });
    }
};

// POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const normalizedEmail = email.toLowerCase().trim();

        if (getDBStatus()) {
            const user = await User.findOne({ email: normalizedEmail });
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }

            // Create server session
            req.session.user = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };

            return res.status(200).json({
                success: true,
                message: 'Login successful! Session established.',
                user: req.session.user
            });
        }

        // Fallback in-memory
        const user = memoryUsers.find(u => u.email === normalizedEmail);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.status(200).json({
            success: true,
            message: 'Logged in successfully!',
            user: req.session.user
        });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
};

// GET /api/auth/session - Verify active session
exports.getSession = (req, res) => {
    if (req.session && req.session.user) {
        return res.status(200).json({
            authenticated: true,
            sessionID: req.sessionID,
            user: req.session.user
        });
    }
    res.status(200).json({
        authenticated: false,
        user: null
    });
};

// POST /api/auth/logout - Destroy session
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Logged out and session terminated.' });
    });
};

// GET /api/auth/users - Retrieve all users for the Database Dashboard table
exports.getAllUsers = async (req, res) => {
    try {
        if (getDBStatus()) {
            const users = await User.find().select('-password').sort({ createdAt: -1 });
            return res.status(200).json(users);
        }
        const safe = memoryUsers.map(({ password, ...u }) => u);
        res.status(200).json(safe);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
};
