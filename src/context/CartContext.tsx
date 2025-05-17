import React, { createContext, useReducer, useEffect } from 'react';
import { Product } from '../types/product';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
};

export const CartContext = createContext<CartContextType>({
  ...initialState,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedItems: CartItem[];

      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        updatedItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        updatedItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        cartItems: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        cartItems: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        const updatedItems = state.cartItems.filter(item => item.id !== id);
        return {
          ...state,
          cartItems: updatedItems,
          totalPrice: calculateTotalPrice(updatedItems),
        };
      }
      
      const updatedItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      return {
        ...state,
        cartItems: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        totalPrice: 0,
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load cart from localStorage
  const savedCart = localStorage.getItem('cart');
  const initialCart = savedCart ? JSON.parse(savedCart) : initialState;
  
  const [state, dispatch] = useReducer(cartReducer, initialCart);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};