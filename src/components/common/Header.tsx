import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const { favorites } = useFavorites();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="z-10">
          <Logo color={isScrolled || isMobileMenuOpen ? 'dark' : location.pathname === '/' ? 'light' : 'dark'} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`nav-link font-medium text-base tracking-wide ${
              location.pathname === '/'
                ? 'text-primary-500 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary-300'
                : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`nav-link font-medium text-base tracking-wide ${
              location.pathname.includes('/shop')
                ? 'text-primary-500 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary-300'
                : ''
            }`}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className={`nav-link font-medium text-base tracking-wide ${
              location.pathname === '/about'
                ? 'text-primary-500 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary-300'
                : ''
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link font-medium text-base tracking-wide ${
              location.pathname === '/contact'
                ? 'text-primary-500 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary-300'
                : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center z-10 space-x-4">
          {/* Favorites Icon */}
          <Link
            to="/favorites"
            className="relative p-2"
            aria-label="View your favorites"
          >
            <Heart className={`w-6 h-6 transition-colors ${
              isScrolled || isMobileMenuOpen || location.pathname !== '/'
                ? 'text-dark'
                : 'text-light'
            }`} />

            {favorites.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-primary-300 text-dark rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
              >
                {favorites.length}
              </motion.div>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2"
            aria-label="View your shopping cart"
          >
            <ShoppingBag className={`w-6 h-6 transition-colors ${
              isScrolled || isMobileMenuOpen || location.pathname !== '/'
                ? 'text-dark'
                : 'text-light'
            }`} />

            {totalItems > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-primary-300 text-dark rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
              >
                {totalItems}
              </motion.div>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="ml-4 p-2 md:hidden"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${
                isScrolled || location.pathname !== '/' ? 'text-dark' : 'text-light'
              }`} />
            ) : (
              <Menu className={`w-6 h-6 ${
                isScrolled || location.pathname !== '/' ? 'text-dark' : 'text-light'
              }`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`fixed inset-0 bg-white/95 backdrop-blur-lg z-0 flex flex-col items-center justify-center md:hidden ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
          initial={{ opacity: 0, x: '100%' }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            x: isMobileMenuOpen ? 0 : '100%'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center space-y-8">
            <Link
              to="/"
              className={`text-2xl font-serif tracking-wide relative ${
                location.pathname === '/' ? 'text-primary-500' : 'text-dark'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative">
                Home
                {location.pathname === '/' && (
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary-300"
                    layoutId="mobileBorder"
                  />
                )}
              </span>
            </Link>
            <Link
              to="/shop"
              className={`text-2xl font-serif tracking-wide relative ${
                location.pathname.includes('/shop') ? 'text-primary-500' : 'text-dark'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative">
                Shop
                {location.pathname.includes('/shop') && (
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary-300"
                    layoutId="mobileBorder"
                  />
                )}
              </span>
            </Link>
            <Link
              to="/about"
              className={`text-2xl font-serif tracking-wide relative ${
                location.pathname === '/about' ? 'text-primary-500' : 'text-dark'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative">
                About
                {location.pathname === '/about' && (
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary-300"
                    layoutId="mobileBorder"
                  />
                )}
              </span>
            </Link>
            <Link
              to="/contact"
              className={`text-2xl font-serif tracking-wide relative ${
                location.pathname === '/contact' ? 'text-primary-500' : 'text-dark'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative">
                Contact
                {location.pathname === '/contact' && (
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary-300"
                    layoutId="mobileBorder"
                  />
                )}
              </span>
            </Link>

            <div className="w-24 h-[1px] bg-gray-200 my-4"></div>

            <Link
              to="/favorites"
              className={`text-xl font-medium flex items-center space-x-3 ${
                location.pathname === '/favorites' ? 'text-primary-500' : 'text-dark'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart className={`w-5 h-5 ${location.pathname === '/favorites' ? 'text-primary-500' : 'text-dark'}`} />
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="bg-primary-300 text-dark rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className={`text-xl font-medium flex items-center space-x-3 ${
                location.pathname === '/cart' ? 'text-primary-500' : 'text-dark'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingBag className={`w-5 h-5 ${location.pathname === '/cart' ? 'text-primary-500' : 'text-dark'}`} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="bg-primary-300 text-dark rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;