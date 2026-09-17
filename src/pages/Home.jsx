import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Layers, Sliders, Lightbulb, UserCheck, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section class="page-hero">
        <h1>Get Honest Feedback on Your Startup Idea</h1>
        <p>
          Share your idea and receive practical, human-driven insights on market feasibility, target audience, and next steps.
        </p>
        <div style={{ marginTop: '20px' }}>
          <Link to="/submit" class="btn">
            Submit Your Idea <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Feature Navigation Cards */}
      <section style={{ marginTop: '30px' }}>
        <h2 style={{ fontSize: '22px', color: '#2c3e50', marginBottom: '15px' }}>
          Explore StartupGuru Tools & Services
        </h2>
        <div class="cards-grid">
          <div class="card">
            <h3><BookOpen size={20} color="#2c3e50" /> About Us</h3>
            <p>Learn about our mission to help early-stage founders validate their concepts before spending capital.</p>
            <Link to="/about" class="btn btn-secondary" style={{ marginTop: '10px' }}>
              Learn More
            </Link>
          </div>

          <div class="card">
            <h3><Award size={20} color="#2c3e50" /> Success Showcase</h3>
            <p>Explore real founder stories and testimonials from successful startups evaluated on StartupGuru.</p>
            <Link to="/showcase" class="btn btn-secondary" style={{ marginTop: '10px' }}>
              View Stories
            </Link>
          </div>

          <div class="card">
            <h3><Layers size={20} color="#2c3e50" /> Evaluation Services</h3>
            <p>Discover our core evaluation pillars: Feasibility Analysis, Market Demand, Timing & Business Models.</p>
            <Link to="/services" class="btn btn-secondary" style={{ marginTop: '10px' }}>
              View Services
            </Link>
          </div>

          <div class="card">
            <h3><Sliders size={20} color="#2c3e50" /> Interactive Estimator</h3>
            <p>Calculate your startup's viability score using our dynamic budget, user market, and timeline sliders.</p>
            <Link to="/estimator" class="btn btn-secondary" style={{ marginTop: '10px' }}>
              Try Estimator
            </Link>
          </div>

          <div class="card">
            <h3><Lightbulb size={20} color="#2c3e50" /> Submit Your Idea</h3>
            <p>Ready for a founder-level analysis? Fill in your startup details and get structured feedback.</p>
            <Link to="/submit" class="btn btn-secondary" style={{ marginTop: '10px' }}>
              Submit Idea
            </Link>
          </div>

          <div class="card">
            <h3><UserCheck size={20} color="#2c3e50" /> Founder Profile</h3>
            <p>View your account info, manage your profile, and see all your past submitted startup ideas.</p>
            <Link to="/profile" class="btn btn-secondary" style={{ marginTop: '10px' }}>
              Go to Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section Teaser */}
      <section style={{ background: '#ffffff', border: '1px solid #ddd', borderRadius: '8px', padding: '25px', textAlign: 'center', marginTop: '35px' }}>
        <h2 style={{ fontSize: '20px', color: '#2c3e50', marginBottom: '8px' }}>Questions or Business Inquiries?</h2>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '14px' }}>Visit our dedicated contact page with interactive location map details.</p>
        <Link to="/contact" class="btn">
          Contact & Location Map
        </Link>
      </section>
    </div>
  );
};

export default Home;
