import { Link, useNavigate } from 'react-router-dom';
import './NavbarFooter.css';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Home', href: '/' },
    { name: 'Try AI Planning', href: '/dashboard-home' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('futureflow-user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('futureflow-user');
    setUser(null);
    navigate('/launch-dashboard');
  };

  return (
    <nav className="navbar shadow-md">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo space-x-2 flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc7jSabbD25622W9cNNBZWeG3HZFm8Gt48tw"
            alt="FutureFlow logo"
            className="w-8 h-8 rounded-md shadow-md border border-white"
          />
          <span>FutureFlow</span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-links flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="navbar-link hover:scale-105 transition-transform duration-200"
            >
              {item.name}
            </Link>
          ))}

          {/* User Avatar */}
          {user && (
            <div className="relative group">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white shadow cursor-pointer"
                title={user.email}
              />
              <div className="absolute right-0 mt-2 bg-white text-sm text-gray-700 border rounded shadow hidden group-hover:block z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-red-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="mobile-link hover:bg-indigo-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        {user && (
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleLogout();
            }}
            className="mobile-link text-red-400 hover:text-white"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
