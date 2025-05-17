import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CreditCard, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/format';
import Button from '../common/Button';

const CartSummary: React.FC = () => {
  const { totalPrice, cartItems } = useCart();
  const navigate = useNavigate();

  // Calculate estimated tax (15% for Pakistan)
  const estimatedTax = totalPrice * 0.15;

  // Shipping is free over PKR 5000, otherwise PKR 500
  const shipping = totalPrice > 5000 ? 0 : 500;

  // Grand total
  const grandTotal = totalPrice + estimatedTax + shipping;

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="font-serif text-2xl mb-6 text-gray-800">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
          <span className="font-medium">{formatCurrency(totalPrice)}</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Estimated Tax</span>
          <span className="font-medium">{formatCurrency(estimatedTax)}</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-green-500' : ''}`}>
            {shipping === 0 ? 'Free' : formatCurrency(shipping)}
          </span>
        </div>

        {totalPrice < 5000 && shipping > 0 && (
          <div className="bg-primary-50 p-3 rounded-md border border-primary-100 mt-2">
            <div className="text-sm text-primary-700 font-medium flex items-center">
              <ShoppingBag className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Add {formatCurrency(5000 - totalPrice)} more to qualify for free shipping</span>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between font-medium text-lg">
            <span className="text-gray-800">Total</span>
            <span className="text-primary-700 font-bold">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        isFullWidth
        onClick={handleCheckout}
        icon={<Lock className="w-5 h-5" />}
        disabled={cartItems.length === 0}
        className="shadow-md hover:shadow-lg transition-shadow"
      >
        Secure Checkout
      </Button>

      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <Lock className="w-4 h-4 text-gray-600 mr-2" />
          <span className="text-sm text-gray-600 font-medium">Secure Payment</span>
        </div>
        <div className="flex justify-center space-x-4">
          <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-8 opacity-80 hover:opacity-100 transition-opacity" />
          <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="Mastercard" className="h-8 opacity-80 hover:opacity-100 transition-opacity" />
          <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="American Express" className="h-8 opacity-80 hover:opacity-100 transition-opacity" />
          <img src="https://cdn-icons-png.flaticon.com/128/6124/6124998.png" alt="Apple Pay" className="h-8 opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </motion.div>
  );
};

export default CartSummary;