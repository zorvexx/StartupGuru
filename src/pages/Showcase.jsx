import React from 'react';
import ShowcaseCarousel from '../components/ShowcaseCarousel';

const Showcase = () => {
  return (
    <div>
      <div class="page-hero">
        <h1>Founder Showcase & Case Studies</h1>
        <p>Real stories of early-stage startups that validated and launched with StartupGuru insights.</p>
      </div>

      <ShowcaseCarousel />
    </div>
  );
};

export default Showcase;
