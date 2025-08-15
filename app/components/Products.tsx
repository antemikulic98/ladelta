'use client';

import { useState } from 'react';
import Image from 'next/image';
import OrderModal from './OrderModal';

type Product = {
  name: string;
  description: string;
  image: string;
  price: string;
  featured?: boolean;
  ingredients: string[];
  sizes: string[];
};

const products: Product[] = [
  {
    name: 'Čokoladna bomba',
    description:
      'Intenzivna tamna čokolada s bogatom kremom i dekorativnim detaljima. Tri sloja čokoladnog biskvita s ganache kremom.',
    image: '/img/torte/cokoladna-bomba.jpg',
    price: '€15',
    featured: true,
    ingredients: [
      'Belgijska čokolada',
      'Svježa jaja',
      'Ganache krema',
      'Kakao',
    ],
    sizes: [
      'Mala (6-8 osoba)',
      'Srednja (10-12 osoba)',
      'Velika (15-20 osoba)',
    ],
  },
  {
    name: 'Ganache torta',
    description:
      'Luksuzna torta s glatkim ganache prelivom od najbolje čokolade. Savršen spoj slatkoće i elegancije.',
    image: '/img/torte/ganashe-s-tamnom-cokoladom.jpg',
    price: '€14',
    ingredients: [
      'Francuska čokolada',
      'Svježi krem',
      'Mascarpone',
      'Vanilija',
    ],
    sizes: [
      'Mala (6-8 osoba)',
      'Srednja (10-12 osoba)',
      'Velika (15-20 osoba)',
    ],
  },
  {
    name: 'Biskvit vanilija',
    description:
      'Tradicijska torta s nežnim biskvitom i kremastom vanilija kremom. Tradicionalni recepti s modernim dodirom.',
    image: '/img/torte/biskvit-vanilija.jpg',
    price: '€12',
    featured: true,
    ingredients: ['Pravi vanilija', 'Svježa jaja', 'Maslac', 'Ljubav'],
    sizes: [
      'Mala (6-8 osoba)',
      'Srednja (10-12 osoba)',
      'Velika (15-20 osoba)',
    ],
  },
];

export default function ProductsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product?: Product) => {
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id='ponuda' className='py-20 sm:py-28 bg-gray-50'>
        <div className='container-page'>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-2 text-sm font-medium text-brandGold bg-brandGold-50 rounded-full mb-4'>
              🍰 Naša ponuda
            </span>
            <h2 className='text-4xl sm:text-5xl font-bold tracking-tight text-gradient mb-6'>
              Slastice za svaku priliku
            </h2>
            <p className='text-lg text-warmGray max-w-2xl mx-auto'>
              Od intimnih proslava do velikih događanja, naše slastice čine
              svaki trenutak posebnim. Birajte između naših popularnih proizvoda
              ili nas kontaktirajte za prilagođene kreacije.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {products.map((product) => (
              <article
                key={product.name}
                className={`group relative cursor-pointer ${
                  product.featured ? 'lg:scale-105' : ''
                }`}
                onClick={() => openModal(product)}
              >
                {/* Enhanced Card Design */}
                <div className='product-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col'>
                  {/* Featured badge */}
                  {product.featured && (
                    <div className='absolute top-4 left-4 bg-gradient-to-r from-brandGold to-brandGold-600 text-white px-3 py-1 rounded-full text-sm font-bold z-20 shadow-lg'>
                      ⭐ Popularno
                    </div>
                  )}

                  {/* Image section with enhanced visual */}
                  <div className='relative overflow-hidden h-56'>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-500'
                    />

                    {/* Light gradient overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />

                    {/* Price badge */}
                    <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-brandTeal px-3 py-1 rounded-full text-sm font-bold shadow-lg border border-gray-200'>
                      {product.price}
                    </div>

                    {/* Hover overlay */}
                    <div className='absolute inset-0 bg-brandTeal/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'>
                      <div className='bg-white px-4 py-2 rounded-full text-brandTeal font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg border border-gray-200'>
                        Kliknite za narudžbu →
                      </div>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className='p-6 bg-white relative flex-1 flex flex-col'>
                    <div className='mb-4'>
                      <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-brandTeal transition-colors duration-300'>
                        {product.name}
                      </h3>
                      <p className='text-warmGray text-sm leading-relaxed'>
                        {product.description}
                      </p>
                    </div>

                    {/* Ingredients preview */}
                    <div className='mb-4'>
                      <div className='flex flex-wrap gap-1'>
                        {product.ingredients
                          .slice(0, 3)
                          .map((ingredient, i) => (
                            <span
                              key={i}
                              className='text-xs bg-brandTeal-50 text-brandTeal px-2 py-1 rounded-full'
                            >
                              {ingredient}
                            </span>
                          ))}
                        {product.ingredients.length > 3 && (
                          <span className='text-xs text-warmGray'>
                            +{product.ingredients.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Call to action */}
                    <div className='flex items-center justify-between mt-auto'>
                      <div className='text-sm text-warmGray'>
                        {product.sizes.length} veličine
                      </div>
                      <div className='btn-primary px-4 py-2 text-xs group-hover:bg-brandTeal-600 transition-all duration-300'>
                        Naruči sada
                      </div>
                    </div>

                    {/* Decorative corner */}
                    <div className='absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-brandGold/20 to-transparent rounded-tl-full' />
                  </div>
                </div>

                {/* Floating elements for enhanced visual */}
                <div className='absolute -top-2 -right-2 w-6 h-6 bg-brandGold rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 animate-pulse' />
                <div className='absolute -bottom-2 -left-2 w-4 h-4 bg-brandTeal rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 animate-pulse' />
              </article>
            ))}
          </div>

          {/* Enhanced Call to action */}
          <div className='mt-20 text-center'>
            <div className='bg-white rounded-3xl p-8 max-w-3xl mx-auto shadow-2xl border border-gray-100'>
              <div className='text-6xl mb-6'>🎂</div>
              <h3 className='text-3xl font-bold text-gray-900 mb-4'>
                Trebate nešto posebno?
              </h3>
              <p className='text-warmGray mb-8 text-lg max-w-xl mx-auto'>
                Radimo po narudžbi i prilagođavamo se vašim željama.
                Kontaktirajte nas za personalizirane torte i kolače koji će
                ostaviti nezaboravan dojam.
              </p>
              <div className='flex flex-wrap gap-4 justify-center'>
                <button
                  onClick={() => openModal()}
                  className='btn-secondary hover:scale-105 transition-transform duration-300'
                >
                  🛒 Naruči prilagođeno
                </button>
                <a
                  href='#kontakt'
                  className='inline-flex items-center px-6 py-3 border-2 border-brandTeal text-brandTeal rounded-full hover:bg-brandTeal hover:text-white transition-all duration-300 hover:scale-105'
                >
                  📞 Kontakt
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProduct={selectedProduct}
      />
    </>
  );
}
