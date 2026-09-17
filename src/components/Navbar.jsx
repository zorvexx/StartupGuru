import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <nav class="navbar">
        <NavLink to="/" class="logo">
          <Rocket size={24} color="#f39c12" />
          Startup<span class="logo-accent">Guru</span>
        </NavLink>

        <ul class="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/showcase">Showcase</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/estimator">Estimator</NavLink></li>
          <li><NavLink to="/submit">Submit Idea</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
        </ul>

        {user && (
          <div class="user-nav">
            <span class="user-greeting">Welcome, {user.name}</span>
            <button onClick={logout} class="btn-logout" title="Logout">
              <LogOut size={14} style={{ marginRight: '4px' }} />
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
