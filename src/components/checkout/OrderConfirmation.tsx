import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Calendar, CreditCard, Truck, MapPin, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useOrder } from '../../context/OrderContext';
import { formatCurrency } from '../../utils/format';

const OrderConfirmation: React.FC = () => {
  const {
    orderId,
    orderDate,
    total,
    shippingAddress,
    paymentMethod,
    resetOrder
  } = useOrder();

  // Format the order date
  const formattedDate = orderDate
    ? new Date(orderDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Estimated delivery date (7 days from order date)
  const estimatedDeliveryDate = orderDate
    ? new Date(new Date(orderDate).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        className="bg-white rounded-xl shadow-elegant p-6 md:p-8 border-elegant overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full scale-150 animate-pulse-soft"></div>
              <CheckCircle className="w-20 h-20 text-green-500 relative" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-3 text-gray-800">Order Confirmed!</h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Thank you for your order. We've received your order and will begin processing it soon.
            </p>
          </motion.div>
        </div>

        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order ID */}
            <div className="flex items-start">
              <Package className="w-5 h-5 text-primary-500 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Order Number</h3>
                <p className="text-gray-600">{orderId}</p>
              </div>
            </div>

            {/* Order Date */}
            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-primary-500 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Order Date</h3>
                <p className="text-gray-600">{formattedDate}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-start">
              {paymentMethod === 'credit_card' ? (
                <CreditCard className="w-5 h-5 text-primary-500 mt-1 mr-3" />
              ) : (
                <Truck className="w-5 h-5 text-primary-500 mt-1 mr-3" />
              )}
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Payment Method</h3>
                <p className="text-gray-600">
                  {paymentMethod === 'credit_card' ? 'Credit Card' : 'Cash on Delivery'}
                </p>
              </div>
            </div>

            {/* Order Total */}
            <div className="flex items-start">
              <div className="w-5 h-5 text-primary-500 mt-1 mr-3 flex items-center justify-center">
                <span className="font-bold">₹</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Order Total</h3>
                <p className="text-gray-600">{formatCurrency(total)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 text-primary-500 mr-2" />
            <h3 className="font-serif text-lg text-gray-800">Shipping Information</h3>
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

        {/* Delivery Information */}
        <div className="bg-primary-50 p-6 rounded-lg mb-8 border border-primary-100">
          <h3 className="font-serif text-lg text-gray-800 mb-4">Delivery Information</h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <Truck className="w-5 h-5 text-primary-500 mt-1 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">Estimated Delivery Date</h4>
                <p className="text-gray-600">{estimatedDeliveryDate}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">Delivery Instructions</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• You will receive an email with tracking information once your order ships.</li>
                <li>• For Cash on Delivery orders, please have the exact amount ready.</li>
                <li>• Our delivery partner will contact you before delivery.</li>
              </ul>
            </div>
          </div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-gray-600 mb-8 text-lg">
            If you have any questions about your order, please contact our customer service team.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/" onClick={resetOrder}>
              <Button
                variant="primary"
                size="lg"
                className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 px-8"
              >
                <span className="flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Continue Shopping
                </span>
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-2 hover:bg-gray-50 transition-all duration-300 px-8"
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  Contact Support
                </span>
              </Button>
            </Link>
          </div>

          <motion.div
            className="mt-12 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <p>A confirmation email has been sent to your email address.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
