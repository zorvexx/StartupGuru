import React from 'react';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} StartupGuru. All rights reserved. Fullstack MERN Architecture.</p>
            </div>
        </footer>
    );
}
