import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail } from 'lucide-react';
import Button from '../common/Button';
import { useOrder, ShippingAddress } from '../../context/OrderContext';

const ShippingForm: React.FC = () => {
  const { shippingAddress, setShippingAddress, setCheckoutStep } = useOrder();
  
  // Form state
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan', // Default country
    phone: '',
    email: '',
  });
  
  // Form errors
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});
  
  // Load saved address if available
  useEffect(() => {
    if (shippingAddress) {
      setFormData(shippingAddress);
    }
  }, [shippingAddress]);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof ShippingAddress]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddress, string>> = {};
    
    // Required fields
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State/Province is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShippingAddress(formData);
      setCheckoutStep(2); // Move to payment step
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="font-serif text-2xl mb-6 text-gray-800">Shipping Information</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-md border ${
                    errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-300`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>
            
            {/* Address Line 1 */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2 font-medium">Address Line 1</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-md border ${
                    errors.addressLine1 ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-300`}
                  placeholder="123 Main St"
                />
              </div>
              {errors.addressLine1 && (
                <p className="mt-1 text-red-500 text-sm">{errors.addressLine1}</p>
              )}
            </div>
            
            {/* Address Line 2 */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2 font-medium">Address Line 2 (Optional)</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                placeholder="Apartment, suite, unit, etc."
              />
            </div>
            
            {/* City */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full pl-4 pr-4 py-3 rounded-md border ${
                  errors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary-300`}
                placeholder="Karachi"
              />
              {errors.city && (
                <p className="mt-1 text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
            
            {/* State/Province */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">State/Province</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full pl-4 pr-4 py-3 rounded-md border ${
                  errors.state ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary-300`}
                placeholder="Sindh"
              />
              {errors.state && (
                <p className="mt-1 text-red-500 text-sm">{errors.state}</p>
              )}
            </div>
            
            {/* Postal Code */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={`w-full pl-4 pr-4 py-3 rounded-md border ${
                  errors.postalCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary-300`}
                placeholder="75300"
              />
              {errors.postalCode && (
                <p className="mt-1 text-red-500 text-sm">{errors.postalCode}</p>
              )}
            </div>
            
            {/* Country */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full pl-4 pr-4 py-3 rounded-md border ${
                  errors.country ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary-300`}
              >
                <option value="Pakistan">Pakistan</option>
                <option value="India">India</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Nepal">Nepal</option>
              </select>
              {errors.country && (
                <p className="mt-1 text-red-500 text-sm">{errors.country}</p>
              )}
            </div>
            
            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-md border ${
                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-300`}
                  placeholder="+92 300 1234567"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-md border ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-300`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
            >
              Continue to Payment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingForm;
