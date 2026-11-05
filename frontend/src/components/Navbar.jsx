import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await onLogout();
        navigate('/login');
    };

    return (
        <header className="site-header">
            <nav className="navbar container">
                <div className="logo">
                    Startup<span>Guru</span>
                </div>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/submit" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Submit Idea
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/database" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Live Database
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                            About
                        </NavLink>
                    </li>

                    {/* Authentication state indicator */}
                    {user ? (
                        <li className="user-nav-item">
                            <span className="user-greeting">👋 {user.name} ({user.role})</span>
                            <button className="btn-nav-logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li>
                            <NavLink to="/login" className="nav-login-btn">
                                🔐 Login / Register
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
