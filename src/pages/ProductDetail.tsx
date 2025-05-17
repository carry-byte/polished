import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductDetailComponent from '../components/products/ProductDetail';
import ProductCard from '../components/products/ProductCard';
import { products } from '../data/products';
import { Product } from '../types/product';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Find the product with the matching ID
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Get related products from the same category
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(related);
    } else {
      // Product not found, redirect to shop
      navigate('/shop');
    }
  }, [productId, navigate]);
  
  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-300 mx-auto"></div>
        <p className="mt-4">Loading product...</p>
      </div>
    );
  }
  
  return (
    <div className="mt-16">
      <ProductDetailComponent product={product} relatedProducts={relatedProducts} />
      
      {relatedProducts.length > 0 && (
        <div className="container-custom py-12">
          <h2 className="font-serif text-2xl md:text-3xl mb-6">You May Also Like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;