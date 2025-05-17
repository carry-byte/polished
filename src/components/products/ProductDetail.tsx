import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Share2, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/format';
import Button from '../common/Button';
import { Product } from '../../types/product';
import { useNavigate } from 'react-router-dom';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedProducts }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Mock product images - in a real app, these would come from the product
  const productImages = [
    product.image,
    "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  ];

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    try {
      console.log('Adding product to cart from ProductDetail:', product);

      // Create a clean product object to avoid any reference issues
      const cleanProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description || ''
      };

      // Add the product with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(cleanProduct);
      }

      // Show a success message
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up';
      toast.textContent = `${quantity} × ${product.name} added to cart`;
      document.body.appendChild(toast);

      // Remove the toast after 3 seconds
      setTimeout(() => {
        toast.classList.add('animate-fade-out');
        setTimeout(() => {
          if (toast.parentNode) {
            document.body.removeChild(toast);
          }
        }, 300);
      }, 3000);

      // Ask user if they want to go to cart
      const goToCart = window.confirm(`${quantity} × ${product.name} added to cart successfully! Would you like to view your cart?`);

      // Navigate to cart page if user confirms
      if (goToCart) {
        navigate('/cart');
      }

    } catch (error) {
      console.error('Error in handleAddToCart:', error);

      // Show an error message
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = 'Failed to add product to cart. Please try again.';
      document.body.appendChild(toast);

      // Remove the toast after 3 seconds
      setTimeout(() => {
        if (toast.parentNode) {
          document.body.removeChild(toast);
        }
      }, 3000);
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          <motion.div
            className="aspect-square overflow-hidden rounded-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="grid grid-cols-3 gap-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`aspect-square rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary-300' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} - view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2">
              <span className="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-800 rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4">
              {product.name}
            </h1>

            <div className="flex items-center mb-6">
              <div className="flex text-gold-700">
                <span>★★★★★</span>
              </div>
              <span className="ml-2 text-sm text-gray-600">
                4.9 (120 reviews)
              </span>
            </div>

            <p className="text-2xl font-medium mb-6">
              {formatCurrency(product.price)}
            </p>

            <p className="text-gray-600 mb-8">
              A luxurious nail product designed to elevate your manicure to art. Premium quality and long-lasting formula for the perfect statement look.
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center mb-8">
              <span className="mr-4 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={handleDecreaseQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="gold"
                size="lg"
                icon={<ShoppingBag className="w-5 h-5" />}
                isFullWidth
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={<Heart className="w-5 h-5" />}
                isFullWidth
              >
                Wishlist
              </Button>
            </div>

            {/* Product Features */}
            <div className="mb-8">
              <h3 className="font-serif font-medium text-lg mb-3">Product Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Long-lasting formula (up to 10 days)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Cruelty-free and vegan formula</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Free from harmful chemicals</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Easy application with precision brush</span>
                </li>
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-serif font-medium text-lg mb-3">Shipping & Returns</h3>
              <p className="text-gray-600 text-sm">
                Free shipping on orders over $50. Orders ship within 1-2 business days.
                Easy returns within 30 days of purchase.
              </p>
            </div>

            {/* Share */}
            <div className="flex items-center mt-8">
              <button className="flex items-center text-gray-600 hover:text-primary-500 transition-colors">
                <Share2 className="w-5 h-5 mr-2" /> Share
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;