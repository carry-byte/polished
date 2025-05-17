import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { useOrder } from '../hooks/useOrder';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderReview from '../components/checkout/OrderReview';
import OrderConfirmation from '../components/checkout/OrderConfirmation';
import CheckoutSteps from '../components/checkout/CheckoutSteps';

const Checkout: React.FC = () => {
  const { cartItems, totalPrice } = useCart();
  const { checkoutStep, setItems } = useOrder();
  const navigate = useNavigate();

  // Calculate order values
  const subtotal = totalPrice;
  const tax = subtotal * 0.15; // 15% tax
  const shipping = subtotal > 5000 ? 0 : 500; // Free shipping over PKR 5000
  const total = subtotal + tax + shipping;

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    } else {
      // Initialize order items
      setItems(cartItems, subtotal, tax, shipping, total);
    }
  }, [cartItems, navigate, setItems, subtotal, tax, shipping, total]);

  // Render the current checkout step
  const renderCheckoutStep = () => {
    switch (checkoutStep) {
      case 1:
        return <ShippingForm />;
      case 2:
        return <PaymentForm />;
      case 3:
        return <OrderReview />;
      case 4:
        return <OrderConfirmation />;
      default:
        return <ShippingForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container-custom py-12 mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif mb-4 text-center text-gray-800 relative">
            <span className="relative inline-block">
              Checkout
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary-300"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </span>
          </h1>

          <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
            Complete your purchase by providing your shipping details and payment information.
          </p>

          {/* Checkout Steps */}
          <CheckoutSteps currentStep={checkoutStep} />

          {/* Checkout Form */}
          <AnimatePresence mode="wait">
            <motion.div
              key={checkoutStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
              className="mt-8"
            >
              {renderCheckoutStep()}
            </motion.div>
          </AnimatePresence>

          {/* Background decoration */}
          <div className="fixed -z-10 top-1/4 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-30" />
          <div className="fixed -z-10 bottom-1/4 left-0 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-20" />
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
