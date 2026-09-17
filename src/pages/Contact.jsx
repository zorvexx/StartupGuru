import React from 'react';
import ContactMap from '../components/ContactMap';

const Contact = () => {
  return (
    <div>
      <div class="page-hero">
        <h1>Contact Us & HQ Location</h1>
        <p>Reach out to our team or locate our founder evaluation center on the map below.</p>
      </div>

      <div class="form-container">
        <h2 style={{ color: '#2c3e50', marginBottom: '8px', fontSize: '22px' }}>Get in Touch</h2>
        <p style={{ color: '#555', marginBottom: '20px', fontSize: '15px' }}>
          Have questions, partnership inquiries, or need support? Send an email to{' '}
          <a href="mailto:support@startupguru.local" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
            support@startupguru.local
          </a>.
        </p>

        <ContactMap />
      </div>
    </div>
  );
};

export default Contact;
