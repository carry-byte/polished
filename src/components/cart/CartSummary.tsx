import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/format';
import Button from '../common/Button';

const CartSummary: React.FC = () => {
  const { totalPrice, cartItems } = useCart();
  
  // Calculate estimated tax (15% for Pakistan)
  const estimatedTax = totalPrice * 0.15;
  
  // Shipping is free over PKR 5000, otherwise PKR 500
  const shipping = totalPrice > 5000 ? 0 : 500;
  
  // Grand total
  const grandTotal = totalPrice + estimatedTax + shipping;
  
  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
  };
  
  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-md rounded-lg shadow-soft p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Tax</span>
          <span>{formatCurrency(estimatedTax)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
        
        {totalPrice < 5000 && shipping > 0 && (
          <div className="text-sm text-primary-500 italic">
            Add {formatCurrency(5000 - totalPrice)} more to qualify for free shipping
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>
      
      <Button 
        variant="gold" 
        size="lg" 
        isFullWidth 
        onClick={handleCheckout}
        icon={<ShoppingBag className="w-5 h-5" />}
        disabled={cartItems.length === 0}
        className="backdrop-blur-sm bg-gold-400/90 hover:bg-gold-500/90"
      >
        Proceed to Checkout
      </Button>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>We accept all major payment methods</p>
        <div className="flex justify-center space-x-2 mt-2">
          <div className="w-10 h-6 bg-gray-400/30 backdrop-blur-sm rounded"></div>
          <div className="w-10 h-6 bg-gray-400/30 backdrop-blur-sm rounded"></div>
          <div className="w-10 h-6 bg-gray-400/30 backdrop-blur-sm rounded"></div>
          <div className="w-10 h-6 bg-gray-400/30 backdrop-blur-sm rounded"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartSummary;