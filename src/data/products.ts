import { Product } from '../types/product';

// Sample product data
export const products: Product[] = [
  {
    id: "1",
    name: "Blush Crush Polish",
    price: 18.99,
    image: "https://images.pexels.com/photos/2253834/pexels-photo-2253834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Polish",
    description: "A luxurious soft pink polish that complements any skin tone."
  },
  {
    id: "2",
    name: "Gold Rush Glitter",
    price: 21.99,
    image: "https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Polish",
    description: "Dazzling gold glitter polish for a statement manicure."
  },
  {
    id: "3",
    name: "Midnight Velvet",
    price: 18.99,
    image: "https://images.pexels.com/photos/457701/pexels-photo-457701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Polish",
    description: "Rich, deep black polish with a smooth, velvety finish."
  },
  {
    id: "4",
    name: "Pearl Essence",
    price: 19.99,
    image: "https://images.pexels.com/photos/2977272/pexels-photo-2977272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Polish",
    description: "Iridescent pearl finish for an elegant, timeless look."
  },
  {
    id: "5",
    name: "Couture Press-Ons",
    price: 32.99,
    image: "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Press-ons",
    description: "Designer press-on nails in a classic French tip design."
  },
  {
    id: "6",
    name: "Stiletto Edge Press-Ons",
    price: 36.99,
    image: "https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Press-ons",
    description: "Bold, dramatic stiletto press-ons with edgy accents."
  },
  {
    id: "7",
    name: "Minimalist Matte Press-Ons",
    price: 34.99,
    image: "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Press-ons",
    description: "Sophisticated matte press-ons in a natural almond shape."
  },
  {
    id: "8",
    name: "Ultimate Manicure Kit",
    price: 48.99,
    image: "https://images.pexels.com/photos/5797999/pexels-photo-5797999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Tools",
    description: "Professional-grade manicure set with premium tools."
  },
  {
    id: "9",
    name: "Nail Strengthening Treatment",
    price: 22.99,
    image: "https://images.pexels.com/photos/8311328/pexels-photo-8311328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Care",
    description: "Intensive treatment that strengthens brittle nails."
  },
  {
    id: "10",
    name: "Crystal Gem Nail Jewels",
    price: 15.99,
    image: "https://images.pexels.com/photos/7763818/pexels-photo-7763818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Art",
    description: "Luxury crystal embellishments for statement nail art."
  },
  {
    id: "11",
    name: "French Manicure Kit",
    price: 29.99,
    image: "https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Kits",
    description: "Everything you need for a perfect French manicure."
  },
  {
    id: "12",
    name: "Top & Base Coat Duo",
    price: 24.99,
    image: "https://images.pexels.com/photos/3997374/pexels-photo-3997374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Care",
    description: "Professional-quality top and base coats for a salon-perfect finish."
  }
];

// Featured products subset
export const featuredProducts = products.slice(0, 4);