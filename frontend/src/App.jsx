import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import SubmitIdea from './pages/SubmitIdea';
import DatabasePage from './pages/DatabasePage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import { api } from './services/api';

export default function App() {
    const [user, setUser] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);

    // Check active session on initial load
    useEffect(() => {
        api.getSession()
            .then((res) => {
                if (res.authenticated) {
                    setUser(res.user);
                }
            })
            .catch(() => setUser(null))
            .finally(() => setCheckingSession(false));
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
    };

    const handleLogout = async () => {
        await api.logout();
        setUser(null);
    };

    return (
        <div className="app-container">
            <Navbar user={user} onLogout={handleLogout} />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/submit" element={<SubmitIdea user={user} />} />
                    <Route path="/database" element={<DatabasePage user={user} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route
                        path="/login"
                        element={<AuthPage onLoginSuccess={handleLoginSuccess} />}
                    />
                    <Route
                        path="*"
                        element={
                            <div className="container section text-center">
                                <h2>404 - Page Not Found</h2>
                                <p>The requested page does not exist.</p>
                            </div>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
