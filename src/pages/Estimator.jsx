import React from 'react';
import EstimatorSliders from '../components/EstimatorSliders';

const Estimator = () => {
  return (
    <div>
      <div class="page-hero">
        <h1>Interactive Viability Estimator</h1>
        <p>Use our interactive range sliders to test capital allocation, target market scale, and launch horizons.</p>
      </div>

      <EstimatorSliders />
    </div>
  );
};

export default Estimator;
