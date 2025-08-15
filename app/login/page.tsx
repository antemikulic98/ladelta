'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(redirectUrl);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center p-4'>
      <div className='max-w-md w-full'>
        {/* Logo and Header */}
        <div className='text-center mb-8'>
          <div className='mx-auto w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-4'>
            <Image
              src='/img/logo.png'
              alt='LaDelta Logo'
              width={48}
              height={48}
              className='object-contain'
            />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 font-playfair'>
            LaDelta
          </h1>
          <p className='text-gray-600 mt-2'>Prijava u administratorski panel</p>
        </div>

        {/* Login Form */}
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {error && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md'>
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-800 mb-2'
              >
                Email adresa
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 placeholder-gray-500'
                placeholder='admin@ladelta.com'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-800 mb-2'
              >
                Lozinka
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 placeholder-gray-500'
                placeholder='••••••••'
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
            >
              {loading ? 'Prijavljivanje...' : 'Prijavi se'}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-500'>
              Trebate pomoć? Kontaktirajte administratora.
            </p>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className='mt-6 text-center'>
          <div className='bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md text-sm'>
            <p className='font-medium mb-2'>Podaci za prijavu:</p>
            <div className='space-y-1'>
              <p>
                <strong>Admin:</strong> admin@ladelta.com / change-this-password
              </p>
              <p>
                <strong>Jakov:</strong> jakov@ladelta.hr / 123Jakov!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
