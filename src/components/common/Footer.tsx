import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Heart, Mail } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Logo color="light" />
            <p className="mt-4 text-gray-300 text-sm">
              Luxury nail products and accessories for the modern, fashion-forward individual.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-300 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-serif mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-300 hover:text-primary-300 transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=polish" className="text-gray-300 hover:text-primary-300 transition-colors">Nail Polish</Link></li>
              <li><Link to="/shop?category=press-ons" className="text-gray-300 hover:text-primary-300 transition-colors">Press-On Nails</Link></li>
              <li><Link to="/shop?category=kits" className="text-gray-300 hover:text-primary-300 transition-colors">Nail Kits</Link></li>
              <li><Link to="/shop?category=tools" className="text-gray-300 hover:text-primary-300 transition-colors">Tools & Accessories</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-serif mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-primary-300 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary-300 transition-colors">Contact</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-primary-300 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-primary-300 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-primary-300 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-serif mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <button type="submit" className="btn bg-primary-300 text-dark hover:bg-primary-400">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Polished. All rights reserved. Made with <Heart className="w-4 h-4 text-primary-300" /> in New York.
          </p>
          <p className="mt-2">
            Contact us: <a href="mailto:hello@polished.com" className="text-primary-300 hover:underline flex items-center justify-center gap-1"><Mail className="w-4 h-4" /> hello@polished.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;