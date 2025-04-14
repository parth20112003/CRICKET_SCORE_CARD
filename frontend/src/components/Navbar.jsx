import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full">
      {/* Top bar with logo */}
      <div className="bg-cricinfo py-3 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="CricScore" className="h-10" />
            </Link>

            {/* Search bar - desktop only */}
            <div className="hidden md:block w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search teams, players, matches..."
                  className="w-full py-2 pl-4 pr-10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-cricinfo"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex">
            <Link
              to="/"
              className={`px-5 py-4 text-sm font-medium ${isActive('/') ? 'text-cricinfo border-b-2 border-cricinfo' : 'text-gray-700 hover:text-cricinfo'}`}
            >
              Home
            </Link>
            <Link
              to="/teams"
              className={`px-5 py-4 text-sm font-medium ${isActive('/teams') ? 'text-cricinfo border-b-2 border-cricinfo' : 'text-gray-700 hover:text-cricinfo'}`}
            >
              Teams
            </Link>
            <Link
              to="/admin"
              className={`px-5 py-4 text-sm font-medium ${isActive('/admin') ? 'text-cricinfo border-b-2 border-cricinfo' : 'text-gray-700 hover:text-cricinfo'}`}
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col">
              <Link
                to="/"
                className={`py-3 px-4 ${isActive('/') ? 'text-cricinfo font-medium' : 'text-gray-700'} border-b border-gray-100`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/teams"
                className={`py-3 px-4 ${isActive('/teams') ? 'text-cricinfo font-medium' : 'text-gray-700'} border-b border-gray-100`}
                onClick={() => setIsMenuOpen(false)}
              >
                Teams
              </Link>
              <Link
                to="/admin"
                className={`py-3 px-4 ${isActive('/admin') ? 'text-cricinfo font-medium' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>

              {/* Mobile search */}
              <div className="py-3 px-4 border-t border-gray-100 mt-2">
                <input
                  type="text"
                  placeholder="Search teams, players, matches..."
                  className="w-full py-2 px-4 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cricinfo"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
