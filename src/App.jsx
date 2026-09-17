import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

import Home from './pages/Home';
import About from './pages/About';
import Showcase from './pages/Showcase';
import Services from './pages/Services';
import Estimator from './pages/Estimator';
import SubmitIdea from './pages/SubmitIdea';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

const App = () => {
  const { user } = useAuth();

  return (
    <div class="app-container">
      {!user && <AuthModal />}

      <Navbar />

      <main class="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/services" element={<Services />} />
          <Route path="/estimator" element={<Estimator />} />
          <Route path="/submit" element={<SubmitIdea />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
