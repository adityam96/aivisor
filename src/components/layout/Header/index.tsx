import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn: boolean;
  userRole?: 'user' | 'creator' | 'admin';
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  userRole = 'user',
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 10;
      
      // Close mobile menu when scrolling up
      if (mobileMenuOpen && currentScrollY < lastScrollY && currentScrollY > 50) {
        setMobileMenuOpen(false);
      }

      // Close mobile menu when scrolling down
      if (mobileMenuOpen && currentScrollY > lastScrollY && currentScrollY > 50) {
        setMobileMenuOpen(false);
      }
      
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, mobileMenuOpen, lastScrollY]);

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Handle logout and close menu
  const handleLogout = () => {
    closeMobileMenu();
    if (onLogout) {
      onLogout();
    }
  };
  
  return (
    <header className={`${scrolled ? 'bg-blue-600/90 backdrop-blur-sm' : 'bg-blue-600'} text-white shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <img src={`${process.env.PUBLIC_URL}/images/aivisor_logo_light_blue.png`} alt="Aivisor Logo" className="h-12" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/tools" className="px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-colors">Explore Tools</Link>
            <Link to="/blog" className="px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-colors">Blog</Link>
            <Link to="/creators" className="px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-colors">Creators</Link>
            <Link to="/about" className="px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-colors">About Us</Link>
          </nav>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search AI tools..."
                className="pl-10 pr-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <div className="absolute left-3 top-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {userRole === 'creator' && (
                  <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                    Dashboard
                  </Link>
                )}
                {userRole === 'admin' && (
                  <Link to="/admin" className="hover:text-blue-200 transition-colors">
                    Admin
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
                    <span>Account</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                    <Link to="/messages" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Messages</Link>
                    <button 
                      onClick={onLogout} 
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link>
                <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">Register</Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  className="w-full pl-10 pr-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute left-3 top-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <nav className="flex flex-col space-y-3">
              <Link to="/tools" className="px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-colors" onClick={closeMobileMenu}>Explore Tools</Link>
              <Link to="/blog" className="px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-colors" onClick={closeMobileMenu}>Blog</Link>
              <Link to="/creators" className="px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-colors" onClick={closeMobileMenu}>Creators</Link>
              <Link to="/about" className="px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-colors" onClick={closeMobileMenu}>About Us</Link>
              
              {isLoggedIn ? (
                <>
                  {userRole === 'creator' && (
                    <Link to="/dashboard" className="hover:text-blue-200 transition-colors" onClick={closeMobileMenu}>
                      Dashboard
                    </Link>
                  )}
                  {userRole === 'admin' && (
                    <Link to="/admin" className="hover:text-blue-200 transition-colors" onClick={closeMobileMenu}>
                      Admin
                    </Link>
                  )}
                  <Link to="/profile" className="hover:text-blue-200 transition-colors" onClick={closeMobileMenu}>Profile</Link>
                  <Link to="/messages" className="hover:text-blue-200 transition-colors" onClick={closeMobileMenu}>Messages</Link>
                  <button 
                    onClick={handleLogout} 
                    className="text-left hover:text-blue-200 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-blue-500">
                  <Link to="/login" className="hover:text-blue-200 transition-colors" onClick={closeMobileMenu}>Login</Link>
                  <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors text-center" onClick={closeMobileMenu}>Register</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

