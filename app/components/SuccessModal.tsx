'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import ConfettiExplosion from 'react-confetti-explosion';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
  customerName?: string;
  pickupDate?: string;
  pickupTime?: string;
  pickupLocation?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  orderNumber,
  customerName,
  pickupDate,
  pickupTime,
  pickupLocation,
}: SuccessModalProps) {
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    if (isOpen) {
      console.log('🎉 Success modal opened, triggering confetti!');

      // Trigger multiple confetti effects
      setShowExplosion(true);

      // Test canvas-confetti
      if (typeof confetti === 'function') {
        console.log('✅ Canvas confetti is available');

        const triggerCanvasConfetti = () => {
          console.log('🎊 Firing canvas confetti!');

          // Simple reliable confetti
          confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
          });

          // Side bursts
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 60,
              origin: { x: 0, y: 0.7 },
            });
          }, 250);

          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 60,
              origin: { x: 1, y: 0.7 },
            });
          }, 500);
        };

        // Multiple waves
        triggerCanvasConfetti();
        setTimeout(triggerCanvasConfetti, 1000);
        setTimeout(triggerCanvasConfetti, 2000);
      } else {
        console.error('❌ Canvas confetti not available!');
      }

      // Reset explosion after a while for potential re-triggering
      setTimeout(() => {
        setShowExplosion(false);
      }, 3000);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4'>
      {/* Confetti Explosions */}
      {showExplosion && (
        <>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99999]'>
            <ConfettiExplosion
              force={0.8}
              duration={3000}
              particleCount={250}
              width={1600}
              colors={['#7DCCBD', '#FFD700', '#FF69B4', '#87CEEB', '#FFA500']}
            />
          </div>
          <div className='absolute top-1/3 left-1/4 z-[99999]'>
            <ConfettiExplosion
              force={0.6}
              duration={2500}
              particleCount={150}
              width={1200}
              colors={['#7DCCBD', '#FF1493', '#00CED1']}
            />
          </div>
          <div className='absolute top-1/3 right-1/4 z-[99999]'>
            <ConfettiExplosion
              force={0.6}
              duration={2500}
              particleCount={150}
              width={1200}
              colors={['#FFD700', '#FF69B4', '#87CEEB']}
            />
          </div>
        </>
      )}

      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full mx-auto overflow-hidden animate-scaleIn'>
        {/* Decorative Background Pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute top-8 left-8 w-16 h-16 rounded-full bg-gradient-to-r from-pink-300 to-orange-300'></div>
          <div className='absolute top-4 right-12 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-pink-300'></div>
          <div className='absolute bottom-8 left-12 w-12 h-12 rounded-full bg-gradient-to-r from-blue-300 to-purple-300'></div>
          <div className='absolute bottom-4 right-8 w-20 h-20 rounded-full bg-gradient-to-r from-green-300 to-blue-300'></div>
        </div>

        {/* Content */}
        <div className='relative p-4 sm:p-8 text-center'>
          {/* Success Icon and Animation */}
          <div className='relative mb-6'>
            <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full shadow-lg mb-4 animate-bounce'>
              <span className='text-5xl animate-pulse'>🎉</span>
            </div>
            <div className='absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping'></div>
            <div className='absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full animate-pulse delay-300'></div>
          </div>

          {/* Main Success Message */}
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-playfair'>
            🎂 Narudžba uspješno poslana!
          </h2>

          <div className='bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6'>
            <p className='text-base sm:text-lg text-gray-800 font-medium mb-3 sm:mb-4'>
              Hvala vam{' '}
              {customerName && (
                <span className='font-bold text-green-700'>{customerName}</span>
              )}
              ! Vaša narudžba je uspješno zaprimljena.
            </p>

            {orderNumber && (
              <div className='bg-white rounded-xl p-4 border border-green-200 mb-4'>
                <p className='text-sm text-gray-600 mb-1'>Broj narudžbe:</p>
                <p className='text-xl sm:text-2xl font-black text-green-700 tracking-wider'>
                  {orderNumber}
                </p>
              </div>
            )}

            {pickupDate && pickupTime && pickupLocation && (
              <div className='bg-white rounded-xl p-4 border border-green-200'>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center justify-center gap-2'>
                  📍 Detalji preuzimanja
                </h4>
                <div className='space-y-2 text-sm'>
                  <p>
                    <span className='font-medium text-gray-700'>Lokacija:</span>{' '}
                    <span className='font-bold text-gray-900'>
                      {pickupLocation}
                    </span>
                  </p>
                  <p>
                    <span className='font-medium text-gray-700'>Datum:</span>{' '}
                    <span className='font-bold text-gray-900'>
                      {pickupDate}
                    </span>
                  </p>
                  <p>
                    <span className='font-medium text-gray-700'>Vrijeme:</span>{' '}
                    <span className='font-bold text-gray-900'>
                      {pickupTime}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Status Information */}
          <div className='bg-blue-50 border-2 border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6'>
            <h4 className='font-bold text-blue-900 mb-2 flex items-center justify-center gap-2'>
              📊 Status narudžbe
            </h4>
            <div className='flex items-center justify-center gap-2 bg-blue-100 rounded-xl p-3'>
              <span className='w-3 h-3 bg-blue-500 rounded-full animate-pulse'></span>
              <span className='font-bold text-blue-800'>NARUČENO</span>
            </div>
            <p className='text-xs text-blue-600 mt-2'>
              Kontaktirat ćemo vas uskoro za potvrdu i dodatne detalje
            </p>
          </div>

          {/* Next Steps */}
          <div className='bg-yellow-50 border-2 border-yellow-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6'>
            <h4 className='font-bold text-yellow-900 mb-3'>📞 Što slijedi?</h4>
            <div className='text-left space-y-2 text-sm text-yellow-800'>
              <div className='flex items-start gap-3'>
                <span className='text-lg'>1️⃣</span>
                <p>
                  <strong>Potvrda narudžbe:</strong> Kontaktirat ćemo vas u
                  sljedećih 2 sata
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-lg'>2️⃣</span>
                <p>
                  <strong>Priprema:</strong> Naš tim će početi s pripremom vaše
                  torte
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-lg'>3️⃣</span>
                <p>
                  <strong>Obavijest:</strong> Poslat ćemo poruku kada bude
                  spremna za preuzimanje
                </p>
              </div>
            </div>
          </div>

          {/* Celebration Message */}
          <div className='bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 mb-6'>
            <div className='text-center'>
              <div className='text-4xl mb-2 animate-bounce'>🎉</div>
              <p className='text-lg font-bold text-purple-800'>
                Čestitamo! Vaša narudžba je uspješno poslana!
              </p>
              <p className='text-sm text-purple-600 mt-1'>
                Pripremit ćemo vašu tortu s posebnom pažnjom
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
            <button
              onClick={onClose}
              className='flex-1 py-2.5 sm:py-3 px-4 sm:px-6 bg-gray-100 text-gray-700 font-medium sm:font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 transition-all duration-300 text-sm sm:text-base'
            >
              Zatvori
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              className='flex-1 py-2.5 sm:py-3 px-4 sm:px-6 text-white font-medium sm:font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base'
              style={{ backgroundColor: '#7DCCBD' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6BB8A8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#7DCCBD';
              }}
            >
              🏠 Natrag na početnu
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
