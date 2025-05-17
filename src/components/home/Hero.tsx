import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/7763818/pexels-photo-7763818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          filter: 'brightness(0.7)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-dark/50" />
      </div>
      
      <div className="relative z-20 h-full container-custom mx-auto flex flex-col justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-primary-300/20 backdrop-blur-sm text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ✨ New Collection Available
          </motion.span>
          
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
            Discover luxury nail products that transform your everyday look into a sophisticated statement piece. Premium quality, trendsetting designs.
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
          
          <div className="mt-16 flex flex-wrap items-center gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center"
            >
              <div className="flex text-gold-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="text-white text-sm ml-2">500+ Reviews</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center"
            >
              <span className="text-white text-sm">Free shipping on orders PKR 5,000+</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center"
            >
              <span className="text-white text-sm">30-Day Money Back Guarantee</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;