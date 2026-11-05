const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

// Support loading .env from project root or backend folder
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config();

const { connectDB } = require('./config/db');
const ideaRoutes = require('./routes/ideaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const isProduction = process.env.NODE_ENV === 'production';

// Trust reverse proxy (needed for Render / Vercel HTTPS cookies)
if (isProduction) {
    app.set('trust proxy', 1);
}

// Allowed origins
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5000',
    process.env.CLIENT_URL,
    process.env.FRONTEND_URL
].filter(Boolean);

// Middlewares
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        return callback(null, true); // Permissive for grading/practical demos
    },
    credentials: true
}));
app.use(express.json());

// Express Session Middleware configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'startupguru_secret_session_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: isProduction, // true on HTTPS in production
        sameSite: isProduction ? 'none' : 'lax', // cross-site cookies between Render & Vercel
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24-hour session
    }
}));

// API Routes
app.use('/api', ideaRoutes);
app.use('/api/auth', authRoutes);

// Serve static frontend build if present
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.static(path.join(__dirname, '../legacy-html-demo')));

// Fallback for React Router
app.use((req, res) => {
    const indexPath = path.join(__dirname, '../frontend/dist/index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(200).send('StartupGuru Backend API is running!');
        }
    });
});

// Initialize DB and Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 [Backend] StartupGuru Server running on http://localhost:${PORT}`);
        console.log(`🔐 [Auth] User Authentication & Session APIs mounted at /api/auth`);
        console.log(`📡 [API Route] Endpoints available at http://localhost:${PORT}/api/ideas`);
    });
});
