'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm'>
      <div className='container-page flex items-center justify-between h-20'>
        <Link href='/' className='flex items-center'>
          <div className='w-24 h-24 relative flex items-center justify-center'>
            <Image
              src='/img/logo.png'
              alt='LaDelta Logo'
              width={96}
              height={96}
              className='object-contain'
            />
          </div>
        </Link>

        <nav className='hidden md:flex items-center gap-6'>
          <Link
            href='/ponuda'
            className='text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-50'
          >
            Ponuda
          </Link>
          <a
            href='#o-nama'
            className='text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-50'
          >
            O nama
          </a>
          <a
            href='#kontakt'
            className='text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-50'
          >
            Kontakt
          </a>
          <a
            href='#naruci'
            className='inline-flex items-center px-6 py-2.5 text-white font-medium transition-all duration-300 rounded-xl shadow-md hover:shadow-lg hover:scale-105'
            style={{ backgroundColor: '#7DCCBD' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#6BB8A8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#7DCCBD';
            }}
          >
            <span className='mr-2'>🛒</span>
            Naruči
          </a>
        </nav>

        {/* Mobile Menu Toggle - Plus Sign */}
        <button
          onClick={() => setOpen(!open)}
          className='md:hidden relative w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300'
          style={{
            backgroundColor: open ? '#7DCCBD' : undefined,
          }}
          aria-label='Toggle Menu'
        >
          <Plus
            className={`w-6 h-6 transition-all duration-300 ${
              open ? 'rotate-45 text-white' : 'rotate-0 text-gray-700'
            }`}
          />
        </button>
      </div>

      {/* Mobile Side Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          open
            ? 'visible opacity-100'
            : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Side Menu */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.23,1,0.320,1)] ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Header */}
          <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
            <div className='w-20 h-20 relative flex items-center justify-center'>
              <Image
                src='/img/logo.png'
                alt='LaDelta Logo'
                width={80}
                height={80}
                className='object-contain'
              />
            </div>
            <button
              onClick={() => setOpen(false)}
              className='w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center'
            >
              <Plus className='w-6 h-6 rotate-45 text-gray-600' />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className='p-6 space-y-4'>
            <Link
              href='/ponuda'
              className={`flex items-center text-gray-700 hover:text-gray-900 transition-all font-medium text-base py-3 px-4 rounded-xl hover:bg-gray-50 group transform ${
                open
                  ? 'translate-x-0 opacity-100 delay-100'
                  : 'translate-x-8 opacity-0'
              }`}
              style={{
                transitionDuration: '0.5s',
                transitionDelay: open ? '0.1s' : '0s',
              }}
              onClick={() => setOpen(false)}
            >
              <span className='mr-3 text-xl'>🍰</span>
              <span>Ponuda</span>
              <span className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity'>
                →
              </span>
            </Link>
            <a
              href='#galerija'
              className={`flex items-center text-gray-700 hover:text-gray-900 transition-all font-medium text-base py-3 px-4 rounded-xl hover:bg-gray-50 group transform ${
                open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{
                transitionDuration: '0.5s',
                transitionDelay: open ? '0.2s' : '0s',
              }}
              onClick={() => setOpen(false)}
            >
              <span className='mr-3 text-xl'>📸</span>
              <span>Galerija</span>
              <span className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity'>
                →
              </span>
            </a>
            <a
              href='#o-nama'
              className={`flex items-center text-gray-700 hover:text-gray-900 transition-all font-medium text-base py-3 px-4 rounded-xl hover:bg-gray-50 group transform ${
                open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{
                transitionDuration: '0.5s',
                transitionDelay: open ? '0.3s' : '0s',
              }}
              onClick={() => setOpen(false)}
            >
              <span className='mr-3 text-xl'>👨‍🍳</span>
              <span>O nama</span>
              <span className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity'>
                →
              </span>
            </a>
            <a
              href='#kontakt'
              className={`flex items-center text-gray-700 hover:text-gray-900 transition-all font-medium text-base py-3 px-4 rounded-xl hover:bg-gray-50 group transform ${
                open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{
                transitionDuration: '0.5s',
                transitionDelay: open ? '0.4s' : '0s',
              }}
              onClick={() => setOpen(false)}
            >
              <span className='mr-3 text-xl'>📞</span>
              <span>Kontakt</span>
              <span className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity'>
                →
              </span>
            </a>
          </nav>

          {/* CTA Button in Menu */}
          <div
            className={`p-6 border-t border-gray-100 transform transition-all duration-500 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: open ? '0.5s' : '0s' }}
          >
            <button
              className='w-full py-4 px-6 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg transform hover:scale-105'
              style={{ backgroundColor: '#7DCCBD' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6BB8A8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#7DCCBD';
              }}
              onClick={() => setOpen(false)}
            >
              <span className='mr-2'>🛒</span>
              Naruči sada
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
