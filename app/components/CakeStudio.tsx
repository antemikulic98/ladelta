'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, SSAO, N8AO } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Type definitions
type CakeOptions = {
  size: 'small' | 'medium' | 'large';
  layers: 1 | 2 | 3;
  flavor: 'chocolate' | 'vanilla' | 'strawberry' | 'lemon' | 'carrot';
  covering: 'cream' | 'ganache' | 'fondant' | 'marzipan';
  decoration: 'none' | 'berries' | 'flowers' | 'sprinkles';
};

// Bright, vibrant material colors that look good with minimal lighting
const CAKE_MATERIALS = {
  sponge: {
    chocolate: {
      color: '#D2691E',
      roughness: 0.85,
      metalness: 0.0,
      clearcoat: 0.1,
    },
    vanilla: {
      color: '#FFFFF0',
      roughness: 0.7,
      metalness: 0.0,
      clearcoat: 0.1,
    },
    strawberry: {
      color: '#FFB6C1',
      roughness: 0.8,
      metalness: 0.0,
      clearcoat: 0.08,
    },
    lemon: {
      color: '#FFFFE0',
      roughness: 0.78,
      metalness: 0.0,
      clearcoat: 0.1,
    },
    carrot: {
      color: '#DEB887',
      roughness: 0.82,
      metalness: 0.0,
      clearcoat: 0.05,
    },
  },
  covering: {
    cream: {
      color: '#FFFFFE',
      roughness: 0.05,
      metalness: 0.0,
      clearcoat: 0.98,
      sheen: 0.7,
    },
    ganache: {
      color: '#8B4513',
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 0.9,
      sheen: 0.1,
    },
    fondant: {
      color: '#FFFFFF',
      roughness: 0.02,
      metalness: 0.0,
      clearcoat: 0.95,
      sheen: 0.0,
    },
    marzipan: {
      color: '#F4E4BC',
      roughness: 0.25,
      metalness: 0.0,
      clearcoat: 0.4,
      sheen: 0.2,
    },
  },
} as const;

