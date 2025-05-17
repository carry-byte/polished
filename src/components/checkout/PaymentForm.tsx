import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, User, Calendar, Lock } from 'lucide-react';
import Button from '../common/Button';
import { useOrder, PaymentMethod, CreditCardInfo } from '../../context/OrderContext';

const PaymentForm: React.FC = () => {
  const { paymentMethod, creditCardInfo, setPaymentMethod, setCreditCardInfo, setCheckoutStep } = useOrder();

  // Form state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(paymentMethod || 'credit_card');
  const [cardData, setCardData] = useState<CreditCardInfo>({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });

  // Form errors
  const [errors, setErrors] = useState<Partial<Record<keyof CreditCardInfo, string>>>({});

  // Load saved card info if available
  useEffect(() => {
    if (creditCardInfo) {
      setCardData(creditCardInfo);
    }
  }, [creditCardInfo]);

  // Handle payment method change
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  // Handle card input change
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '') // Remove existing spaces
        .replace(/\D/g, '') // Remove non-digits
        .slice(0, 16); // Limit to 16 digits

      // Add spaces after every 4 digits
      const parts = [];
      for (let i = 0; i < formattedValue.length; i += 4) {
        parts.push(formattedValue.slice(i, i + 4));
      }

      setCardData(prev => ({
        ...prev,
        [name]: parts.join(' '),
      }));
    }
    // Format expiry date (MM/YY)
    else if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '') // Remove non-digits
        .slice(0, 4); // Limit to 4 digits

      if (formattedValue.length > 2) {
        setCardData(prev => ({
          ...prev,
          [name]: `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`,
        }));
      } else {
        setCardData(prev => ({
          ...prev,
          [name]: formattedValue,
        }));
      }
    }
    // Format CVV (3-4 digits)
    else if (name === 'cvv') {
      setCardData(prev => ({
        ...prev,
        [name]: value.replace(/\D/g, '').slice(0, 4),
      }));
    }
    // Other fields
    else {
      setCardData(prev => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when field is edited
    if (errors[name as keyof CreditCardInfo]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate credit card form
  const validateCreditCardForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreditCardInfo, string>> = {};

    // Only validate if credit card is selected
    if (selectedPaymentMethod === 'credit_card') {
      // Card number validation
      if (!cardData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (cardData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      // Cardholder name validation
      if (!cardData.cardholderName.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }

      // Expiry date validation
      if (!cardData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      } else {
        // Check if date is in the future
        const [month, year] = cardData.expiryDate.split('/').map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
        const currentMonth = currentDate.getMonth() + 1; // 1-12

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiryDate = 'Card has expired';
        }
      }

      // CVV validation
      if (!cardData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (cardData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form if credit card is selected
    if (selectedPaymentMethod === 'credit_card' && !validateCreditCardForm()) {
      return;
    }

    // Save payment method
    setPaymentMethod(selectedPaymentMethod);

    // Save credit card info if credit card is selected
    if (selectedPaymentMethod === 'credit_card') {
      setCreditCardInfo(cardData);
    }

    // Move to review step
    setCheckoutStep(3);
  };

  // Handle back button
  const handleBack = () => {
    setCheckoutStep(1);
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
            <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm">2</span>
            Payment Method
          </h2>
          <p className="text-gray-500 mb-6 ml-11">Select your preferred payment method</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <label className="block text-gray-700 mb-4 font-medium">Select Payment Method</label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Credit Card Option */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 shadow-elegant-hover ${
                    selectedPaymentMethod === 'credit_card'
                      ? 'border-primary-400 bg-primary-50 shadow-md'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                  onClick={() => handlePaymentMethodChange('credit_card')}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                      selectedPaymentMethod === 'credit_card' ? 'border-primary-400 scale-110' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'credit_card' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 rounded-full bg-primary-400"
                        ></motion.div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <CreditCard className={`w-5 h-5 mr-2 ${
                          selectedPaymentMethod === 'credit_card' ? 'text-primary-500' : 'text-gray-600'
                        }`} />
                        <span className="font-medium text-lg">Credit Card</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 ml-7">Pay securely with your credit card</p>
                    </div>
                  </div>
                </motion.div>

                {/* Cash on Delivery Option */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 shadow-elegant-hover ${
                    selectedPaymentMethod === 'cash_on_delivery'
                      ? 'border-primary-400 bg-primary-50 shadow-md'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                  onClick={() => handlePaymentMethodChange('cash_on_delivery')}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                      selectedPaymentMethod === 'cash_on_delivery' ? 'border-primary-400 scale-110' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'cash_on_delivery' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 rounded-full bg-primary-400"
                        ></motion.div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Truck className={`w-5 h-5 mr-2 ${
                          selectedPaymentMethod === 'cash_on_delivery' ? 'text-primary-500' : 'text-gray-600'
                        }`} />
                        <span className="font-medium text-lg">Cash on Delivery</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 ml-7">Pay when you receive your order</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Credit Card Form */}
            {selectedPaymentMethod === 'credit_card' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 border-t border-gray-200 pt-6"
              >
                <h3 className="font-serif text-xl mb-4 text-gray-800">Card Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card Number */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">Card Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-md border ${
                          errors.cardNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-primary-300`}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="mt-1 text-red-500 text-sm">{errors.cardNumber}</p>
                    )}
                  </div>

                  {/* Cardholder Name */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">Cardholder Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="cardholderName"
                        value={cardData.cardholderName}
                        onChange={handleCardInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-md border ${
                          errors.cardholderName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-primary-300`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.cardholderName && (
                      <p className="mt-1 text-red-500 text-sm">{errors.cardholderName}</p>
                    )}
                  </div>

                  {/* Expiry Date */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Expiry Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardData.expiryDate}
                        onChange={handleCardInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-md border ${
                          errors.expiryDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-primary-300`}
                        placeholder="MM/YY"
                      />
                    </div>
                    {errors.expiryDate && (
                      <p className="mt-1 text-red-500 text-sm">{errors.expiryDate}</p>
                    )}
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">CVV</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-md border ${
                          errors.cvv ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-primary-300`}
                        placeholder="123"
                      />
                    </div>
                    {errors.cvv && (
                      <p className="mt-1 text-red-500 text-sm">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Cash on Delivery Info */}
            {selectedPaymentMethod === 'cash_on_delivery' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 border-t border-gray-200 pt-6"
              >
                <div className="bg-primary-50 p-4 rounded-md border border-primary-100">
                  <h3 className="font-medium text-gray-800 mb-2">Cash on Delivery Information</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Payment will be collected at the time of delivery</li>
                    <li>• Please have the exact amount ready</li>
                    <li>• Our delivery person will provide a receipt</li>
                    <li>• Cash, UPI, and mobile payment options are accepted</li>
                  </ul>
                </div>
              </motion.div>
            )}
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
                Back to Shipping
              </span>
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center">
                Continue to Review
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default PaymentForm;
