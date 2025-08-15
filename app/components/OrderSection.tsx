'use client';

import { useState } from 'react';

export default function OrderSection() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
    occasion: '',
    date: '',
    people: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show an alert
    alert('Hvala na upitu! Uskoro ćemo vam se javiti.');
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id='naruci' className='py-20 sm:py-28 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-brandTeal-50/20 via-white to-brandGold-50/20' />
        <div className='absolute top-20 right-20 w-32 h-32 bg-brandGold-200 rounded-full opacity-10' />
        <div className='absolute bottom-20 left-20 w-24 h-24 bg-brandTeal-200 rounded-full opacity-10' />
      </div>

      <div className='container-page'>
        {/* Header */}
        <div className='text-center mb-16'>
          <span className='inline-block px-4 py-2 text-sm font-medium text-brandGold bg-brandGold-50 rounded-full mb-4'>
            🎂 Naručite
          </span>
          <h2 className='text-4xl sm:text-5xl font-bold tracking-tight text-gradient mb-6'>
            Spremni za narudžbu?
          </h2>
          <p className='text-lg text-warmGray max-w-2xl mx-auto'>
            Pošaljite nam upit s detaljima o prigodi, željenom datumu i broju
            osoba. Odgovaramo u pravilu unutar 24 sata s prijedlogom i cijenom.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-16 items-start'>
          {/* Left side - Information */}
          <div className='space-y-8'>
            <div>
              <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                Kako funkcionira narudžba?
              </h3>
              <div className='space-y-6'>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 bg-brandTeal text-white rounded-full flex items-center justify-center text-sm font-bold'>
                    1
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      Pošaljite upit
                    </h4>
                    <p className='text-warmGray text-sm'>
                      Opišite nam što trebate i kad vam treba
                    </p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 bg-brandTeal text-white rounded-full flex items-center justify-center text-sm font-bold'>
                    2
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      Dobijete ponudu
                    </h4>
                    <p className='text-warmGray text-sm'>
                      Pripremit ćemo prijedlog s cijenom i detaljima
                    </p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 bg-brandTeal text-white rounded-full flex items-center justify-center text-sm font-bold'>
                    3
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      Potvrdite narudžbu
                    </h4>
                    <p className='text-warmGray text-sm'>
                      Dogovorimo finalne detalje i početak rada
                    </p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 bg-brandGold text-black rounded-full flex items-center justify-center text-sm font-bold'>
                    4
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      Uživajte!
                    </h4>
                    <p className='text-warmGray text-sm'>
                      Vaša slastica će biti spremna na vrijeme
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick contact options */}
            <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm'>
              <h4 className='font-bold text-gray-900 mb-4'>
                Ili nas kontaktirajte direktno:
              </h4>
              <div className='space-y-3'>
                <a
                  href='mailto:info@ladelta.hr'
                  className='flex items-center gap-3 text-warmGray hover:text-brandTeal transition-colors'
                >
                  <span className='text-lg'>📧</span>
                  <span>info@ladelta.hr</span>
                </a>
                <a
                  href='tel:+385000000'
                  className='flex items-center gap-3 text-warmGray hover:text-brandTeal transition-colors'
                >
                  <span className='text-lg'>📞</span>
                  <span>+385 00 000 000</span>
                </a>
                <div className='flex items-center gap-3 text-warmGray'>
                  <span className='text-lg'>🕐</span>
                  <span>Pon-Pet: 9-17h, Sub: 9-13h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Order form */}
          <div className='bg-white rounded-3xl p-8 shadow-xl border border-gray-100'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='text-center mb-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  Pošaljite nam upit
                </h3>
                <p className='text-warmGray text-sm'>
                  Ispunite formu i javit ćemo vam se uskoro
                </p>
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Ime i prezime *
                  </label>
                  <input
                    type='text'
                    name='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-transparent transition-all duration-200'
                    placeholder='Vaše ime i prezime'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email ili telefon *
                  </label>
                  <input
                    type='text'
                    name='contact'
                    required
                    value={formData.contact}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-transparent transition-all duration-200'
                    placeholder='Kako vas možemo kontaktirati'
                  />
                </div>
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Prigoda
                  </label>
                  <select
                    name='occasion'
                    value={formData.occasion}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-transparent transition-all duration-200'
                  >
                    <option value=''>Odaberite prigodu</option>
                    <option value='rođendan'>Rođendan</option>
                    <option value='vjenčanje'>Vjenčanje</option>
                    <option value='krštenje'>Krštenje</option>
                    <option value='godišnjica'>Godišnjica</option>
                    <option value='poslovno'>Poslovni događaj</option>
                    <option value='ostalo'>Ostalo</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Željeni datum
                  </label>
                  <input
                    type='date'
                    name='date'
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-transparent transition-all duration-200'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Broj osoba (približno)
                </label>
                <input
                  type='number'
                  name='people'
                  value={formData.people}
                  onChange={handleChange}
                  min='1'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-transparent transition-all duration-200'
                  placeholder='Za koliko osoba?'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Detalji narudžbe *
                </label>
                <textarea
                  name='message'
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-transparent transition-all duration-200 resize-none'
                  placeholder='Opišite što trebate: vrsta slastice, okusi, dizajn, posebne želje...'
                />
              </div>

              <button
                type='submit'
                className='w-full btn-primary text-base py-4 text-center'
              >
                🎂 Pošaljite upit
              </button>

              <p className='text-xs text-warmGray text-center'>
                Klikom na &quot;Pošaljite upit&quot; slažete se da vas
                kontaktiramo u vezi vaše narudžbe.
                <br />
                <em>
                  Napomena: Forma je trenutno informativna - kontaktirajte nas
                  direktno.
                </em>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
