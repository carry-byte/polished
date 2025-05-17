import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { products } from '../data/products';

const Shop: React.FC = () => {
  const location = useLocation();
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  
  // Get unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Check for category in URL params when component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category) {
      setCategoryFilter(category);
    }
  }, [location]);
  
  return (
    <div className="container-custom py-12 mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl mb-4">Our Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our curated selection of luxury nail products, designed for the fashion-forward individual
          </p>
        </div>
        
        <ProductGrid products={products} categories={categories} />
      </motion.div>
    </div>
  );
};

export default Shop;