import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Removed AnimatePresence to fix rendering issues */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;