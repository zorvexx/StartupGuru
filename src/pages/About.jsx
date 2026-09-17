import React from 'react';
import { Target, Rocket, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div>
      <div class="page-hero">
        <h1>About StartupGuru</h1>
        <p>Empowering early-stage founders and innovators with practical, data-driven validation.</p>
      </div>

      <div class="form-container">
        <h2 style={{ color: '#2c3e50', marginBottom: '12px', fontSize: '22px' }}>Our Mission</h2>
        <p style={{ marginBottom: '20px', color: '#555', fontSize: '15px' }}>
          StartupGuru was built with a single goal: to help aspiring entrepreneurs, creators, and students evaluate their business concepts early on before making heavy capital investments.
        </p>

        <h3 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '18px' }}>Why Early Validation Matters</h3>
        <p style={{ marginBottom: '20px', color: '#555', fontSize: '15px' }}>
          Over 80% of new startup failures stem from building products without verifying actual market demand. StartupGuru bridges that gap by offering structured evaluation criteria across feasibility, demand, timing, and monetizability.
        </p>

        <div class="cards-grid" style={{ marginTop: '25px' }}>
          <div class="card">
            <h3><Target size={20} color="#2c3e50" /> Objective Analysis</h3>
            <p>Receive unbiased feedback focused on execution mechanics, technical requirements, and market realities.</p>
          </div>
          <div class="card">
            <h3><Rocket size={20} color="#2c3e50" /> Founder First</h3>
            <p>We prioritize founder growth, offering actionable insights rather than generic advice.</p>
          </div>
          <div class="card">
            <h3><ShieldCheck size={20} color="#2c3e50" /> Risk Mitigation</h3>
            <p>Identify critical bottlenecks early before spending months on development and marketing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
