import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="container-custom py-12 mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-serif text-4xl text-center mb-8">Our Story</h1>
        
        <div className="bg-white rounded-lg shadow-soft p-8 mb-12">
          <div className="mb-10">
            <h2 className="font-serif text-2xl mb-4">The Birth of Polished</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2023, Polished emerged from a passion for self-expression through nail art and a commitment to clean, high-quality formulations. What began as a small online boutique has grown into a leading destination for luxury nail products that marry fashion, function, and self-care.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our founder, Emma Chen, began mixing custom nail colors in her New York apartment, seeking formulations that would provide the perfect balance of longevity and health. After spending years developing products free from harmful chemicals without sacrificing performance, Polished was born—a brand dedicated to elevating the nail care experience.
            </p>
          </div>
          
          <div className="mb-10">
            <h2 className="font-serif text-2xl mb-4">Our Philosophy</h2>
            <p className="text-gray-600 leading-relaxed">
              At Polished, we believe nail care is more than a beauty ritual—it's an artistic expression and a moment of mindfulness. Every product we create is designed to inspire creativity, boost confidence, and provide a moment of luxury in your daily routine.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              We're committed to ethical production, cruelty-free formulations, and sustainable practices. Our products are developed with care for both our customers and the planet, using recyclable packaging and responsibly sourced ingredients.
            </p>
          </div>
          
          <div>
            <h2 className="font-serif text-2xl mb-4">Our Promise</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-300 font-bold mr-2">•</span>
                <span>Exceptional quality that's evident from the first application</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-300 font-bold mr-2">•</span>
                <span>Cruelty-free formulations that prioritize nail health</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-300 font-bold mr-2">•</span>
                <span>Trendsetting colors inspired by fashion runways</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-300 font-bold mr-2">•</span>
                <span>Sustainable practices and eco-friendly packaging</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-300 font-bold mr-2">•</span>
                <span>An inclusive approach to beauty that celebrates individuality</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-soft p-6 text-center">
            <div className="text-primary-300 font-bold text-4xl mb-2">100+</div>
            <p className="text-gray-600">Unique Products</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft p-6 text-center">
            <div className="text-primary-300 font-bold text-4xl mb-2">50K+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft p-6 text-center">
            <div className="text-primary-300 font-bold text-4xl mb-2">15</div>
            <p className="text-gray-600">Fashion Awards</p>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="font-serif text-2xl mb-4">Join the Polished Community</h2>
          <p className="text-gray-600 mb-6">
            Connect with us on social media for nail inspiration, behind-the-scenes content, and exclusive offers.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="p-3 bg-primary-300 rounded-full text-dark hover:bg-primary-400 transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="p-3 bg-primary-300 rounded-full text-dark hover:bg-primary-400 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="p-3 bg-primary-300 rounded-full text-dark hover:bg-primary-400 transition-colors">
              <span className="sr-only">Pinterest</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;