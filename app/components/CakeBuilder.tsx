'use client';

import { useState } from 'react';
import { ChefHat, Palette, Layers, Sparkles } from 'lucide-react';
import CleanCake from './CleanCake';
import CakeFeatures from './CakeFeatures';

type CakeOptions = {
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

export default function CakeBuilder() {
  const [cakeOptions, setCakeOptions] = useState<CakeOptions>({
    size: 'medium',
    insideFlavor: 'chocolate',
    outsideCovering: 'krema',
    layers: 2,
    decoration: 'roses',
  });

  const [isBuilding, setIsBuilding] = useState(false);

  const handleCustomize = () => {
    setIsBuilding(true);
    setTimeout(() => setIsBuilding(false), 2000);
  };

  return (
    <section className='py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='container-page'>
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 mb-4'>
            <ChefHat className='w-8 h-8' style={{ color: '#7DCCBD' }} />
            <h2 className='text-3xl font-bold text-gray-900'>
              Kreiraj svoju tortu
            </h2>
          </div>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            Personaliziraj svoju savršenu tortu. Odaberi veličinu, okus, broj
            slojeva i ukrase.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* 3D Cake Preview */}
          <div className='relative'>
            <div className='bg-white rounded-3xl p-8 shadow-2xl border border-gray-100'>
              <h3 className='text-xl font-bold text-gray-900 mb-6 text-center'>
                Pregled torte
              </h3>

              {/* Clean Realistic 3D Cake Visualization */}
              <div className='relative'>
                <CleanCake
                  size={cakeOptions.size}
                  insideFlavor={cakeOptions.insideFlavor}
                  outsideCovering={cakeOptions.outsideCovering}
                  layers={cakeOptions.layers}
                  decoration={cakeOptions.decoration}
                />

                {/* Building Animation Overlay */}
                {isBuilding && (
                  <div className='absolute inset-0 flex items-center justify-center bg-white/90 rounded-xl z-10'>
                    <div className='text-center'>
                      <div
                        className='w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-4 mx-auto'
                        style={{
                          borderColor: '#7DCCBD',
                          borderTopColor: 'transparent',
                        }}
                      ></div>
                      <p className='text-gray-600 font-medium'>
                        Kreiram vašu tortu...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Cake Info */}
              <div className='mt-8 p-4 bg-gray-50 rounded-xl'>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='text-gray-500'>Veličina:</span>
                    <span className='ml-2 font-semibold capitalize'>
                      {cakeOptions.size}
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-500'>Slojevi:</span>
                    <span className='ml-2 font-semibold'>
                      {cakeOptions.layers}
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-500'>Unutrašnjost:</span>
                    <span className='ml-2 font-semibold capitalize'>
                      {cakeOptions.insideFlavor}
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-500'>Prelivka:</span>
                    <span className='ml-2 font-semibold capitalize'>
                      {cakeOptions.outsideCovering}
                    </span>
                  </div>
                  <div className='col-span-2'>
                    <span className='text-gray-500'>Ukras:</span>
                    <span className='ml-2 font-semibold capitalize'>
                      {cakeOptions.decoration}
                    </span>
                  </div>
                </div>
                <div className='mt-4 pt-4 border-t border-gray-200'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-700 font-medium'>
                      Procjena cijene:
                    </span>
                    <span
                      className='text-2xl font-bold'
                      style={{ color: '#7DCCBD' }}
                    >
                      €
                      {25 +
                        (cakeOptions.size === 'large'
                          ? 15
                          : cakeOptions.size === 'medium'
                          ? 10
                          : 5) +
                        cakeOptions.layers * 5 +
                        (cakeOptions.outsideCovering === 'marcipan'
                          ? 8
                          : cakeOptions.outsideCovering === 'chocolate-ganache'
                          ? 6
                          : cakeOptions.outsideCovering === 'fondant'
                          ? 10
                          : 4) +
                        (cakeOptions.decoration === 'themed'
                          ? 25
                          : cakeOptions.decoration === 'gold-leaf'
                          ? 20
                          : cakeOptions.decoration === 'custom-message'
                          ? 15
                          : cakeOptions.decoration === 'chocolate-drip'
                          ? 12
                          : cakeOptions.decoration === 'berries'
                          ? 8
                          : cakeOptions.decoration === 'roses'
                          ? 10
                          : 0)}
                    </span>
                  </div>
                </div>

                {/* Enhanced 3D Features */}
                <CakeFeatures />
              </div>
            </div>
          </div>

          {/* Customization Options */}
          <div className='space-y-8'>
            {/* Size Selection */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Layers className='w-5 h-5' style={{ color: '#7DCCBD' }} />
                <h3 className='text-xl font-bold text-gray-900'>
                  Veličina torte
                </h3>
              </div>
              <div className='grid grid-cols-3 gap-3'>
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      setCakeOptions((prev) => ({ ...prev, size: size as any }))
                    }
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                      cakeOptions.size === size
                        ? 'border-[#7DCCBD] bg-[#7DCCBD]/10 text-[#7DCCBD]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className='font-semibold capitalize'>{size}</div>
                    <div className='text-sm text-gray-500 mt-1'>
                      {size === 'small'
                        ? '15cm'
                        : size === 'medium'
                        ? '20cm'
                        : '25cm'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Inside Flavor Selection */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Palette className='w-5 h-5' style={{ color: '#7DCCBD' }} />
                <h3 className='text-xl font-bold text-gray-900'>
                  Unutrašnji okus
                </h3>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                {[
                  { key: 'chocolate', label: 'Čokolada', color: '#8B4513' },
                  { key: 'vanilla', label: 'Vanilija', color: '#F5F5DC' },
                  { key: 'strawberry', label: 'Jagoda', color: '#FFB6C1' },
                  { key: 'lemon', label: 'Limun', color: '#FFFACD' },
                  { key: 'red-velvet', label: 'Red Velvet', color: '#DC143C' },
                  { key: 'carrot', label: 'Mrkva', color: '#FF8C00' },
                ].map((flavor) => (
                  <button
                    key={flavor.key}
                    onClick={() =>
                      setCakeOptions((prev) => ({
                        ...prev,
                        insideFlavor: flavor.key as any,
                      }))
                    }
                    className={`p-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-2 ${
                      cakeOptions.insideFlavor === flavor.key
                        ? 'border-[#7DCCBD] bg-[#7DCCBD]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className='w-5 h-5 rounded-full border-2 border-white shadow-md'
                      style={{ backgroundColor: flavor.color }}
                    />
                    <span className='font-medium text-sm'>{flavor.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Outside Covering Selection */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Sparkles className='w-5 h-5' style={{ color: '#7DCCBD' }} />
                <h3 className='text-xl font-bold text-gray-900'>
                  Vanjska prelivka
                </h3>
              </div>
              <div className='space-y-3'>
                {[
                  {
                    key: 'krema',
                    label: 'Krema',
                    desc: 'Klasična šlag krema',
                    color: '#FFFEF7',
                  },
                  {
                    key: 'marcipan',
                    label: 'Marcipan',
                    desc: 'Glatka marcipan masa',
                    color: '#F4E4BC',
                  },
                  {
                    key: 'chocolate-ganache',
                    label: 'Čoko Ganache',
                    desc: 'Bogati čokoladni preliv',
                    color: '#4A2C2A',
                  },
                  {
                    key: 'fondant',
                    label: 'Fondant',
                    desc: 'Savršeno glatka površina',
                    color: '#FFFFFF',
                  },
                  {
                    key: 'buttercream',
                    label: 'Buttercream',
                    desc: 'Kremasta maslac krema',
                    color: '#FFF8DC',
                  },
                ].map((covering) => (
                  <button
                    key={covering.key}
                    onClick={() =>
                      setCakeOptions((prev) => ({
                        ...prev,
                        outsideCovering: covering.key as any,
                      }))
                    }
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-3 ${
                      cakeOptions.outsideCovering === covering.key
                        ? 'border-[#7DCCBD] bg-[#7DCCBD]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className='w-8 h-8 rounded-full border-2 border-gray-300 shadow-md'
                      style={{ backgroundColor: covering.color }}
                    />
                    <div>
                      <div className='font-semibold'>{covering.label}</div>
                      <div className='text-sm text-gray-500'>
                        {covering.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Layers */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Layers className='w-5 h-5' style={{ color: '#7DCCBD' }} />
                <h3 className='text-xl font-bold text-gray-900'>
                  Broj slojeva
                </h3>
              </div>
              <div className='flex gap-3'>
                {[1, 2, 3].map((layers) => (
                  <button
                    key={layers}
                    onClick={() =>
                      setCakeOptions((prev) => ({
                        ...prev,
                        layers: layers as any,
                      }))
                    }
                    className={`w-16 h-16 rounded-xl border-2 transition-all duration-300 flex items-center justify-center font-bold text-lg ${
                      cakeOptions.layers === layers
                        ? 'border-[#7DCCBD] bg-[#7DCCBD] text-white'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {layers}
                  </button>
                ))}
              </div>
            </div>

            {/* Decoration */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Sparkles className='w-5 h-5' style={{ color: '#7DCCBD' }} />
                <h3 className='text-xl font-bold text-gray-900'>Ukrasi</h3>
              </div>
              <div className='space-y-3'>
                {[
                  {
                    key: 'simple',
                    label: 'Jednostavno',
                    desc: 'Čisto i minimalno',
                    icon: '✨',
                  },
                  {
                    key: 'roses',
                    label: 'Ružice',
                    desc: 'Elegantne krema ružice',
                    icon: '🌹',
                  },
                  {
                    key: 'berries',
                    label: 'Voće i bobice',
                    desc: 'Svježe jagode i maline',
                    icon: '🍓',
                  },
                  {
                    key: 'chocolate-drip',
                    label: 'Čoko preliv',
                    desc: 'Kapajući čokoladni preliv',
                    icon: '🍫',
                  },
                  {
                    key: 'gold-leaf',
                    label: 'Zlatni listići',
                    desc: 'Luksuzni zlatni detalji',
                    icon: '🏆',
                  },
                  {
                    key: 'custom-message',
                    label: 'Personalizirana poruka',
                    desc: 'Vaš tekst na torti',
                    icon: '💌',
                  },
                  {
                    key: 'themed',
                    label: 'Tematska',
                    desc: 'Poseban dizajn za priliku',
                    icon: '🎭',
                  },
                ].map((decoration) => (
                  <button
                    key={decoration.key}
                    onClick={() =>
                      setCakeOptions((prev) => ({
                        ...prev,
                        decoration: decoration.key as any,
                      }))
                    }
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-3 ${
                      cakeOptions.decoration === decoration.key
                        ? 'border-[#7DCCBD] bg-[#7DCCBD]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className='text-2xl'>{decoration.icon}</span>
                    <div>
                      <div className='font-semibold'>{decoration.label}</div>
                      <div className='text-sm text-gray-500'>
                        {decoration.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={handleCustomize}
              disabled={isBuilding}
              className='w-full py-4 px-6 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed'
              style={{ backgroundColor: '#7DCCBD' }}
              onMouseEnter={(e) => {
                if (!isBuilding)
                  e.currentTarget.style.backgroundColor = '#6BB8A8';
              }}
              onMouseLeave={(e) => {
                if (!isBuilding)
                  e.currentTarget.style.backgroundColor = '#7DCCBD';
              }}
            >
              {isBuilding ? 'Kreiram...' : '🎂 Naruči prilagođenu tortu'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
