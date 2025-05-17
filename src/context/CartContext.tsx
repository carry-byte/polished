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
  // Try to load cart from localStorage with error handling
  let initialCart = initialState;
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      // Validate the structure to ensure it's a valid cart state
      if (parsedCart && parsedCart.cartItems && Array.isArray(parsedCart.cartItems)) {
        initialCart = parsedCart;
        console.log('Loaded cart from localStorage:', initialCart);
      } else {
        console.error('Invalid cart structure in localStorage, using default');
        initialCart = initialState;
      }
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    initialCart = initialState;
  }

  // Ensure initialCart has the correct structure
  if (!initialCart.cartItems) {
    initialCart.cartItems = [];
  }
  if (typeof initialCart.totalPrice !== 'number') {
    initialCart.totalPrice = 0;
  }

  const [state, dispatch] = useReducer(cartReducer, initialCart);

  // Save cart to localStorage whenever it changes with error handling
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state]);

  const addToCart = (product: Product) => {
    try {
      if (!product || !product.id) {
        console.error('Invalid product:', product);
        return;
      }

      // Log before adding to cart
      console.log('Adding product to cart:', product);

      // Create a clean product object to avoid any reference issues
      const cleanProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description || ''
      };

      dispatch({ type: 'ADD_TO_CART', payload: cleanProduct });

      // Log after adding to cart
      console.log('Cart updated successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const removeFromCart = (productId: string) => {
    try {
      if (!productId) {
        console.error('Invalid product ID for removal');
        return;
      }
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    try {
      if (!productId) {
        console.error('Invalid product ID for quantity update');
        return;
      }
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: productId, quantity },
      });
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  const clearCart = () => {
    try {
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
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