// Custom Select Component
interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full p-4 border-2 border-gray-200 rounded-xl bg-white hover:border-gray-300 focus:border-gray-400 transition-all flex items-center justify-between text-left'
        style={{
          borderColor: isOpen ? '#7DCCBD' : undefined,
        }}
      >
        <span className='text-gray-900 font-medium'>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
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
          <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden'>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  value === option.value
                    ? 'text-white font-medium'
                    : 'text-gray-900'
                }`}
                style={{
                  backgroundColor:
                    value === option.value ? '#7DCCBD' : undefined,
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Beautiful wooden table - bigger and higher
function WoodenTable() {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Table top - premium oak wood finish */}
      <mesh receiveShadow>
        <boxGeometry args={[5.5, 0.08, 4]} />
        <meshPhysicalMaterial
          color='#8B4513'
          roughness={0.4}
          metalness={0.0}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          sheen={0.4}
          sheenRoughness={0.3}
          sheenColor='#D2691E'
        />
      </mesh>

      {/* Table legs - rich walnut wood */}
      {[
        [-2.5, -0.7, 1.7],
        [2.5, -0.7, 1.7],
        [-2.5, -0.7, -1.7],
        [2.5, -0.7, -1.7],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.05, 0.05, 1.1, 16]} />
          <meshPhysicalMaterial
            color='#654321'
            roughness={0.5}
            metalness={0.0}
            clearcoat={0.4}
            clearcoatRoughness={0.15}
            sheen={0.3}
            sheenColor='#A0522D'
          />
        </mesh>
      ))}
    </group>
  );
}

// Premium realistic cake with advanced materials
function RealisticCake({ options }: { options: CakeOptions }) {
  const spongeProps = CAKE_MATERIALS.sponge[options.flavor];
  const coveringProps = CAKE_MATERIALS.covering[options.covering];

  const sizeScale =
    options.size === 'small' ? 0.7 : options.size === 'large' ? 1.3 : 1.0;

  return (
    <group position={[0, -0.05, 0]}>
      {/* Elegant cake plate */}
      <mesh position={[0, -0.05, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.3 * sizeScale, 1.3 * sizeScale, 0.06, 64]} />
        <meshPhysicalMaterial
          color='#FEFEFE'
          roughness={0.1}
          metalness={0.0}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Cake layers with ultra-realistic materials */}
      {Array.from({ length: options.layers }, (_, i) => {
        const y = i * 0.28 + 0.14;
        const radius = (0.85 - i * 0.08) * sizeScale;

        return (
          <group key={i} position={[0, y, 0]}>
            {/* Cake sponge - visible inner part */}
            <mesh castShadow receiveShadow>
              <cylinderGeometry
                args={[radius * 0.94, radius * 0.94, 0.24, 64]}
              />
              <meshPhysicalMaterial
                color={spongeProps.color}
                roughness={spongeProps.roughness}
                metalness={spongeProps.metalness}
                clearcoat={spongeProps.clearcoat}
              />
            </mesh>

            {/* Outer covering with premium finish */}
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[radius, radius, 0.26, 64]} />
              <meshPhysicalMaterial
                color={coveringProps.color}
                roughness={coveringProps.roughness}
                metalness={coveringProps.metalness}
                clearcoat={coveringProps.clearcoat}
                sheen={coveringProps.sheen}
                sheenRoughness={0.3}
              />
            </mesh>

            {/* Removed torus geometry that was creating the circular arches */}

            {/* Top layer frosting */}
            <mesh castShadow position={[0, 0.13, 0]}>
              <cylinderGeometry args={[radius, radius, 0.02, 64]} />
              <meshPhysicalMaterial
                color={coveringProps.color}
                roughness={coveringProps.roughness * 0.8}
                metalness={coveringProps.metalness}
                clearcoat={coveringProps.clearcoat}
                sheen={coveringProps.sheen}
              />
            </mesh>

            {/* Decorations for top layer */}
            {i === options.layers - 1 && options.decoration === 'berries' && (
              <group position={[0, 0.18, 0]}>
                {Array.from({ length: 8 }, (_, j) => {
                  const angle = (j / 8) * Math.PI * 2;
                  const decorRadius = radius * 0.6;
                  return (
                    <mesh
                      key={j}
                      position={[
                        Math.cos(angle) * decorRadius,
                        0.02,
                        Math.sin(angle) * decorRadius,
                      ]}
                      castShadow
                    >
                      <sphereGeometry args={[0.03, 16, 12]} />
                      <meshPhysicalMaterial
                        color='#C41E3A'
                        roughness={0.6}
                        clearcoat={0.8}
                        sheen={0.4}
                      />
                    </mesh>
                  );
                })}
              </group>
            )}

            {i === options.layers - 1 && options.decoration === 'flowers' && (
              <group position={[0, 0.18, 0]}>
                {Array.from({ length: 5 }, (_, j) => {
                  const angle = (j / 5) * Math.PI * 2;
                  const decorRadius = radius * 0.5;
                  return (
                    <mesh
                      key={j}
                      position={[
                        Math.cos(angle) * decorRadius,
                        0.02,
                        Math.sin(angle) * decorRadius,
                      ]}
                      castShadow
                    >
                      <sphereGeometry args={[0.04, 16, 12]} />
                      <meshPhysicalMaterial
                        color='#FFB6C1'
                        roughness={0.7}
                        clearcoat={0.6}
                        sheen={0.5}
                      />
                    </mesh>
                  );
                })}
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function CakeStudio() {
  const [options, setOptions] = useState<CakeOptions>({
    size: 'medium',
    layers: 2,
    flavor: 'vanilla',
    covering: 'cream',
    decoration: 'none',
  });

  console.log('Available Three.js capabilities:', {
    geometries: [
      'CylinderGeometry',
      'SphereGeometry',
      'BoxGeometry',
      'PlaneGeometry',
    ],
    materials: [
      'MeshStandardMaterial',
      'MeshPhysicalMaterial',
      'MeshLambertMaterial',
    ],
    lights: ['DirectionalLight', 'PointLight', 'AmbientLight', 'SpotLight'],
    drei_helpers: [
      'OrbitControls',
      'Environment',
      'ContactShadows',
      'Float',
      'Text',
    ],
    postprocessing: ['Bloom', 'SSAO', 'DepthOfField', 'Noise', 'Vignette'],
  });

  return (
    <section className='w-full px-6 py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-playfair font-bold text-gray-900 mb-4'>
            Sastavi svoju savršenu tortu
          </h2>
          <p className='text-lg text-gray-600'>
            Kreiraj tortu iz snova s našim 3D vizuelizatorom
          </p>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-5 gap-8'>
          {/* Modern Controls Panel */}
          <div className='xl:col-span-2 space-y-8'>
            <div className='bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-200'>
              <h3
                className='text-2xl font-bold mb-6'
                style={{ color: '#7DCCBD' }}
              >
                Opcije torte
              </h3>

              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-3'>
                    Veličina
                  </label>
                  <div className='grid grid-cols-3 gap-3'>
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <button
                        key={size}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                          options.size === size
                            ? 'text-white shadow-lg scale-105'
                            : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900'
                        }`}
                        style={
                          options.size === size
                            ? { backgroundColor: '#7DCCBD' }
                            : {}
                        }
                        onClick={() =>
                          setOptions((prev) => ({ ...prev, size }))
                        }
                      >
                        {size === 'small'
                          ? 'Mala'
                          : size === 'medium'
                          ? 'Srednja'
                          : 'Velika'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-3'>
                    Broj slojeva
                  </label>
                  <div className='grid grid-cols-3 gap-3'>
                    {([1, 2, 3] as const).map((layers) => (
                      <button
                        key={layers}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                          options.layers === layers
                            ? 'text-white shadow-lg scale-105'
                            : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900'
                        }`}
                        style={
                          options.layers === layers
                            ? { backgroundColor: '#7DCCBD' }
                            : {}
                        }
                        onClick={() =>
                          setOptions((prev) => ({ ...prev, layers }))
                        }
                      >
                        {layers}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-3'>
                    Okus biskvita
                  </label>
                  <CustomSelect
                    value={options.flavor}
                    onChange={(value) =>
                      setOptions((prev) => ({ ...prev, flavor: value as any }))
                    }
                    options={[
                      { value: 'chocolate', label: 'Čokolada' },
                      { value: 'vanilla', label: 'Vanilija' },
                      { value: 'strawberry', label: 'Jagoda' },
                      { value: 'lemon', label: 'Limun' },
                      { value: 'carrot', label: 'Mrkva' },
                    ]}
                    placeholder='Odaberite okus'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-3'>
                    Obloga
                  </label>
                  <CustomSelect
                    value={options.covering}
                    onChange={(value) =>
                      setOptions((prev) => ({
                        ...prev,
                        covering: value as any,
                      }))
                    }
                    options={[
                      { value: 'cream', label: 'Krema' },
                      { value: 'ganache', label: 'Ganache' },
                      { value: 'fondant', label: 'Fondant' },
                      { value: 'marzipan', label: 'Marcipan' },
                    ]}
                    placeholder='Odaberite oblogu'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-3'>
                    Ukrasi
                  </label>
                  <CustomSelect
                    value={options.decoration}
                    onChange={(value) =>
                      setOptions((prev) => ({
                        ...prev,
                        decoration: value as any,
                      }))
                    }
                    options={[
                      { value: 'none', label: 'Bez ukrasa' },
                      { value: 'berries', label: 'Bobičasto voće' },
                      { value: 'flowers', label: 'Cvijeće' },
                      { value: 'sprinkles', label: 'Šareni mrvice' },
                    ]}
                    placeholder='Odaberite ukrase'
                  />
                </div>
              </div>

              {/* Order Button - Below Options */}
              <div className='mt-8 text-center'>
                <button
                  className='w-full py-4 px-8 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                  style={{ backgroundColor: '#7DCCBD' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6BB8A8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#7DCCBD';
                  }}
                  onClick={() => {
                    // Add order functionality here
                    console.log('Ordering cake with options:', options);
                  }}
                >
                  <span className='mr-3'>🛒</span>
                  Naruči svoju tortu
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced 3D Preview */}
          <div className='xl:col-span-3'>
            <div className='bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-200 overflow-hidden h-[600px]'>
              <Canvas
                shadows
                camera={{ position: [3, 2, 3], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
              >
                {/* Beautiful gradient background */}
                <color args={['#FFF8F0']} attach='background' />

                {/* Enhanced lighting for whiter cream visibility */}
                <ambientLight intensity={0.4} />
                <directionalLight
                  position={[8, 12, 8]}
                  intensity={0.8}
                  castShadow
                  shadow-mapSize={[2048, 2048]}
                  shadow-camera-far={20}
                  shadow-camera-left={-8}
                  shadow-camera-right={8}
                  shadow-camera-top={8}
                  shadow-camera-bottom={-8}
                />
                <pointLight
                  position={[-6, 6, 2]}
                  intensity={0.4}
                  color='#FFFFFF'
                />

                {/* No environment to avoid any arch artifacts */}

                {/* Table and cake scene */}
                <WoodenTable />
                <RealisticCake options={options} />

                {/* Enhanced shadows */}
                <ContactShadows
                  position={[0, -0.15, 0]}
                  opacity={0.4}
                  scale={15}
                  blur={2.5}
                  far={6}
                  color='#8B4513'
                />

                {/* Improved camera controls with more zoom out */}
                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={2}
                  maxDistance={12}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 8}
                  enableDamping
                  dampingFactor={0.05}
                />

                {/* Post-processing for premium look */}
                <EffectComposer>
                  {/* N8AO is a more modern and stable alternative to SSAO */}
                  <N8AO
                    aoRadius={0.5}
                    intensity={4}
                    aoSamples={6}
                    denoiseSamples={4}
                    denoiseRadius={12}
                    distanceFalloff={1}
                    screenSpaceRadius
                  />
                  <Bloom
                    intensity={0.3}
                    luminanceThreshold={0.9}
                    luminanceSmoothing={0.3}
                  />
                </EffectComposer>
              </Canvas>
            </div>

            <div className='mt-6 text-center'>
              <p className='text-sm text-gray-700'>
                Rotiraj, zumiraj i razgledaj svoju tortu iz svih uglova
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
