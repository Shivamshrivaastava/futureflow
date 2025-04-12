import { Github, Twitter, Linkedin } from 'lucide-react';
import './NavbarFooter.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Financial Time Machine</h3>
            <p>
              Visualize your financial future and make better decisions today.
            </p>
          </div>

          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li><a href="#">What-if Scenarios</a></li>
              <li><a href="#">Behavior Analytics</a></li>
              <li><a href="#">AI Advisor</a></li>
              <li><a href="#">Past Analysis</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#"><Github /></a>
              <a href="#"><Twitter /></a>
              <a href="#"><Linkedin /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Financial Time Machine. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
