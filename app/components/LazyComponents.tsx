'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy loading wrapper for 3D components
const CakeStudioLazy = dynamic(() => import('./CakeStudio'), {
  ssr: false, // Disable server-side rendering for 3D components
  loading: () => (
    <div className='w-full px-6 py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            🎂 Cake Studio
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Učitava se interaktivni 3D kreator...
          </p>
        </div>

        {/* Loading placeholder that matches CakeStudio layout */}
        <div className='grid grid-cols-1 xl:grid-cols-5 gap-8'>
          <div className='xl:col-span-2 space-y-6'>
            {/* Loading skeleton for controls */}
            <div className='animate-pulse space-y-4'>
              <div className='h-6 bg-gray-200 rounded w-1/3'></div>
              <div className='grid grid-cols-3 gap-3'>
                {[1, 2, 3].map((i) => (
                  <div key={i} className='h-16 bg-gray-200 rounded-xl'></div>
                ))}
              </div>
            </div>

            <div className='animate-pulse space-y-4'>
              <div className='h-6 bg-gray-200 rounded w-1/2'></div>
              <div className='h-12 bg-gray-200 rounded-lg'></div>
            </div>

            <div className='animate-pulse space-y-4'>
              <div className='h-6 bg-gray-200 rounded w-1/3'></div>
              <div className='h-12 bg-gray-200 rounded-lg'></div>
            </div>

            <div className='animate-pulse space-y-4'>
              <div className='h-6 bg-gray-200 rounded w-1/2'></div>
              <div className='h-12 bg-gray-200 rounded-lg'></div>
            </div>
          </div>

          {/* Loading skeleton for 3D preview */}
          <div className='xl:col-span-3'>
            <div className='bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-200 overflow-hidden h-[600px] flex items-center justify-center'>
              <div className='text-center space-y-4'>
                <div className='w-20 h-20 mx-auto bg-gray-200 rounded-full animate-pulse'></div>
                <div className='space-y-2'>
                  <div className='h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse'></div>
                  <div className='h-3 bg-gray-200 rounded w-32 mx-auto animate-pulse'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
});

const EnhancedRealisticCakeLazy = dynamic(
  () => import('./EnhancedRealisticCake'),
  {
    ssr: false,
    loading: () => (
      <div className='h-80 w-full rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center'>
        <div className='text-center space-y-2'>
          <div className='w-12 h-12 mx-auto bg-gray-200 rounded-full animate-pulse'></div>
          <p className='text-sm text-gray-500'>Učitava se 3D model...</p>
        </div>
      </div>
    ),
  }
);

// Error boundary for 3D components
export function CakeStudioWithFallback() {
  return (
    <Suspense
      fallback={
        <div className='w-full px-6 py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
          <div className='max-w-7xl mx-auto text-center'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              🎂 Cake Studio
            </h2>
            <p className='text-lg text-gray-600'>Učitava se...</p>
          </div>
        </div>
      }
    >
      <CakeStudioLazy />
    </Suspense>
  );
}

type CakeProps = {
  size: 'small' | 'medium' | 'large';
  insideFlavor:
    | 'chocolate'
    | 'vanilla'
    | 'strawberry'
    | 'lemon'
    | 'red-velvet'
    | 'carrot';
  outsideCovering:
    | 'krema'
    | 'marcipan'
    | 'chocolate-ganache'
    | 'fondant'
    | 'buttercream';
  layers: 1 | 2 | 3;
  decoration:
    | 'simple'
    | 'roses'
    | 'berries'
    | 'chocolate-drip'
    | 'gold-leaf'
    | 'custom-message'
    | 'themed';
};

export function EnhancedRealisticCakeWithFallback(props: CakeProps) {
  return (
    <Suspense
      fallback={
        <div className='h-80 w-full rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center'>
          <p className='text-sm text-gray-500'>Učitava se 3D model...</p>
        </div>
      }
    >
      <EnhancedRealisticCakeLazy {...props} />
    </Suspense>
  );
}
