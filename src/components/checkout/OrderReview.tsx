import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Truck, Check, ShoppingBag } from 'lucide-react';
import Button from '../common/Button';
import { useOrder } from '../../context/OrderContext';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/format';

const OrderReview: React.FC = () => {
  const {
    items,
    subtotal,
    tax,
    shipping,
    total,
    shippingAddress,
    paymentMethod,
    setCheckoutStep,
    setOrderId,
    setOrderDate,
  } = useOrder();

  const { clearCart } = useCart();

  // Handle back button
  const handleBack = () => {
    setCheckoutStep(2);
  };

  // Handle place order
  const handlePlaceOrder = () => {
    // Generate a random order ID
    const orderId = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

    // Set the order date to now
    const orderDate = new Date().toISOString();

    // Update order context
    setOrderId(orderId);
    setOrderDate(orderDate);

    // Clear the cart
    clearCart();

    // Move to confirmation step
    setCheckoutStep(4);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        className="bg-white rounded-xl shadow-elegant p-6 md:p-8 border-elegant overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="font-serif text-2xl mb-2 text-gray-800 flex items-center">
            <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm">3</span>
            Review Your Order
          </h2>
          <p className="text-gray-500 mb-6 ml-11">Please review your order details before placing your order</p>
        </motion.div>

        <div className="space-y-8">
          {/* Shipping Address */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-primary-500 mr-2" />
                <h3 className="font-serif text-lg text-gray-800">Shipping Address</h3>
              </div>
              <button
                onClick={() => setCheckoutStep(1)}
                className="text-sm text-primary-500 hover:text-primary-600 font-medium"
              >
                Edit
              </button>
            </div>

            {shippingAddress && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">{shippingAddress.fullName}</p>
                <p>{shippingAddress.addressLine1}</p>
                {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
                <p>{shippingAddress.country}</p>
                <p className="mt-2">{shippingAddress.phone}</p>
                <p>{shippingAddress.email}</p>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {paymentMethod === 'credit_card' ? (
                  <CreditCard className="w-5 h-5 text-primary-500 mr-2" />
                ) : (
                  <Truck className="w-5 h-5 text-primary-500 mr-2" />
                )}
                <h3 className="font-serif text-lg text-gray-800">Payment Method</h3>
              </div>
              <button
                onClick={() => setCheckoutStep(2)}
                className="text-sm text-primary-500 hover:text-primary-600 font-medium"
              >
                Edit
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              {paymentMethod === 'credit_card' ? (
                <p className="font-medium">Credit Card Payment</p>
              ) : (
                <p className="font-medium">Cash on Delivery</p>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="w-5 h-5 text-primary-500 mr-2" />
              <h3 className="font-serif text-lg text-gray-800">Order Items ({items.length})</h3>
            </div>

            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center border-b border-gray-100 pb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex-grow">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-serif text-lg text-gray-800 mb-4">Order Summary</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax (15%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>

              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span className="text-primary-700">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="mt-8 flex justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleBack}
            className="border-2 hover:bg-gray-50 transition-all duration-300"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Payment
            </span>
          </Button>

          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handlePlaceOrder}
            className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Place Order
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderReview;
