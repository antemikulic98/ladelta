'use client';

import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  featured?: boolean;
}

const products: Product[] = [
  // Torte
  {
    id: 'biskvit-vanilija',
    name: 'Biskvit Vanilija',
    description: 'Klasična torta od biskvita s vanilija kremom',
    price: '€15',
    image: '/img/torte/biskvit-vanilija.jpg',
    category: 'torte',
    featured: true,
  },
  {
    id: 'cokoladna-bomba',
    name: 'Čokoladna Bomba',
    description: 'Bogata čokoladna torta s ganache kremom',
    price: '€18',
    image: '/img/torte/cokoladna-bomba.jpg',
    category: 'torte',
    featured: true,
  },
  {
    id: 'ganache-tamna-cokolada',
    name: 'Ganache s Tamnom Čokoladom',
    description: 'Luksuzna torta s ganache od tamne čokolade',
    price: '€20',
    image: '/img/torte/ganashe-s-tamnom-cokoladom.jpg',
    category: 'torte',
  },

  // Prigodne Torte
  {
    id: 'rodjendanska',
    name: 'Rođendanska Torta',
    description: 'Personalizirana torta za rođendan',
    price: 'Od €25',
    image: '/cake-chocolate.jpg',
    category: 'prigodne-torte',
    featured: true,
  },
  {
    id: 'vencanje',
    name: 'Vjenčana Torta',
    description: 'Elegantna višeslojna torta za vjenčanje',
    price: 'Od €50',
    image: '/cheesecake.jpg',
    category: 'prigodne-torte',
  },

  // Kolači
  {
    id: 'makaroni',
    name: 'Makaroni',
    description: 'Francuski makaroni u različitim okusima',
    price: '€2/kom',
    image: '/macarons.jpg',
    category: 'kolaci',
    featured: true,
  },
  {
    id: 'kolacici',
    name: 'Mini Kolačići',
    description: 'Asortiman malih kolačića',
    price: '€1.5/kom',
    image: '/cookies.jpg',
    category: 'kolaci',
  },

  // Čajni Asortiman
  {
    id: 'mini-torte',
    name: 'Mini Torte',
    description: 'Male torte savršene uz čaj',
    price: '€3/kom',
    image: '/img/1.jpg',
    category: 'cajni-asortiman',
    featured: true,
  },
];

interface ProductGridProps {
  selectedCategory: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategory }) => {
  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  const categoryTitles = {
    torte: 'Torte',
    'prigodne-torte': 'Prigodne Torte',
    kolaci: 'Kolači',
    'cajni-asortiman': 'Čajni Asortiman',
  };

  return (
    <div>
      {/* Category Header */}
      <div className='mb-8'>
        <h2 className='text-3xl font-playfair font-bold text-gray-900 mb-4'>
          {categoryTitles[selectedCategory as keyof typeof categoryTitles]}
        </h2>
        <p className='text-gray-600 text-lg'>
          {selectedCategory === 'torte' &&
            'Otkrijte naše klasične torte pripremljene od najkvalitetnijih sastojaka'}
          {selectedCategory === 'prigodne-torte' &&
            'Posebne torte za vaše najvažnije trenutke'}
          {selectedCategory === 'kolaci' &&
            'Sitni kolači koji će upotpuniti svaki dan'}
          {selectedCategory === 'cajni-asortiman' &&
            'Savršeni kolači za uživanje uz čaj ili kavu'}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <div className='text-6xl mb-4'>🎂</div>
          <h3 className='text-xl font-semibold text-gray-700 mb-2'>
            Uskoro dostupno
          </h3>
          <p className='text-gray-500'>
            Radimo na dodavanju novih proizvoda u ovu kategoriju
          </p>
        </div>
      )}

      {/* Call to Action */}
      {filteredProducts.length > 0 && (
        <div className='mt-12 text-center'>
          <div className='bg-gray-50 rounded-3xl p-8 border border-gray-100'>
            <h3 className='text-2xl font-playfair font-bold text-gray-900 mb-4'>
              Želite nešto posebno?
            </h3>
            <p className='text-gray-600 mb-6'>
              Kontaktirajte nas za personalizirane torte i kolače po vašoj želji
            </p>
            <button
              className='px-8 py-4 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
              style={{ backgroundColor: '#7DCCBD' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6BB8A8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#7DCCBD';
              }}
            >
              Kontaktirajte Nas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
