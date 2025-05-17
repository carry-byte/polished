import React from 'react';
import { Truck, CreditCard, ClipboardCheck, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CheckoutStepsProps {
  currentStep: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Shipping', icon: <Truck className="w-5 h-5" /> },
    { id: 2, name: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
    { id: 3, name: 'Review', icon: <ClipboardCheck className="w-5 h-5" /> },
    { id: 4, name: 'Confirmation', icon: <Check className="w-5 h-5" /> },
  ];

  return (
    <div className="flex justify-center mb-12">
      <div className="w-full max-w-3xl">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${
                      step.id === currentStep
                        ? 'bg-primary-400 text-white scale-110 ring-4 ring-primary-100'
                        : step.id < currentStep
                        ? 'bg-primary-300 text-white'
                        : 'bg-white text-gray-400 border border-gray-200'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1 + 0.2,
                    duration: 0.3
                  }}
                  className={`absolute -bottom-8 whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                    step.id === currentStep
                      ? 'text-primary-600 font-semibold'
                      : step.id < currentStep
                      ? 'text-primary-500'
                      : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </motion.div>
              </div>

              {/* Connector Line (except after the last step) */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-3 relative">
                  {/* Background line */}
                  <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

                  {/* Progress line with animation */}
                  {step.id < currentStep && (
                    <motion.div
                      className="absolute inset-0 bg-primary-300 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        delay: index * 0.1 + 0.1,
                        duration: 0.5
                      }}
                    ></motion.div>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
