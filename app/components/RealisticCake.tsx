'use client';

import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
} from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

type CakeProps = {
  size: 'small' | 'medium' | 'large';
  flavor: 'chocolate' | 'vanilla' | 'strawberry' | 'lemon';
  layers: 1 | 2 | 3;
  decoration: 'simple' | 'elegant' | 'fancy' | 'premium';
};

function CakeLayer({
  radius,
  height,
  position,
  color,
  isTop = false,
  decoration = 'simple',
}: {
  radius: number;
  height: number;
  position: [number, number, number];
  color: string;
  isTop?: boolean;
  decoration?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create realistic cake material
  const cakeMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      roughness: 0.8,
      metalness: 0.1,
      clearcoat: 0.3,
      clearcoatRoughness: 0.5,
    });
  }, [color]);

  // Create frosting material
  const frostingMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FFFEF7'),
      roughness: 0.2,
      metalness: 0.05,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      transmission: 0.1,
    });
  }, []);

  return (
    <group position={position}>
      {/* Main cake layer */}
      <mesh ref={meshRef} material={cakeMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 32]} />
      </mesh>

      {/* Frosting on top */}
      <mesh
        position={[0, height / 2 + 0.02, 0]}
        material={frostingMaterial}
        castShadow
      >
        <cylinderGeometry args={[radius - 0.02, radius - 0.02, 0.05, 32]} />
      </mesh>

      {/* Side frosting decoration */}
      <mesh position={[0, 0, 0]} material={frostingMaterial} castShadow>
        <cylinderGeometry
          args={[radius + 0.01, radius + 0.01, height * 0.3, 32]}
        />
      </mesh>

      {/* Top decorations */}
      {isTop && decoration !== 'simple' && (
        <>
          {/* Elegant decoration - rosettes */}
          {decoration === 'elegant' && (
            <>
              {Array.from({ length: 8 }, (_, i) => (
                <Float
                  key={i}
                  speed={2}
                  rotationIntensity={0.1}
                  floatIntensity={0.1}
                >
                  <mesh
                    position={[
                      Math.cos((i / 8) * Math.PI * 2) * (radius * 0.7),
                      height / 2 + 0.1,
                      Math.sin((i / 8) * Math.PI * 2) * (radius * 0.7),
                    ]}
                    material={frostingMaterial}
                    castShadow
                  >
                    <sphereGeometry args={[0.03, 8, 6]} />
                  </mesh>
                </Float>
              ))}
            </>
          )}

          {/* Fancy decoration - candles */}
          {decoration === 'fancy' && (
            <>
              <mesh position={[0, height / 2 + 0.15, 0]} castShadow>
                <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
                <meshPhysicalMaterial
                  color='#FFD700'
                  metalness={0.3}
                  roughness={0.1}
                />
              </mesh>
              <mesh position={[0, height / 2 + 0.32, 0]}>
                <sphereGeometry args={[0.02, 8, 6]} />
                <meshBasicMaterial color='#FF4500' />
              </mesh>
            </>
          )}

          {/* Premium decoration - multiple candles and flowers */}
          {decoration === 'premium' && (
            <>
              {Array.from({ length: 5 }, (_, i) => (
                <group key={i}>
                  <mesh
                    position={[
                      Math.cos((i / 5) * Math.PI * 2) * (radius * 0.5),
                      height / 2 + 0.15,
                      Math.sin((i / 5) * Math.PI * 2) * (radius * 0.5),
                    ]}
                    castShadow
                  >
                    <cylinderGeometry args={[0.008, 0.008, 0.25, 8]} />
                    <meshPhysicalMaterial
                      color='#FFD700'
                      metalness={0.3}
                      roughness={0.1}
                    />
                  </mesh>
                  <mesh
                    position={[
                      Math.cos((i / 5) * Math.PI * 2) * (radius * 0.5),
                      height / 2 + 0.28,
                      Math.sin((i / 5) * Math.PI * 2) * (radius * 0.5),
                    ]}
                  >
                    <sphereGeometry args={[0.015, 8, 6]} />
                    <meshBasicMaterial color='#FF4500' />
                  </mesh>
                </group>
              ))}

              {/* Central decoration */}
              <Float speed={1} rotationIntensity={0.2} floatIntensity={0.05}>
                <mesh position={[0, height / 2 + 0.08, 0]} castShadow>
                  <torusGeometry args={[radius * 0.3, 0.02, 8, 16]} />
                  <meshPhysicalMaterial
                    color='#FF69B4'
                    metalness={0.1}
                    roughness={0.3}
                  />
                </mesh>
              </Float>
            </>
          )}
        </>
      )}
    </group>
  );
}

function CakePlate({ radius }: { radius: number }) {
  const plateMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E8E8E8'),
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
  }, []);

  return (
    <mesh position={[0, -0.05, 0]} material={plateMaterial} receiveShadow>
      <cylinderGeometry args={[radius * 1.3, radius * 1.3, 0.1, 32]} />
    </mesh>
  );
}

function RealisticCakeModel({ size, flavor, layers, decoration }: CakeProps) {
  const getFlavorColor = (flavor: string) => {
    switch (flavor) {
      case 'chocolate':
        return '#4A2C2A';
      case 'vanilla':
        return '#FFF8DC';
      case 'strawberry':
        return '#FFB6C1';
      case 'lemon':
        return '#FFFACD';
      default:
        return '#4A2C2A';
    }
  };

  const getSizeMultiplier = (size: string) => {
    switch (size) {
      case 'small':
        return 0.8;
      case 'medium':
        return 1.0;
      case 'large':
        return 1.3;
      default:
        return 1.0;
    }
  };

  const sizeMultiplier = getSizeMultiplier(size);
  const baseRadius = 0.8 * sizeMultiplier;
  const layerHeight = 0.3 * sizeMultiplier;
  const color = getFlavorColor(flavor);

  return (
    <group>
      {/* Cake Plate */}
      <CakePlate radius={baseRadius} />

      {/* Cake Layers */}
      {Array.from({ length: layers }, (_, index) => {
        const layerRadius = baseRadius - index * 0.1;
        const yPosition = index * layerHeight + layerHeight / 2;
        const isTopLayer = index === layers - 1;

        return (
          <Float
            key={index}
            speed={0.5}
            rotationIntensity={0.05}
            floatIntensity={0.02}
          >
            <CakeLayer
              radius={layerRadius}
              height={layerHeight}
              position={[0, yPosition, 0]}
              color={color}
              isTop={isTopLayer}
              decoration={decoration}
            />
          </Float>
        );
      })}
    </group>
  );
}

export default function RealisticCake({
  size,
  flavor,
  layers,
  decoration,
}: CakeProps) {
  return (
    <div className='h-80 w-full'>
      <Canvas
        shadows
        camera={{ position: [2, 2, 2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting setup for realistic rendering */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={0.3} />

        {/* Environment for reflections */}
        <Environment preset='studio' />

        {/* Realistic cake model */}
        <RealisticCakeModel
          size={size}
          flavor={flavor}
          layers={layers}
          decoration={decoration}
        />

        {/* Ground shadows */}
        <ContactShadows
          position={[0, -0.1, 0]}
          opacity={0.4}
          scale={5}
          blur={2}
          far={1}
        />

        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
