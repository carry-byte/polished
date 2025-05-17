import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Contexts
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

// Layouts
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetailPage from './pages/ProductDetail';
import CartPage from './pages/Cart';
import FavoritesPage from './pages/Favorites';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="shop/:productId" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;