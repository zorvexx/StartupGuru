import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useIdeas } from '../context/IdeasContext';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle2 } from 'lucide-react';

const SubmitIdea = () => {
  const { user } = useAuth();
  const { addIdea } = useIdeas();
  const navigate = useNavigate();

  const [founderName, setFounderName] = useState(user?.name || '');
  const [founderEmail, setFounderEmail] = useState(user?.email || '');
  const [startupName, setStartupName] = useState('');
  const [industry, setIndustry] = useState('');
  const [horizon, setHorizon] = useState(3);
  const [pitch, setPitch] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const errs = {};
    if (!founderName.trim()) errs.name = 'Please enter your name.';
    if (!founderEmail.trim()) errs.email = 'Please enter your email.';
    if (!startupName.trim()) errs.startup = 'Please enter your startup name.';
    if (!industry) errs.industry = 'Please select an industry.';
    if (!pitch.trim() || pitch.trim().length < 20) errs.pitch = 'Please describe your idea (min. 20 characters).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addIdea({
      startupName: startupName.trim(),
      industry,
      horizon: String(horizon),
      pitch: pitch.trim(),
      userEmail: founderEmail.trim(),
      userName: founderName.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate('/profile');
    }, 1800);
  };

  const getGradientStyle = (val, min, max) => {
    const pct = ((val - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #f39c12 0%, #f39c12 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
    };
  };

  if (submitted) {
    return (
      <div class="form-container" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <CheckCircle2 size={56} color="#27ae60" style={{ marginBottom: '15px' }} />
        <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>Idea Submitted Successfully!</h2>
        <p style={{ fontSize: '15px', color: '#555' }}>
          Your idea has been saved to your profile history. Redirecting to your profile dashboard...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div class="page-hero">
        <h1>Submit Your Startup Idea</h1>
        <p>Provide your concept details below to save it to your founder profile and receive structured insights.</p>
      </div>

      <div class="form-container">
        <h2 style={{ color: '#2c3e50', marginBottom: '8px' }}>Idea Evaluation Form</h2>
        <p style={{ color: '#666', marginBottom: '22px', fontSize: '14px' }}>Fill in the details for founder-level feedback.</p>

        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label htmlFor="founderName">Your Name:</label>
            <input
              type="text"
              id="founderName"
              placeholder="Enter your full name"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
            />
            {errors.name && <span class="error-msg">{errors.name}</span>}
          </div>

          <div class="form-group">
            <label htmlFor="founderEmail">Email Address:</label>
            <input
              type="email"
              id="founderEmail"
              placeholder="Enter your email"
              value={founderEmail}
              onChange={(e) => setFounderEmail(e.target.value)}
            />
            {errors.email && <span class="error-msg">{errors.email}</span>}
          </div>

          <div class="form-group">
            <label htmlFor="startupName">Startup Name / Working Title:</label>
            <input
              type="text"
              id="startupName"
              placeholder="e.g. StudySwap"
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
            />
            {errors.startup && <span class="error-msg">{errors.startup}</span>}
          </div>

          <div class="form-group">
            <label htmlFor="industry">Industry:</label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">-- Select Industry --</option>
              <option value="EdTech">EdTech (Education)</option>
              <option value="FinTech">FinTech (Finance)</option>
              <option value="HealthTech">Health & Wellness</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="SaaS">SaaS & Software</option>
              <option value="Other">Other</option>
            </select>
            {errors.industry && <span class="error-msg">{errors.industry}</span>}
          </div>

          <div class="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label htmlFor="horizon">Target Launch Horizon (Months):</label>
              <span class="slider-value">{horizon} {horizon === 1 ? 'Month' : 'Months'}</span>
            </div>
            <input
              type="range"
              id="horizon"
              min="1"
              max="12"
              value={horizon}
              onChange={(e) => setHorizon(Number(e.target.value))}
              class="custom-slider"
              style={getGradientStyle(horizon, 1, 12)}
            />
          </div>

          <div class="form-group">
            <label htmlFor="pitch">Problem & Solution Description:</label>
            <textarea
              id="pitch"
              rows={4}
              placeholder="Briefly describe what problem you are solving and how..."
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
            />
            {errors.pitch && <span class="error-msg">{errors.pitch}</span>}
          </div>

          <button type="submit" class="btn btn-secondary" style={{ width: '100%', padding: '12px', marginTop: '10px' }}>
            <Send size={16} /> Submit Idea
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitIdea;
