import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import { useCart } from '../hooks/useCart';

const Cart: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  
  return (
    <div className="container-custom py-12 mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-3xl md:text-4xl mb-2">Your Cart</h1>
        <Link to="/shop" className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Continue Shopping
        </Link>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-soft p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-xl">Shopping Cart ({cartItems.length} items)</h2>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-primary-500 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div>
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="font-serif text-2xl mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button variant="gold" size="lg">
              <Link to="/shop">Explore Products</Link>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;