import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { formatCurrency } from '../../utils/format';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isProductFavorite = isFavorite(id);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      console.log('Adding product to cart from ProductCard:', { id, name, price, image, category });

      // Create a clean product object to avoid any reference issues
      const cleanProduct = {
        id,
        name,
        price,
        image,
        category,
        description: ''
      };

      addToCart(cleanProduct);

      // Show a success message
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up';
      toast.textContent = `${name} added to cart`;
      document.body.appendChild(toast);

      // Remove the toast after 3 seconds
      setTimeout(() => {
        toast.classList.add('animate-fade-out');
        setTimeout(() => {
          if (toast.parentNode) {
            document.body.removeChild(toast);
          }
        }, 300);
      }, 3000);

      // Ask user if they want to go to cart
      const goToCart = window.confirm(`${name} added to cart successfully! Would you like to view your cart?`);

      // Navigate to cart page if user confirms
      if (goToCart) {
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);

      // Show an error message
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up';
      toast.textContent = 'Failed to add product to cart';
      document.body.appendChild(toast);

      // Remove the toast after 3 seconds
      setTimeout(() => {
        toast.classList.add('animate-fade-out');
        setTimeout(() => {
          if (toast.parentNode) {
            document.body.removeChild(toast);
          }
        }, 300);
      }, 3000);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isProductFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ id, name, price, image, category });
    }
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <Link to={`/shop/${id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20" />

          {/* Quick action buttons */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white"
                onClick={handleAddToCart}
                aria-label="Add to cart"
              >
                <ShoppingBag className="w-5 h-5 text-dark" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${
                  isProductFavorite
                    ? 'bg-primary-300 text-white'
                    : 'bg-white/90 text-dark'
                } backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-colors`}
                onClick={handleFavoriteClick}
                aria-label={isProductFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  className={`w-5 h-5 ${isProductFavorite ? 'fill-current' : ''}`}
                />
              </motion.button>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-primary-300/90 backdrop-blur-sm text-dark text-xs font-bold px-2 py-1 rounded">
              {category}
            </span>
          </div>

          {/* Favorite indicator */}
          <AnimatePresence>
            {isProductFavorite && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-3 right-3 bg-primary-300 rounded-full p-1"
              >
                <Heart className="w-4 h-4 text-white fill-current" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4">
          <h3 className="font-serif text-lg font-medium text-dark mb-1">{name}</h3>
          <div className="flex items-center justify-between">
            <span className="font-medium text-lg">{formatCurrency(price)}</span>
            <div className="flex text-gold-700">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;