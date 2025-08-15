'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

type Product = {
  name: string;
  description: string;
  image: string;
  price: string;
  featured?: boolean;
};

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
}

type PickupLocation = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  available: boolean;
};

const pickupLocations: PickupLocation[] = [
  {
    id: 'centar',
    name: 'Centar grada',
    address: 'Trg bana Josipa Jelačića 10, Zagreb',
    phone: '+385 1 123 4567',
    hours: 'Pon-Pet: 8:00-20:00, Sub: 9:00-18:00',
    available: true,
  },
  {
    id: 'novi-zagreb',
    name: 'Novi Zagreb',
    address: 'Avenue Mall, Av. Dubrovnik 16, Zagreb',
    phone: '+385 1 234 5678',
    hours: 'Pon-Ned: 10:00-22:00',
    available: true,
  },
  {
    id: 'maksimir',
    name: 'Maksimir',
    address: 'Maksimirska ulica 128, Zagreb',
    phone: '+385 1 345 6789',
    hours: 'Pon-Pet: 9:00-19:00, Sub: 10:00-16:00',
    available: false,
  },
];

// Custom Select Component
interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  name?: string;
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  required = false,
  name,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white hover:border-gray-300 focus:border-brandTeal focus:outline-none transition-all flex items-center justify-between text-left ${
          !selectedOption && placeholder ? 'text-gray-500' : 'text-gray-900'
        }`}
      >
        <span className='font-medium'>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-10'
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className='absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden max-h-60 overflow-y-auto'>
            {options.map((option) => (
              <button
                key={option.value}
                type='button'
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                  value === option.value
                    ? 'bg-brandTeal text-white font-medium'
                    : 'text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Hidden input for form validation */}
      {required && (
        <input type='hidden' name={name} value={value} required={required} />
      )}
    </div>
  );
}

export default function OrderModal({
  isOpen,
  onClose,
  selectedProduct,
}: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    occasion: '',
    date: '',
    people: '',
    pickupLocation: '',
    pickupTime: '',
    productName: selectedProduct?.name || '',
    size: '',
    specialRequests: '',
    customCakeImage: null as File | null,
    customCakePreview: null as string | null,
  });

  const [currentStep, setCurrentStep] = useState(1);

  // Update product name when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        productName: selectedProduct.name,
      }));
      setCurrentStep(2); // Skip product selection if product is already selected
    } else {
      setCurrentStep(1); // Start from product selection if no product selected
    }
  }, [selectedProduct]);

  const products: Product[] = [
    {
      name: 'Čokoladna bomba',
      description:
        'Intenzivna tamna čokolada s bogatom kremom i dekorativnim detaljima',
      image: '/img/torte/cokoladna-bomba.jpg',
      price: '€15',
      featured: true,
    },
    {
      name: 'Ganache torta',
      description:
        'Luksuzna torta s glatkim ganache prelivom od najbolje čokolade',
      image: '/img/torte/ganashe-s-tamnom-cokoladom.jpg',
      price: '€14',
    },
    {
      name: 'Biskvit vanilija',
      description:
        'Tradicijska torta s nežnim biskvitom i kremastom vanilija kremom',
      image: '/img/torte/biskvit-vanilija.jpg',
      price: '€12',
      featured: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get selected pickup location details
    const selectedLocation = pickupLocations.find(
      (loc) => loc.id === formData.pickupLocation
    );

    const customCakeNote = formData.customCakePreview
      ? ' Naš tim će analizirati vašu prilagođenu sliku i kontaktirati vas s detaljima.'
      : '';

    alert(
      `Hvala na narudžbi! Kontaktirat ćemo vas za ${
        formData.productName || 'vašu narudžbu'
      }. Preuzimanje: ${selectedLocation?.name || 'Nepoznato mjesto'} - ${
        formData.date
      } u ${formData.pickupTime}.${customCakeNote}`
    );
    onClose();
    setCurrentStep(selectedProduct ? 2 : 1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      occasion: '',
      date: '',
      people: '',
      pickupLocation: '',
      pickupTime: '',
      productName: selectedProduct?.name || '',
      size: '',
      specialRequests: '',
      customCakeImage: null,
      customCakePreview: null,
    });
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

  const selectProduct = (product: Product) => {
    setFormData((prev) => ({
      ...prev,
      productName: product.name,
      customCakeImage: null,
      customCakePreview: null,
    }));
    setCurrentStep(2);
  };

  const handleCustomCakeUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Datoteka je prevelika. Maksimalna veličina je 5MB.');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Molimo učitajte sliku (JPG, PNG, WEBP).');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          productName: 'Prilagođena torta',
          customCakeImage: file,
          customCakePreview: preview,
        }));
        setCurrentStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/60 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='flex min-h-full items-center justify-center p-4'>
        <div className='relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto'>
          {/* Header */}
          <div className='sticky top-0 z-10 bg-white border-b border-gray-100 rounded-t-3xl p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>
                  {currentStep === 1
                    ? 'Odaberite slasticu'
                    : currentStep === 2
                    ? 'Detalji narudžbe'
                    : 'Pregled i potvrda'}
                </h2>
                <p className='text-warmGray'>
                  {currentStep === 1
                    ? 'Koju slasticu želite naručiti?'
                    : currentStep === 2
                    ? 'Ispunite podatke za narudžbu'
                    : 'Provjerite detalje prije potvrde'}
                </p>
              </div>
              <button
                onClick={onClose}
                className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors'
              >
                <span className='text-gray-700 font-bold text-lg'>✕</span>
              </button>
            </div>

            {/* Progress */}
            <div className='flex items-center gap-2 mt-4'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 1
                    ? 'bg-brandTeal text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                1
              </div>
              <div
                className={`flex-1 h-2 rounded-full ${
                  currentStep >= 2 ? 'bg-brandTeal' : 'bg-gray-200'
                }`}
              />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 2
                    ? 'bg-brandTeal text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                2
              </div>
              <div
                className={`flex-1 h-2 rounded-full ${
                  currentStep >= 3 ? 'bg-brandTeal' : 'bg-gray-200'
                }`}
              />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 3
                    ? 'bg-brandTeal text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                3
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='p-6'>
            {currentStep === 1 ? (
              // Step 1: Product Selection
              <div className='space-y-8'>
                {/* First row - Three existing cakes */}
                <div>
                  <h3 className='text-lg font-bold text-gray-900 mb-4 text-center'>
                    Naše popularne torte
                  </h3>
                  <div className='grid md:grid-cols-3 gap-6'>
                    {products.map((product) => (
                      <div
                        key={product.name}
                        className='group relative h-full cursor-pointer'
                        onClick={() => selectProduct(product)}
                      >
                        <div className='bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 h-full flex flex-col'>
                          <div className='relative h-48 overflow-hidden'>
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className='object-cover group-hover:scale-110 transition-transform duration-700'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent'></div>
                            {product.featured && (
                              <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800'>
                                ⭐ Popularno
                              </div>
                            )}
                            <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800'>
                              {product.price}
                            </div>
                          </div>
                          <div className='p-6 flex flex-col flex-grow'>
                            <h4 className='text-xl font-bold text-gray-900 mb-2'>
                              {product.name}
                            </h4>
                            <p className='text-gray-600 text-sm mb-4 leading-relaxed flex-grow'>
                              {product.description}
                            </p>
                            <button
                              className='w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5'
                              style={{ backgroundColor: '#7DCCBD' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  '#6BB8A8';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  '#7DCCBD';
                              }}
                            >
                              Odaberi
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Second row - Custom cake upload */}
                <div className='relative'>
                  {/* Decorative divider */}
                  <div className='flex items-center justify-center mb-6'>
                    <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1'></div>
                    <div className='mx-4 text-gray-500 text-sm font-medium'>
                      ili
                    </div>
                    <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1'></div>
                  </div>

                  {/* Full-width upload section */}
                  <div className='group relative bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 border-2 border-dashed border-purple-200 rounded-2xl p-8 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-100 hover:via-pink-100 hover:to-orange-100 transition-all duration-500 cursor-pointer'>
                    {/* Background pattern */}
                    <div className='absolute inset-0 opacity-5'>
                      <div className='absolute top-4 left-4 w-8 h-8 border-2 border-purple-300 rounded-full'></div>
                      <div className='absolute top-8 right-8 w-6 h-6 border-2 border-pink-300 rounded-full'></div>
                      <div className='absolute bottom-6 left-12 w-4 h-4 border-2 border-orange-300 rounded-full'></div>
                      <div className='absolute bottom-4 right-6 w-10 h-10 border-2 border-purple-300 rounded-full'></div>
                    </div>

                    <div className='relative z-10 text-center'>
                      {/* Icon and main text */}
                      <div className='mb-6'>
                        <div className='inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 group-hover:scale-110 transition-transform duration-500'>
                          <span className='text-4xl'>📸</span>
                        </div>
                        <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                          Kreirajte svoju jedinstvenu tortu
                        </h3>
                        <p className='text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed'>
                          Imate specifičnu viziju? Učitajte sliku torte koju
                          želite da napravimo za vas. Naš tim stručnjaka će
                          analizirati dizajn i kontaktirati vas s detaljnim
                          prijedlogom.
                        </p>
                      </div>

                      {/* Upload button */}
                      <label className='inline-block'>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={handleCustomCakeUpload}
                          className='hidden'
                        />
                        <div
                          className='inline-flex items-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer'
                          style={{ backgroundColor: '#7DCCBD' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#6BB8A8';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#7DCCBD';
                          }}
                        >
                          <span className='text-xl'>📷</span>
                          Učitajte sliku svoje torte
                          <span className='text-sm opacity-90'>→</span>
                        </div>
                      </label>

                      {/* Helper text */}
                      <p className='text-xs text-gray-500 mt-4'>
                        Podržani formati: JPG, PNG, WEBP • Maksimalna veličina:
                        5MB
                      </p>
                    </div>

                    {/* Badge */}
                    <div className='absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg'>
                      ✨ Prilagođeno
                    </div>
                  </div>
                </div>
              </div>
            ) : currentStep === 2 ? (
              // Step 2: Order Details
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCurrentStep(3);
                }}
                className='space-y-6 max-w-3xl mx-auto'
              >
                {/* Selected product */}
                <div className='bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-200'>
                  {(() => {
                    const selectedProduct = products.find(
                      (p) => p.name === formData.productName
                    );
                    return (
                      <div className='w-16 h-16 rounded-xl overflow-hidden flex-shrink-0'>
                        {formData.customCakePreview ? (
                          <Image
                            src={formData.customCakePreview}
                            alt='Prilagođena torta'
                            width={64}
                            height={64}
                            className='w-full h-full object-cover'
                          />
                        ) : selectedProduct ? (
                          <Image
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            width={64}
                            height={64}
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <div className='w-full h-full bg-gradient-to-br from-brandTeal-100 to-brandGold-100 flex items-center justify-center'>
                            <span className='text-2xl'>🍰</span>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className='font-bold text-gray-900'>
                      {formData.productName}
                    </h3>
                    <p className='text-warmGray text-sm'>
                      {formData.customCakePreview
                        ? 'Prilagođena slastica s učitanom slikom'
                        : 'Odabrana slastica'}
                    </p>
                  </div>
                  <button
                    type='button'
                    onClick={() => setCurrentStep(1)}
                    className='ml-auto text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 hover:shadow-md'
                    style={{ color: '#7DCCBD' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#7DCCBD';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#7DCCBD';
                    }}
                  >
                    Promijeni
                  </button>
                </div>

                {/* Personal Information */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    👤 Vaši podaci
                  </h3>
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
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-brandTeal bg-white text-gray-900 font-medium placeholder-gray-500 transition-all duration-200'
                        placeholder='Vaše ime i prezime'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Email adresa *
                      </label>
                      <input
                        type='email'
                        name='email'
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-brandTeal bg-white text-gray-900 font-medium placeholder-gray-500 transition-all duration-200'
                        placeholder='vaš.email@example.com'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Broj telefona *
                      </label>
                      <input
                        type='tel'
                        name='phone'
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-brandTeal bg-white text-gray-900 font-medium placeholder-gray-500 transition-all duration-200'
                        placeholder='+385 xx xxx xxxx'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Veličina *
                      </label>
                      <CustomSelect
                        name='size'
                        required
                        value={formData.size}
                        onChange={(value) =>
                          setFormData((prev) => ({ ...prev, size: value }))
                        }
                        placeholder='Odaberite veličinu'
                        options={[
                          { value: 'mala', label: 'Mala (6-8 osoba)' },
                          { value: 'srednja', label: 'Srednja (10-12 osoba)' },
                          { value: 'velika', label: 'Velika (15-20 osoba)' },
                          { value: 'xl', label: 'XL (20+ osoba)' },
                        ]}
                      />
                    </div>
                  </div>
                </div>

                {/* Event Information */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    🎉 Detalji događaja
                  </h3>
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Prigoda
                      </label>
                      <CustomSelect
                        name='occasion'
                        value={formData.occasion}
                        onChange={(value) =>
                          setFormData((prev) => ({ ...prev, occasion: value }))
                        }
                        placeholder='Odaberite prigodu'
                        options={[
                          { value: 'rođendan', label: 'Rođendan' },
                          { value: 'vjenčanje', label: 'Vjenčanje' },
                          { value: 'krštenje', label: 'Krštenje' },
                          { value: 'godišnjica', label: 'Godišnjica' },
                          { value: 'poslovno', label: 'Poslovni događaj' },
                          { value: 'ostalo', label: 'Ostalo' },
                        ]}
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Željeni datum *
                      </label>
                      <input
                        type='date'
                        name='date'
                        required
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-brandTeal bg-white text-gray-900 font-medium transition-all duration-200'
                      />
                    </div>
                  </div>
                </div>

                {/* Pickup Information */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    📍 Preuzimanje
                  </h3>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-3'>
                        Lokacija preuzimanja *
                      </label>
                      <div className='grid gap-3'>
                        {pickupLocations.map((location) => (
                          <div
                            key={location.id}
                            className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                              !location.available
                                ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                                : formData.pickupLocation === location.id
                                ? 'border-brandTeal bg-brandTeal-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => {
                              if (location.available) {
                                setFormData((prev) => ({
                                  ...prev,
                                  pickupLocation: location.id,
                                }));
                              }
                            }}
                          >
                            <div className='flex items-start justify-between'>
                              <div className='flex-1'>
                                <div className='flex items-center gap-3 mb-2'>
                                  <input
                                    type='radio'
                                    name='pickupLocation'
                                    value={location.id}
                                    checked={
                                      formData.pickupLocation === location.id
                                    }
                                    disabled={!location.available}
                                    onChange={handleChange}
                                    className='text-brandTeal focus:ring-brandTeal'
                                  />
                                  <h4 className='font-bold text-gray-900'>
                                    {location.name}
                                    {!location.available && (
                                      <span className='ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full'>
                                        Nedostupno
                                      </span>
                                    )}
                                  </h4>
                                </div>
                                <p className='text-sm text-gray-600 mb-1'>
                                  {location.address}
                                </p>
                                <p className='text-sm text-gray-500 mb-1'>
                                  📞 {location.phone}
                                </p>
                                <p className='text-xs text-gray-500'>
                                  🕐 {location.hours}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Vrijeme preuzimanja *
                      </label>
                      <input
                        type='time'
                        name='pickupTime'
                        required
                        value={formData.pickupTime}
                        onChange={handleChange}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-brandTeal bg-white text-gray-900 font-medium transition-all duration-200'
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    ✨ Dodatne želje
                  </h3>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Dodatne želje i napomene
                    </label>
                    <textarea
                      name='specialRequests'
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brandTeal focus:border-brandTeal bg-white text-gray-900 font-medium placeholder-gray-500 transition-all duration-200 resize-none'
                      placeholder={
                        formData.customCakePreview
                          ? 'Opišite detalje o prilagođenoj torti: okusi, veličina, broj slojeva, specifični zahtjevi za dizajn iz slike...'
                          : 'Opišite dodatne želje: specifični okusi, dizajn, dekoracija, tekstovi na torti...'
                      }
                    />
                  </div>
                </div>

                <div className='flex gap-4'>
                  <button
                    type='button'
                    onClick={() => setCurrentStep(1)}
                    className='flex-1 px-6 py-3 border-2 rounded-xl transition-all duration-300 hover:shadow-lg'
                    style={{
                      borderColor: '#7DCCBD',
                      color: '#7DCCBD',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#7DCCBD';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#7DCCBD';
                    }}
                  >
                    ← Natrag
                  </button>
                  <button
                    type='submit'
                    className='flex-1 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg'
                    style={{ backgroundColor: '#7DCCBD' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#6BB8A8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#7DCCBD';
                    }}
                  >
                    Pregled narudžbe →
                  </button>
                </div>
              </form>
            ) : (
              // Step 3: Order Summary
              <div className='max-w-2xl mx-auto space-y-6'>
                <div className='bg-gradient-to-r from-brandTeal-50 to-brandGold-50 rounded-xl p-6 border border-brandTeal-200'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    📋 Pregled narudžbe
                  </h3>
                  <p className='text-gray-800 font-medium'>
                    Molimo provjerite sve detalje prije potvrde narudžbe.
                  </p>
                </div>

                {/* Product Summary */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                    🍰 Proizvod
                  </h4>
                  <div className='flex items-center gap-4'>
                    {(() => {
                      const selectedProduct = products.find(
                        (p) => p.name === formData.productName
                      );
                      return (
                        <div className='w-16 h-16 rounded-xl overflow-hidden flex-shrink-0'>
                          {formData.customCakePreview ? (
                            <Image
                              src={formData.customCakePreview}
                              alt='Prilagođena torta'
                              width={64}
                              height={64}
                              className='w-full h-full object-cover'
                            />
                          ) : selectedProduct ? (
                            <Image
                              src={selectedProduct.image}
                              alt={selectedProduct.name}
                              width={64}
                              height={64}
                              className='w-full h-full object-cover'
                            />
                          ) : (
                            <div className='w-full h-full bg-gradient-to-br from-brandTeal-100 to-brandGold-100 flex items-center justify-center'>
                              <span className='text-2xl'>🍰</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                    <div>
                      <h5 className='font-bold text-gray-900'>
                        {formData.productName}
                      </h5>
                      {formData.customCakePreview && (
                        <p className='text-xs text-purple-600 font-medium mb-1'>
                          ✨ Prilagođena torta s učitanom slikom
                        </p>
                      )}
                      <p className='text-sm text-gray-700 font-medium'>
                        Veličina:{' '}
                        <span className='text-gray-900 font-bold'>
                          {formData.size}
                        </span>
                      </p>
                      {formData.occasion && (
                        <p className='text-sm text-gray-700 font-medium'>
                          Prigoda:{' '}
                          <span className='text-gray-900 font-bold'>
                            {formData.occasion}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Summary */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                    👤 Kontakt podaci
                  </h4>
                  <div className='grid md:grid-cols-2 gap-4 text-sm'>
                    <div>
                      <span className='text-gray-700 font-medium'>Ime:</span>
                      <p className='font-bold text-gray-900 mt-1'>
                        {formData.name}
                      </p>
                    </div>
                    <div>
                      <span className='text-gray-700 font-medium'>Email:</span>
                      <p className='font-bold text-gray-900 mt-1'>
                        {formData.email}
                      </p>
                    </div>
                    <div>
                      <span className='text-gray-700 font-medium'>
                        Telefon:
                      </span>
                      <p className='font-bold text-gray-900 mt-1'>
                        {formData.phone}
                      </p>
                    </div>
                    <div>
                      <span className='text-gray-700 font-medium'>Datum:</span>
                      <p className='font-bold text-gray-900 mt-1'>
                        {formData.date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pickup Summary */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                    📍 Preuzimanje
                  </h4>
                  {(() => {
                    const selectedLocation = pickupLocations.find(
                      (loc) => loc.id === formData.pickupLocation
                    );
                    return selectedLocation ? (
                      <div className='space-y-3 text-sm'>
                        <div>
                          <span className='text-gray-700 font-medium'>
                            Lokacija:
                          </span>
                          <p className='font-bold text-gray-900 mt-1'>
                            {selectedLocation.name}
                          </p>
                          <p className='text-gray-700 mt-1'>
                            {selectedLocation.address}
                          </p>
                        </div>
                        <div>
                          <span className='text-gray-700 font-medium'>
                            Vrijeme:
                          </span>
                          <p className='font-bold text-gray-900 mt-1'>
                            {formData.date} u {formData.pickupTime}
                          </p>
                        </div>
                        <div>
                          <span className='text-gray-700 font-medium'>
                            Kontakt prodavnice:
                          </span>
                          <p className='font-bold text-gray-900 mt-1'>
                            {selectedLocation.phone}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className='text-red-700 font-bold bg-red-50 p-3 rounded-lg border border-red-200'>
                        Lokacija nije odabrana
                      </p>
                    );
                  })()}
                </div>

                {/* Special Requests */}
                {formData.specialRequests && (
                  <div className='bg-white border border-gray-200 rounded-xl p-6'>
                    <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                      ✨ Dodatne želje
                    </h4>
                    <p className='text-sm text-gray-900 font-medium whitespace-pre-wrap bg-gray-50 p-3 rounded-lg border border-gray-200'>
                      {formData.specialRequests}
                    </p>
                  </div>
                )}

                <div className='flex gap-4'>
                  <button
                    type='button'
                    onClick={() => setCurrentStep(2)}
                    className='flex-1 px-6 py-3 border-2 rounded-xl transition-all duration-300 hover:shadow-lg'
                    style={{
                      borderColor: '#7DCCBD',
                      color: '#7DCCBD',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#7DCCBD';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#7DCCBD';
                    }}
                  >
                    ← Natrag
                  </button>
                  <button
                    onClick={handleSubmit}
                    className='flex-1 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg'
                    style={{ backgroundColor: '#7DCCBD' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#6BB8A8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#7DCCBD';
                    }}
                  >
                    🎂 Potvrdi narudžbu
                  </button>
                </div>

                <p className='text-sm text-gray-700 font-medium text-center bg-gray-50 p-3 rounded-lg border border-gray-200'>
                  Klikom na &quot;Potvrdi narudžbu&quot; slažete se da vas
                  kontaktiramo u vezi narudžbe. Narudžba nije konačna dok ne
                  potvrdimo dostupnost.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
