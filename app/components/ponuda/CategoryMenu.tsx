'use client';

import React from 'react';

interface CategoryMenuProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  {
    id: 'torte',
    name: 'Torte',
    icon: '🎂',
  },
  {
    id: 'prigodne-torte',
    name: 'Prigodne Torte',
    icon: '🎉',
  },
  {
    id: 'kolaci',
    name: 'Kolači',
    icon: '🧁',
  },
  {
    id: 'cajni-asortiman',
    name: 'Čajni Asortiman',
    icon: '☕',
  },
];

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className='bg-white rounded-2xl shadow-lg p-5 lg:sticky lg:top-6 border border-gray-100'>
      <h2 className='text-xl font-playfair font-bold text-gray-900 mb-5 text-center'>
        Kategorije
      </h2>

      <div className='grid grid-cols-2 lg:grid-cols-1 gap-3'>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`w-full p-3 rounded-xl transition-all duration-300 hover:shadow-md ${
              selectedCategory === category.id
                ? 'text-white shadow-lg transform scale-102'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
            style={{
              backgroundColor:
                selectedCategory === category.id ? '#7DCCBD' : undefined,
            }}
            onMouseEnter={(e) => {
              if (selectedCategory === category.id) {
                e.currentTarget.style.backgroundColor = '#6BB8A8';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory === category.id) {
                e.currentTarget.style.backgroundColor = '#7DCCBD';
              }
            }}
          >
            <div className='flex flex-col lg:flex-row items-center lg:items-center lg:space-x-2 text-center lg:text-left'>
              <span className='text-lg mb-1 lg:mb-0'>{category.icon}</span>
              <div className='lg:flex-1'>
                <h3 className='font-medium text-sm lg:text-base'>
                  {category.name}
                </h3>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Contact Info */}
      <div className='mt-8 p-4 bg-gray-50 rounded-xl'>
        <h3 className='font-medium text-gray-900 mb-1 text-sm'>
          Poručite telefonom
        </h3>
        <p className='font-bold text-base' style={{ color: '#7DCCBD' }}>
          +385 1 123 4567
        </p>
        <p className='text-xs text-gray-600 mt-1'>Pon-Ned: 08:00 - 20:00</p>
      </div>
    </div>
  );
};

export default CategoryMenu;
