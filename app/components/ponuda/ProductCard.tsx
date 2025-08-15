'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className='bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-500 group relative border border-gray-100'>
      {/* Featured Badge */}
      {product.featured && (
        <div className='absolute top-4 right-4 z-10'>
          <span className='bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg'>
            Preporučeno
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className='relative h-48 bg-gray-200 overflow-hidden'>
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200'>
            <div className='text-center'>
              <div className='text-4xl mb-2'>🎂</div>
              <p className='text-gray-600 text-sm'>{product.name}</p>
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent'></div>

        {!imageLoaded && !imageError && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <div
              className='animate-spin rounded-full h-8 w-8 border-b-2'
              style={{ borderColor: '#7DCCBD' }}
            ></div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className='p-6 flex flex-col flex-grow'>
        <h3 className='text-xl font-playfair font-bold text-gray-900 mb-2'>
          {product.name}
        </h3>

        <p className='text-gray-600 text-sm mb-4 leading-relaxed flex-grow'>
          {product.description}
        </p>

        {/* Price and Action */}
        <button
          className='w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5'
          style={{ backgroundColor: '#7DCCBD' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#6BB8A8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#7DCCBD';
          }}
        >
          Već od {product.price}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
