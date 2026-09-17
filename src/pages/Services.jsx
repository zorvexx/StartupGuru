import React from 'react';
import { Cpu, Users, TrendingUp, DollarSign } from 'lucide-react';

const Services = () => {
  return (
    <div>
      <div class="page-hero">
        <h1>Evaluation Services</h1>
        <p>Four core evaluation pillars designed to test and optimize your startup concept.</p>
      </div>

      <div class="cards-grid">
        <div class="card">
          <h3><Cpu size={20} color="#2c3e50" /> 1. Feasibility Analysis</h3>
          <p>Evaluating whether your idea is technically buildable, resource-efficient, and practical within your proposed timeline.</p>
        </div>
        <div class="card">
          <h3><Users size={20} color="#2c3e50" /> 2. Market Demand</h3>
          <p>Assessing target audience pain points, total addressable market (TAM), and existing competitor positioning.</p>
        </div>
        <div class="card">
          <h3><TrendingUp size={20} color="#2c3e50" /> 3. Timing & Relevance</h3>
          <p>Checking macro tech trends, regulatory adoption, and economic timing to maximize launch success momentum.</p>
        </div>
        <div class="card">
          <h3><DollarSign size={20} color="#2c3e50" /> 4. Business Model</h3>
          <p>Reviewing unit economics, customer acquisition cost (CAC) vs lifetime value (LTV), and sustainable revenue streams.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
