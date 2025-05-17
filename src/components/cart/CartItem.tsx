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
      className="flex items-center py-4 border-b border-gray-200 bg-white rounded-lg mb-4 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow ml-4">
        <h3 className="font-serif text-lg">{name}</h3>
        <p className="text-gray-600">{formatCurrency(price)}</p>
      </div>
      
      <div className="flex items-center ml-auto">
        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white">
          <button 
            onClick={handleDecrement}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="px-4 py-1">{quantity}</span>
          
          <button 
            onClick={handleIncrement}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          onClick={handleRemove}
          className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="ml-6 w-24 text-right">
        <p className="font-medium">{formatCurrency(price * quantity)}</p>
      </div>
    </motion.div>
  );
};

export default CartItem;