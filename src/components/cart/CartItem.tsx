import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/format';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, image, quantity }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = () => {
    removeFromCart(id);
  };

  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-start sm:items-center py-5 border-b border-gray-200 bg-white rounded-lg mb-4 px-5 hover:shadow-md transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden shadow-sm">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="flex-grow ml-0 sm:ml-5 mt-3 sm:mt-0">
        <h3 className="font-serif text-lg font-medium text-gray-800">{name}</h3>
        <p className="text-primary-500 font-medium">{formatCurrency(price)}</p>
      </div>

      <div className="flex items-center mt-4 sm:mt-0 ml-0 sm:ml-auto">
        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
          <button
            onClick={handleDecrement}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="px-4 py-1 font-medium">{quantity}</span>

          <button
            onClick={handleIncrement}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleRemove}
          className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="ml-0 sm:ml-6 w-full sm:w-24 text-left sm:text-right mt-3 sm:mt-0">
        <p className="font-medium text-gray-800">{formatCurrency(price * quantity)}</p>
      </div>
    </motion.div>
  );
};

export default CartItem;