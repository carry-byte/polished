import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://i.pinimg.com/736x/71/d5/b7/71d5b73a39675a480439a6284ed9d8cb.jpg")',
          filter: 'brightness(0.8)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/40" />
      </div>
      
      <div className="relative z-20 h-full container-custom mx-auto flex flex-col justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <motion.h1 
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Elevate Your <span className="text-gold-400">Nail Game</span> to Art
          </motion.h1>
          
          <motion.p 
            className="text-gray-200 text-lg md:text-xl mb-8 max-w-xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Discover luxury nail products that transform your everyday look into a sophisticated statement piece.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              variant="gold" 
              size="lg"
              icon={<ChevronRight className="w-5 h-5" />}
              iconPosition="right"
              className="backdrop-blur-sm bg-gold-400/90 hover:bg-gold-500/90"
            >
              <Link to="/shop">Shop Collection</Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Link to="/about">Our Story</Link>
            </Button>
          </motion.div>
          
          <div className="mt-16 flex items-center space-x-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center"
            >
              <span className="text-gold-400 font-bold mr-2">★★★★★</span>
              <span className="text-white text-sm">500+ reviews</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center"
            >
              <span className="text-white text-sm">Free shipping on orders PKR 5,000+</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;