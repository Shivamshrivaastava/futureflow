import { useState } from 'react';
import { Menu, X, Clock, DollarSign } from 'lucide-react';
import './NavbarFooter.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '#' },
    { name: 'Scenarios', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'AI Advisor', href: '#' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Clock />
          <DollarSign />
          <span className="ml-2">Financial Time Machine</span>
        </div>

        <div className="navbar-links">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="navbar-link">
              {item.name}
            </a>
          ))}
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a key={item.name} href={item.href} className="mobile-link">
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
