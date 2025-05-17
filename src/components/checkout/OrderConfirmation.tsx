import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Calendar, CreditCard, Truck, MapPin } from 'lucide-react';
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
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl mb-2 text-gray-800">Order Confirmed!</h2>
          <p className="text-gray-600">
            Thank you for your order. We've received your order and will begin processing it soon.
          </p>
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
        
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            If you have any questions about your order, please contact our customer service team.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" onClick={resetOrder}>
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
