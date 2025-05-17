import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
  categories: string[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOption, setSortOption] = useState('featured');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-az':
        return a.name.localeCompare(b.name);
      case 'name-za':
        return b.name.localeCompare(a.name);
      default:
        return 0; // featured - no specific sort
    }
  });
  
  return (
    <div>
      <div className="mb-8 p-6 bg-white rounded-lg shadow-soft">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          {/* Sort */}
          <div className="min-w-[180px]">
            <select
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 appearance-none bg-white"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-az">Name: A to Z</option>
              <option value="name-za">Name: Z to A</option>
            </select>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex items-center mr-2">
            <Filter className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          
          {categories.map(category => (
            <button
              key={category}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-300 text-dark'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
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
      ) : (
        <div className="text-center py-12">
          <h3 className="font-serif text-2xl mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;