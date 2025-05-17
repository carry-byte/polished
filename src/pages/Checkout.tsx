import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12 mt-16">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl mb-8 text-center text-gray-800">Checkout</h1>
          
          {/* Checkout Steps */}
          <CheckoutSteps currentStep={checkoutStep} />
          
          {/* Checkout Form */}
          <motion.div
            key={checkoutStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {renderCheckoutStep()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
