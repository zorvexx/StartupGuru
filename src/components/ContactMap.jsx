import React from 'react';
import { MapPin, Mail, Clock, Phone } from 'lucide-react';

const ContactMap = () => {
  return (
    <div class="contact-grid">
      <div class="map-card">
        <h3>
          <MapPin size={20} color="#2c3e50" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          Headquarters Info
        </h3>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '14px' }}>
          Our advisory hub provides virtual and on-site evaluation sessions for founders.
        </p>

        <ul style={{ listStyle: 'none' }}>
          <li style={{ fontSize: '14px', marginBottom: '10px', color: '#475569' }}>
            <strong>Address:</strong> 100 Innovation Boulevard, Tech Park, CA 94025
          </li>
          <li style={{ fontSize: '14px', marginBottom: '10px', color: '#475569' }}>
            <strong>Email:</strong> support@startupguru.local
          </li>
          <li style={{ fontSize: '14px', marginBottom: '10px', color: '#475569' }}>
            <strong>Hours:</strong> Mon - Fri: 9:00 AM - 6:00 PM PST
          </li>
        </ul>
      </div>

      <div class="map-card">
        <h3>Interactive Location Map</h3>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>
          Explore our HQ location on the interactive map below:
        </p>

        <div class="map-container">
          <iframe
            class="map-iframe"
            title="StartupGuru Office Location Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-122.18%2C37.42%2C-122.12%2C37.46&amp;layer=mapnik&amp;marker=37.4419%2C-122.15"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
