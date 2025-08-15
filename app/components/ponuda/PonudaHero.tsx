'use client';

import React from 'react';
import Image from 'next/image';

const PonudaHero = () => {
  return (
    <div className='relative min-h-[35vh] overflow-hidden'>
      {/* Background image */}
      <div className='absolute inset-0 -z-20'>
        <Image
          src='/img/1.jpg'
          alt='LaDelta Ponuda Background'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Elegant overlay for readability */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-white/85 via-white/75 to-white/60' />

      {/* Decorative elements */}
      <div className='absolute inset-0 -z-10'>
        <div
          className='absolute top-20 right-20 w-32 h-32 rounded-full opacity-5'
          style={{ backgroundColor: '#7DCCBD' }}
        />
        <div className='absolute bottom-32 left-20 w-24 h-24 bg-amber-200 rounded-full opacity-10' />
        <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-rose-200 rounded-full opacity-15' />
      </div>

      <div className='container-page py-6 relative'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-playfair font-black text-gray-900 leading-tight mb-4'>
            Naša
            <br />
            <span className='relative'>
              Ponuda
              <svg
                className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-3 max-w-sm'
                viewBox='0 0 300 12'
              >
                <path
                  d='M5,6 Q150,1 295,6'
                  stroke='#7DCCBD'
                  strokeWidth='3'
                  fill='none'
                  strokeLinecap='round'
                />
              </svg>
            </span>
          </h1>
          <p className='text-xl text-gray-600 leading-relaxed mb-2 max-w-2xl mx-auto'>
            Otkrijte naš bogat asortiman ukusnih torti, kolača i slastica
            pripremljenih s ljubavlju i pažnjom za svaki detalj
          </p>
        </div>
      </div>
    </div>
  );
};

export default PonudaHero;
