import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
  return (
    <div className="container-custom min-h-screen flex items-center justify-center py-12">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-6xl mb-4">404</h1>
        <h2 className="font-serif text-2xl mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="gold" 
            size="lg"
            icon={<Home className="w-5 h-5" />}
          >
            <Link to="/">Back to Home</Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            icon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;