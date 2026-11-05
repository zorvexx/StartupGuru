import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function AuthPage({ onLoginSuccess }) {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Founder'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isRegister) {
                const res = await api.register(formData);
                setMessage(res.message);
                onLoginSuccess(res.user);
                setTimeout(() => navigate('/database'), 1000);
            } else {
                const res = await api.login({
                    email: formData.email,
                    password: formData.password
                });
                setMessage(res.message);
                onLoginSuccess(res.user);
                setTimeout(() => navigate('/database'), 800);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container section">
            <div className="form-container auth-card">
                <div className="section-header">
                    <h2>{isRegister ? 'Create Founder Account' : 'Founder Login'}</h2>
                    <p>
                        {isRegister
                            ? 'Registers user in MongoDB Atlas "Users" table & starts secure HTTP session'
                            : 'Authenticates with MongoDB password hash and establishes session'}
                    </p>
                </div>

                {message && <div className="alert-success">✅ {message}</div>}
                {error && <div className="alert-error">⚠️ {error}</div>}

                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <div className="form-group">
                            <label htmlFor="name">Full Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="e.g. Alex Morgan"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="e.g. alex@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password..."
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {isRegister && (
                        <div className="form-group">
                            <label htmlFor="role">Account Role:</label>
                            <select id="role" name="role" value={formData.role} onChange={handleChange}>
                                <option value="Founder">Founder / Builder</option>
                                <option value="Investor">Angel / VC Investor</option>
                                <option value="Mentor">Startup Mentor</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" className="btn btn-submit" disabled={loading}>
                        {loading
                            ? 'Connecting to Server...'
                            : isRegister
                            ? '🚀 Register & Start Session'
                            : '🔐 Login to Account'}
                    </button>
                </form>

                <div className="auth-toggle">
                    {isRegister ? (
                        <p>
                            Already have an account?{' '}
                            <button className="btn-link" onClick={() => setIsRegister(false)}>
                                Login here
                            </button>
                        </p>
                    ) : (
                        <p>
                            Don't have an account yet?{' '}
                            <button className="btn-link" onClick={() => setIsRegister(true)}>
                                Create account
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
