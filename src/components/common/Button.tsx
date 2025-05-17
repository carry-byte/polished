import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  isLoading = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-300 text-dark hover:bg-primary-400',
    secondary: 'bg-dark text-light hover:bg-opacity-80',
    gold: 'bg-gold-700 text-dark hover:bg-gold-600',
    outline: 'border-2 border-primary-300 text-dark hover:bg-primary-300 hover:text-dark',
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || props.disabled}
      className={`
        rounded-md font-medium transition-all duration-300 ease-in-out inline-flex items-center justify-center
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isFullWidth ? 'w-full' : ''}
        ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;