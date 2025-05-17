import React, { createContext, useReducer, useContext } from 'react';
import { CartItem } from '../types/product';

// Define the address interface
export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
}

// Define the payment method type
export type PaymentMethod = 'credit_card' | 'cash_on_delivery';

// Define the credit card interface
export interface CreditCardInfo {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

// Define the order status
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Define the order state
export interface OrderState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  creditCardInfo: CreditCardInfo | null;
  orderStatus: OrderStatus;
  orderId: string | null;
  orderDate: string | null;
  checkoutStep: number;
}

// Define the initial state
const initialState: OrderState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  shippingAddress: null,
  paymentMethod: null,
  creditCardInfo: null,
  orderStatus: 'pending',
  orderId: null,
  orderDate: null,
  checkoutStep: 1,
};

// Define the action types
type OrderAction =
  | { type: 'SET_ITEMS'; payload: { items: CartItem[]; subtotal: number; tax: number; shipping: number; total: number } }
  | { type: 'SET_SHIPPING_ADDRESS'; payload: ShippingAddress }
  | { type: 'SET_PAYMENT_METHOD'; payload: PaymentMethod }
  | { type: 'SET_CREDIT_CARD_INFO'; payload: CreditCardInfo }
  | { type: 'SET_ORDER_STATUS'; payload: OrderStatus }
  | { type: 'SET_ORDER_ID'; payload: string }
  | { type: 'SET_ORDER_DATE'; payload: string }
  | { type: 'SET_CHECKOUT_STEP'; payload: number }
  | { type: 'RESET_ORDER' };

// Define the context type
interface OrderContextType extends OrderState {
  setItems: (items: CartItem[], subtotal: number, tax: number, shipping: number, total: number) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setCreditCardInfo: (info: CreditCardInfo) => void;
  setOrderStatus: (status: OrderStatus) => void;
  setOrderId: (id: string) => void;
  setOrderDate: (date: string) => void;
  setCheckoutStep: (step: number) => void;
  resetOrder: () => void;
}

// Create the context
export const OrderContext = createContext<OrderContextType>({
  ...initialState,
  setItems: () => {},
  setShippingAddress: () => {},
  setPaymentMethod: () => {},
  setCreditCardInfo: () => {},
  setOrderStatus: () => {},
  setOrderId: () => {},
  setOrderDate: () => {},
  setCheckoutStep: () => {},
  resetOrder: () => {},
});

// Create the reducer
const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload.items,
        subtotal: action.payload.subtotal,
        tax: action.payload.tax,
        shipping: action.payload.shipping,
        total: action.payload.total,
      };
    case 'SET_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case 'SET_CREDIT_CARD_INFO':
      return {
        ...state,
        creditCardInfo: action.payload,
      };
    case 'SET_ORDER_STATUS':
      return {
        ...state,
        orderStatus: action.payload,
      };
    case 'SET_ORDER_ID':
      return {
        ...state,
        orderId: action.payload,
      };
    case 'SET_ORDER_DATE':
      return {
        ...state,
        orderDate: action.payload,
      };
    case 'SET_CHECKOUT_STEP':
      return {
        ...state,
        checkoutStep: action.payload,
      };
    case 'RESET_ORDER':
      return initialState;
    default:
      return state;
  }
};

// Create the provider
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const setItems = (items: CartItem[], subtotal: number, tax: number, shipping: number, total: number) => {
    dispatch({ type: 'SET_ITEMS', payload: { items, subtotal, tax, shipping, total } });
  };

  const setShippingAddress = (address: ShippingAddress) => {
    dispatch({ type: 'SET_SHIPPING_ADDRESS', payload: address });
  };

  const setPaymentMethod = (method: PaymentMethod) => {
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });
  };

  const setCreditCardInfo = (info: CreditCardInfo) => {
    dispatch({ type: 'SET_CREDIT_CARD_INFO', payload: info });
  };

  const setOrderStatus = (status: OrderStatus) => {
    dispatch({ type: 'SET_ORDER_STATUS', payload: status });
  };

  const setOrderId = (id: string) => {
    dispatch({ type: 'SET_ORDER_ID', payload: id });
  };

  const setOrderDate = (date: string) => {
    dispatch({ type: 'SET_ORDER_DATE', payload: date });
  };

  const setCheckoutStep = (step: number) => {
    dispatch({ type: 'SET_CHECKOUT_STEP', payload: step });
  };

  const resetOrder = () => {
    dispatch({ type: 'RESET_ORDER' });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        setItems,
        setShippingAddress,
        setPaymentMethod,
        setCreditCardInfo,
        setOrderStatus,
        setOrderId,
        setOrderDate,
        setCheckoutStep,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Create a hook to use the order context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
