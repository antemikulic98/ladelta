'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Star } from 'lucide-react';
import OrderModal from './OrderModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cakeData = [
    {
      src: '/img/torte/cokoladna-bomba.jpg',
      alt: 'Čokoladna bomba',
      title: 'Čokoladna bomba',
      description:
        'Intenzivna tamna čokolada s bogatom kremom i dekorativnim detaljima',
      price: '€15',
      badge: 'Bestseller',
      rating: '5.0',
    },
    {
      src: '/img/torte/ganashe-s-tamnom-cokoladom.jpg',
      alt: 'Ganache s tamnom čokoladom',
      title: 'Ganache torta',
      description:
        'Luksuzna torta s glatkim ganache prelivom od najbolje čokolade',
      price: '€14',
      badge: 'Premium',
      rating: '4.9',
    },
    {
      src: '/img/torte/biskvit-vanilija.jpg',
      alt: 'Biskvit s vanilijom',
      title: 'Biskvit vanilija',
      description:
        'Tradicijska torta s nežnim biskvitom i kremastom vanilija kremom',
      price: '€12',
      badge: 'Klasik',
      rating: '4.8',
    },
  ];

  const CakeCard = ({ cake }: { cake: (typeof cakeData)[0] }) => (
    <div className='group relative h-full'>
      <div className='bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 h-full flex flex-col'>
        <div className='relative h-48 overflow-hidden'>
          <Image
            src={cake.src}
            alt={cake.alt}
            fill
            className='object-cover group-hover:scale-110 transition-transform duration-700'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent'></div>
          <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800'>
            {cake.badge}
          </div>
          <div className='absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1'>
            {cake.rating}{' '}
            <Star className='w-3 h-3 fill-yellow-400 text-yellow-400' />
          </div>
        </div>
        <div className='p-6 flex flex-col flex-grow'>
          <h4 className='text-xl font-playfair font-bold text-gray-900 mb-2'>
            {cake.title}
          </h4>
          <p className='text-gray-600 text-sm mb-4 leading-relaxed flex-grow'>
            {cake.description}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className='w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5'
            style={{ backgroundColor: '#7DCCBD' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#6BB8A8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#7DCCBD';
            }}
          >
            Već od {cake.price}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className='relative min-h-[90vh] overflow-hidden'>
      {/* Beautiful background image */}
      <div className='absolute inset-0 -z-20'>
        <Image
          src='/img/1.jpg'
          alt='LaDelta Bakery Background'
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

      <div className='container-page py-12 sm:py-16 relative'>
        <div className='max-w-4xl mx-auto text-center'>
          {/* Main heading */}
          <h1 className='text-5xl sm:text-6xl lg:text-7xl font-playfair font-black text-gray-900 leading-tight mb-6'>
            Vaš kutak za
            <br />
            <span className='relative'>
              slatki trenutak
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

          {/* Description */}
          <p className='text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto'>
            Ručno rađene torte, kolači i slastice s ljubavlju. Svaki zalogaj je
            priča o tradiciji, kvaliteti i strasti prema slastičarstvu.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-16 max-w-md mx-auto sm:max-w-none'>
            <button
              onClick={() => setIsModalOpen(true)}
              className='flex items-center justify-center px-8 py-4 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto'
              style={{ backgroundColor: '#7DCCBD' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6BB8A8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#7DCCBD';
              }}
            >
              <span className='mr-2'>🛒</span>
              Naruči sada
            </button>
            <a
              href='#ponuda'
              className='flex items-center justify-center px-8 py-4 text-gray-700 font-medium rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto'
            >
              Pogledaj ponudu
              <span className='ml-2'>→</span>
            </a>
          </div>

          {/* Premium Cake Cards */}
          <div className='max-w-6xl mx-auto'>
            {/* Desktop Grid */}
            <div className='hidden md:grid grid-cols-3 gap-8'>
              {cakeData.map((cake, index) => (
                <CakeCard key={index} cake={cake} />
              ))}
            </div>

            {/* Mobile Swiper */}
            <div className='block md:hidden'>
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                className='cake-swiper'
                style={{
                  paddingBottom: '50px',
                }}
              >
                {cakeData.map((cake, index) => (
                  <SwiperSlide key={index}>
                    <CakeCard cake={cake} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProduct={null}
      />
    </section>
  );
}
