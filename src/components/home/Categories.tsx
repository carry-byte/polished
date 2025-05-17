import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CategoryProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Category: React.FC<CategoryProps> = ({ title, description, image, link }) => {
  return (
    <motion.div 
      className="relative group overflow-hidden rounded-lg"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent flex flex-col justify-end p-6">
        <h3 className="font-serif text-2xl text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-4 text-sm">{description}</p>
        <Link 
          to={link} 
          className="inline-block py-2 px-4 bg-primary-300 text-dark font-medium rounded-md transform transition-transform duration-300 hover:translate-x-2"
        >
          Shop Now
        </Link>
      </div>
    </motion.div>
  );
};

const Categories: React.FC = () => {
  const categories = [
    {
      title: "Nail Polish",
      description: "Luxury polishes in trending colors",
      image: "https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/shop?category=polish"
    },
    {
      title: "Press-Ons",
      description: "Designer press-on nails for instant glam",
      image: "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/shop?category=press-ons"
    },
    {
      title: "Nail Care",
      description: "Professional tools and treatments",
      image: "https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/shop?category=care"
    },
    {
      title: "Nail Art",
      description: "Creative accessories and embellishments",
      image: "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/shop?category=art"
    }
  ];
  
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections of luxury nail products
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Category
              key={index}
              title={category.title}
              description={category.description}
              image={category.image}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;