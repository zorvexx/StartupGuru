import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User as UserIcon } from 'lucide-react';

const AuthModal = () => {
  const { login, register } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);

  // Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regErrs, setRegErrs] = useState({});

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginErr('');

    if (!loginEmail || !loginPassword) {
      setLoginErr('Please enter both email and password.');
      return;
    }

    const result = login(loginEmail, loginPassword);
    if (!result.success) {
      setLoginErr(result.message);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegErrs({});

    const errors = {};
    if (!regName.trim()) errors.name = 'Please enter your full name.';
    if (!regEmail.trim()) errors.email = 'Please enter your email.';
    if (!regPassword) errors.password = 'Please create a password.';
    else if (regPassword.length < 6) errors.password = 'Min. 6 characters required.';

    if (regPassword !== regConfirm) errors.confirm = 'Passwords do not match.';

    if (Object.keys(errors).length > 0) {
      setRegErrs(errors);
      return;
    }

    const result = register(regName.trim(), regEmail.trim(), regPassword);
    if (!result.success) {
      setRegErrs({ global: result.message });
    }
  };

  return (
    <div class="auth-overlay">
      <div class="auth-modal">
        <div class="auth-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#2c3e50' }}>StartupGuru</div>
          <p style={{ fontSize: '14px', color: '#555', marginTop: '4px' }}>
            Sign in or create an account to access StartupGuru insights.
          </p>
        </div>

        <div class="auth-tabs">
          <button
            type="button"
            class={`auth-tab ${isLoginTab ? 'active' : ''}`}
            onClick={() => setIsLoginTab(true)}
          >
            Log In
          </button>
          <button
            type="button"
            class={`auth-tab ${!isLoginTab ? 'active' : ''}`}
            onClick={() => setIsLoginTab(false)}
          >
            Register
          </button>
        </div>

        {isLoginTab ? (
          <form onSubmit={handleLoginSubmit}>
            <div class="form-group">
              <label htmlFor="loginEmail">Email Address:</label>
              <input
                type="email"
                id="loginEmail"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div class="form-group">
              <label htmlFor="loginPassword">Password:</label>
              <input
                type="password"
                id="loginPassword"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            {loginErr && <span class="error-msg" style={{ textAlign: 'center', marginBottom: '10px' }}>{loginErr}</span>}

            <button type="submit" class="btn btn-secondary" style={{ width: '100%', padding: '12px' }}>
              Log In
            </button>

            <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
              Don't have an account?{' '}
              <a href="#register" onClick={(e) => { e.preventDefault(); setIsLoginTab(false); }} style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                Register here
              </a>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div class="form-group">
              <label htmlFor="regName">Full Name:</label>
              <input
                type="text"
                id="regName"
                placeholder="Enter your full name"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
              />
              {regErrs.name && <span class="error-msg">{regErrs.name}</span>}
            </div>

            <div class="form-group">
              <label htmlFor="regEmail">Email Address:</label>
              <input
                type="email"
                id="regEmail"
                placeholder="Enter your email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
              {regErrs.email && <span class="error-msg">{regErrs.email}</span>}
            </div>

            <div class="form-group">
              <label htmlFor="regPassword">Password:</label>
              <input
                type="password"
                id="regPassword"
                placeholder="Create a password (min 6 chars)"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
              {regErrs.password && <span class="error-msg">{regErrs.password}</span>}
            </div>

            <div class="form-group">
              <label htmlFor="regConfirm">Confirm Password:</label>
              <input
                type="password"
                id="regConfirm"
                placeholder="Re-enter your password"
                value={regConfirm}
                onChange={(e) => setRegConfirm(e.target.value)}
              />
              {regErrs.confirm && <span class="error-msg">{regErrs.confirm}</span>}
            </div>

            {regErrs.global && <span class="error-msg" style={{ textAlign: 'center', marginBottom: '10px' }}>{regErrs.global}</span>}

            <button type="submit" class="btn btn-secondary" style={{ width: '100%', padding: '12px' }}>
              Create Account
            </button>

            <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
              Already have an account?{' '}
              <a href="#login" onClick={(e) => { e.preventDefault(); setIsLoginTab(true); }} style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                Log In here
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
