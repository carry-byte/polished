import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const PromoBanner: React.FC = () => {
  return (
    <section className="py-20 bg-primary-300 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-10 right-10 bg-white/20 w-40 h-40 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          repeat: Infinity,
          duration: 5
        }}
      />
      
      <motion.div 
        className="absolute bottom-10 left-20 bg-gold-700/20 w-64 h-64 rounded-full"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ 
          repeat: Infinity,
          duration: 6,
          delay: 0.5
        }}
      />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="font-serif text-4xl md:text-5xl font-medium mb-6 text-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Get 15% Off Your First Order
          </motion.h2>
          
          <motion.p 
            className="text-dark/80 text-lg mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Sign up for our newsletter and receive a special discount code for your first purchase.
            Stay updated with our latest collections and exclusive offers.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="px-6 py-3 rounded-md border-2 border-dark/10 focus:outline-none focus:border-dark/30 flex-grow w-full" 
            />
            
            <Button 
              variant="secondary" 
              size="md" 
              className="sm:w-auto"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Subscribe
            </Button>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-sm text-dark/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            By signing up, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;