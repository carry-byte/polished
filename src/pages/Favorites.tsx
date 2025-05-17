import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/common/Button';

const Favorites: React.FC = () => {
  const { favorites, clearFavorites } = useFavorites();
  
  return (
    <div className="container-custom py-12 mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl mb-2">Your Favorites</h1>
            <Link to="/shop" className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Continue Shopping
            </Link>
          </div>
          
          {favorites.length > 0 && (
            <button 
              onClick={clearFavorites}
              className="text-sm text-gray-500 hover:text-primary-500 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-lg">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="font-serif text-2xl mb-4">No favorites yet</h2>
            <p className="text-gray-600 mb-8">Start adding your favorite products to create your wishlist.</p>
            <Button variant="gold" size="lg">
              <Link to="/shop">Explore Products</Link>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Favorites;