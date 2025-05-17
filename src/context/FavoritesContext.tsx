import React, { createContext, useReducer, useEffect } from 'react';
import { Product, FavoriteItem } from '../types/product';

interface FavoritesState {
  favorites: FavoriteItem[];
}

type FavoritesAction =
  | { type: 'ADD_TO_FAVORITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'CLEAR_FAVORITES' };

interface FavoritesContextType extends FavoritesState {
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  clearFavorites: () => void;
  isFavorite: (productId: string) => boolean;
}

const initialState: FavoritesState = {
  favorites: [],
};

export const FavoritesContext = createContext<FavoritesContextType>({
  ...initialState,
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  clearFavorites: () => {},
  isFavorite: () => false,
});

const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES': {
      const newFavorite: FavoriteItem = {
        ...action.payload,
        addedAt: new Date().toISOString(),
      };
      
      return {
        ...state,
        favorites: [...state.favorites, newFavorite],
      };
    }

    case 'REMOVE_FROM_FAVORITES': {
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload),
      };
    }

    case 'CLEAR_FAVORITES':
      return {
        ...state,
        favorites: [],
      };

    default:
      return state;
  }
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedFavorites = localStorage.getItem('favorites');
  const initialFavorites = savedFavorites ? JSON.parse(savedFavorites) : initialState;
  
  const [state, dispatch] = useReducer(favoritesReducer, initialFavorites);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state));
  }, [state]);

  const addToFavorites = (product: Product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
  };

  const removeFromFavorites = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
  };

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  };

  const isFavorite = (productId: string) => {
    return state.favorites.some(item => item.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};