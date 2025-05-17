import React from 'react';
import { Truck, CreditCard, ClipboardCheck, Check } from 'lucide-react';

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
    <div className="flex justify-center mb-8">
      <div className="w-full max-w-3xl">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    step.id <= currentStep
                      ? 'bg-primary-300 text-dark'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div
                  className={`absolute -bottom-6 whitespace-nowrap text-xs font-medium transition-colors duration-300 ${
                    step.id <= currentStep ? 'text-primary-500' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </div>
              </div>

              {/* Connector Line (except after the last step) */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors duration-300 ${
                    step.id < currentStep ? 'bg-primary-300' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
