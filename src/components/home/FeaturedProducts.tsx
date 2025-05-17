import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { featuredProducts } from '../../data/products';

const FeaturedProducts: React.FC = () => {
  return (
    <section className="section bg-light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-3">
              Featured Collections
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our most popular nail products, curated for the fashion-forward individual
              who appreciates luxury and quality.
            </p>
          </div>
          
          <Link 
            to="/shop" 
            className="mt-4 md:mt-0 flex items-center text-dark font-medium hover:text-primary-500 transition-colors"
          >
            View All Products <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;