'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import PonudaHero from '../components/ponuda/PonudaHero';
import CategoryMenu from '../components/ponuda/CategoryMenu';
import ProductGrid from '../components/ponuda/ProductGrid';

const PonudaPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('torte');

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <PonudaHero />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-4'>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
          {/* Category Menu - Top on mobile, Left Sidebar on desktop */}
          <div className='w-full lg:w-1/5 order-1 lg:order-1'>
            <CategoryMenu
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* Product Grid - Bottom on mobile, Right Content on desktop */}
          <div className='w-full lg:w-4/5 order-2 lg:order-2'>
            <ProductGrid selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PonudaPage;
