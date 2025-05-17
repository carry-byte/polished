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

  // Add console log for debugging
  console.log('Cart rendering with items:', cartItems);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12 mt-16">
        {/* Removed motion.div animation to fix rendering issues */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl mb-3 text-gray-800">Shopping Cart</h1>
              <Link
                to="/shop"
                className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors group"
              >
                <span className="relative overflow-hidden inline-block mr-2 w-5 h-5">
                  <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                </span>
                <span className="font-medium">Continue Shopping</span>
              </Link>
            </div>

            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm font-medium px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 hover:text-primary-500 transition-all duration-300 flex items-center"
              >
                <span>Clear Cart</span>
              </button>
            )}
          </div>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-soft p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-xl">Cart Items ({cartItems.length})</h2>
                  </div>

                  <div className="space-y-4">
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
            <div className="bg-white rounded-lg shadow-soft p-12 text-center">
              <div className="flex justify-center mb-6">
                <ShoppingBag className="w-16 h-16 text-gray-300" />
              </div>
              <h2 className="font-serif text-2xl mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button variant="primary" size="lg">
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;