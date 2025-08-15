'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Sparkles,
  PerspectiveCamera,
} from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import PerformanceMonitor from './PerformanceMonitor';

type CakeProps = {
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

// Subtle sparkles for special decorations only
function SubtleSparkles({ decoration }: { decoration: string }) {
  if (decoration !== 'gold-leaf' && decoration !== 'themed') return null;

  return (
    <Sparkles
      count={15}
      scale={[1.5, 1.5, 1.5]}
      size={1}
      speed={0.2}
      position={[0, 0.5, 0]}
    />
  );
}

// Enhanced cake layer with better materials and textures
function RealisticCakeLayer({
  radius,
  height,
  position,
  insideColor,
  outsideCovering,
  isTop = false,
  decoration = 'simple',
}: {
  radius: number;
  height: number;
  position: [number, number, number];
  insideColor: string;
  outsideCovering: string;
  isTop?: boolean;
  decoration?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Inside cake material - more realistic
  const cakeMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(insideColor),
      roughness: 0.8,
      metalness: 0.0,
      clearcoat: 0.1,
      clearcoatRoughness: 0.9,
    });
  }, [insideColor]);

  // Outside covering material - much more realistic
  const coveringMaterial = useMemo(() => {
    const colors = {
      krema: '#F8F6F0',
      marcipan: '#E8D5A3',
      'chocolate-ganache': '#2D1810',
      fondant: '#FFFFFF',
      buttercream: '#F5EBD0',
    };

    const roughness = {
      krema: 0.3,
      marcipan: 0.7,
      'chocolate-ganache': 0.1,
      fondant: 0.02,
      buttercream: 0.4,
    };

    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(
        colors[outsideCovering as keyof typeof colors] || colors.krema
      ),
      roughness: roughness[outsideCovering as keyof typeof roughness] || 0.3,
      metalness: 0.0,
      clearcoat: outsideCovering === 'fondant' ? 0.9 : 0.1,
      clearcoatRoughness: outsideCovering === 'fondant' ? 0.05 : 0.3,
      sheen: outsideCovering === 'buttercream' ? 0.3 : 0.0,
      sheenColor: new THREE.Color('#FFF8DC'),
    });
  }, [outsideCovering]);

  return (
    <group position={position}>
      {/* Complete cake base - full cylinder filled with flavor */}
      <mesh ref={meshRef} material={cakeMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 64]} />
      </mesh>

      {/* Outer covering layer - slightly larger */}
      <mesh material={coveringMaterial} castShadow receiveShadow>
        <cylinderGeometry
          args={[radius + 0.02, radius + 0.02, height + 0.01, 64]}
        />
      </mesh>

      {/* Cut out a clean triangular slice by removing parts */}
      <mesh
        position={[radius * 0.5, 0, radius * 0.3]}
        rotation={[0, Math.PI * 0.2, 0]}
        material={coveringMaterial}
        castShadow
      >
        <boxGeometry args={[radius * 0.6, height + 0.02, 0.03]} />
      </mesh>

      <mesh
        position={[radius * 0.7, 0, radius * 0.1]}
        rotation={[0, -Math.PI * 0.3, 0]}
        material={coveringMaterial}
        castShadow
      >
        <boxGeometry args={[radius * 0.6, height + 0.02, 0.03]} />
      </mesh>

      {/* Show the inside cake on the cut faces */}
      <mesh
        position={[radius * 0.5, 0, radius * 0.3]}
        rotation={[0, Math.PI * 0.2, 0]}
        material={cakeMaterial}
        castShadow
      >
        <planeGeometry args={[radius * 0.6, height]} />
      </mesh>

      <mesh
        position={[radius * 0.7, 0, radius * 0.1]}
        rotation={[0, -Math.PI * 0.3, 0]}
        material={cakeMaterial}
        castShadow
      >
        <planeGeometry args={[radius * 0.6, height]} />
      </mesh>

      {/* Top decorations */}
      {isTop && (
        <>
          {decoration === 'roses' && (
            <>
              {Array.from({ length: 5 }, (_, i) => (
                <mesh
                  key={i}
                  position={[
                    Math.cos((i / 5) * Math.PI * 2) * (radius * 0.6),
                    height / 2 + 0.05,
                    Math.sin((i / 5) * Math.PI * 2) * (radius * 0.6),
                  ]}
                  castShadow
                >
                  <sphereGeometry args={[0.03, 8, 6]} />
                  <meshPhysicalMaterial color='#FFB6C1' roughness={0.8} />
                </mesh>
              ))}
            </>
          )}

          {decoration === 'berries' && (
            <>
              {Array.from({ length: 4 }, (_, i) => (
                <mesh
                  key={i}
                  position={[
                    Math.cos((i / 4) * Math.PI * 2) * (radius * 0.5),
                    height / 2 + 0.04,
                    Math.sin((i / 4) * Math.PI * 2) * (radius * 0.5),
                  ]}
                  castShadow
                >
                  <sphereGeometry args={[0.025, 8, 6]} />
                  <meshPhysicalMaterial color='#DC143C' roughness={0.3} />
                </mesh>
              ))}
            </>
          )}

          {decoration === 'chocolate-drip' && (
            <>
              {Array.from({ length: 12 }, (_, i) => (
                <mesh
                  key={i}
                  position={[
                    Math.cos((i / 12) * Math.PI * 2) * radius,
                    height / 2 - 0.1,
                    Math.sin((i / 12) * Math.PI * 2) * radius,
                  ]}
                  castShadow
                >
                  <cylinderGeometry args={[0.01, 0.02, 0.2, 8]} />
                  <meshPhysicalMaterial color='#4A2C2A' roughness={0.1} />
                </mesh>
              ))}
            </>
          )}

          {decoration === 'gold-leaf' && (
            <>
              {Array.from({ length: 3 }, (_, i) => (
                <mesh
                  key={i}
                  position={[
                    Math.cos((i / 3) * Math.PI * 2) * (radius * 0.4),
                    height / 2 + 0.03,
                    Math.sin((i / 3) * Math.PI * 2) * (radius * 0.4),
                  ]}
                  rotation={[Math.PI / 2, 0, 0]}
                  castShadow
                >
                  <planeGeometry args={[0.08, 0.08]} />
                  <meshPhysicalMaterial
                    color='#FFD700'
                    metalness={1.0}
                    roughness={0.1}
                  />
                </mesh>
              ))}
            </>
          )}

          {decoration === 'custom-message' && (
            <mesh
              position={[0, height / 2 + 0.02, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              castShadow
            >
              <planeGeometry args={[radius * 1.0, 0.15]} />
              <meshPhysicalMaterial color='#4A2C2A' roughness={0.3} />
            </mesh>
          )}

          {decoration === 'themed' && (
            <mesh position={[0, height / 2 + 0.1, 0]} castShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
              <meshPhysicalMaterial
                color='#FF69B4'
                metalness={0.3}
                roughness={0.2}
              />
            </mesh>
          )}
        </>
      )}
    </group>
  );
}

// Simple cake plate
function CakePlate({ radius }: { radius: number }) {
  return (
    <group>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[radius * 1.3, radius * 1.3, 0.05, 32]} />
        <meshPhysicalMaterial
          color='#F0F0F0'
          roughness={0.1}
          metalness={0.1}
          clearcoat={0.8}
        />
      </mesh>
    </group>
  );
}

function RealisticCakeModel({
  size,
  insideFlavor,
  outsideCovering,
  layers,
  decoration,
}: CakeProps) {
  const groupRef = useRef<THREE.Group>(null);

  const getInsideFlavorColor = (flavor: string) => {
    switch (flavor) {
      case 'chocolate':
        return '#4A2C17';
      case 'vanilla':
        return '#F5E6D3';
      case 'strawberry':
        return '#E8A4C8';
      case 'lemon':
        return '#F0E68C';
      case 'red-velvet':
        return '#722F37';
      case 'carrot':
        return '#D2691E';
      default:
        return '#4A2C17';
    }
  };

  const getSizeMultiplier = (size: string) => {
    switch (size) {
      case 'small':
        return 0.7;
      case 'medium':
        return 1.0;
      case 'large':
        return 1.4;
      default:
        return 1.0;
    }
  };

  const sizeMultiplier = getSizeMultiplier(size);
  const baseRadius = 0.8 * sizeMultiplier;
  const layerHeight = 0.25 * sizeMultiplier;
  const insideColor = getInsideFlavorColor(insideFlavor);

  return (
    <group ref={groupRef}>
      {/* Cake plate */}
      <CakePlate radius={baseRadius} />

      {/* Subtle sparkles only for premium decorations */}
      <SubtleSparkles decoration={decoration} />

      {/* Realistic cake layers with cut view */}
      {Array.from({ length: layers }, (_, index) => {
        const layerRadius = baseRadius - index * 0.08;
        const yPosition = index * layerHeight + layerHeight / 2;
        const isTopLayer = index === layers - 1;

        return (
          <RealisticCakeLayer
            key={index}
            radius={layerRadius}
            height={layerHeight}
            position={[0, yPosition, 0]}
            insideColor={insideColor}
            outsideCovering={outsideCovering}
            isTop={isTopLayer}
            decoration={decoration}
          />
        );
      })}
    </group>
  );
}

export default function EnhancedRealisticCake({
  size,
  insideFlavor,
  outsideCovering,
  layers,
  decoration,
}: CakeProps) {
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([2.5, 2, 2.5]);

  useEffect(() => {
    // Adjust camera based on cake size
    const sizeMultiplier =
      size === 'large' ? 1.3 : size === 'small' ? 0.8 : 1.0;
    setCameraPosition([
      2.5 * sizeMultiplier,
      2 * sizeMultiplier,
      2.5 * sizeMultiplier,
    ]);
  }, [size]);

  return (
    <div className='h-80 w-full rounded-2xl overflow-hidden'>
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
      >
        {/* White background */}
        <color args={['#ffffff']} attach='background' />

        {/* Enhanced lighting for beautiful cake */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-8, 6, -8]} intensity={0.4} color='#FFE4E1' />
        <pointLight position={[8, -4, 8]} intensity={0.3} color='#E1F5FE' />
        <spotLight
          position={[0, 12, 0]}
          intensity={0.6}
          angle={0.3}
          penumbra={0.5}
          castShadow
          color='#FFF8DC'
        />

        {/* Realistic cake model */}
        <RealisticCakeModel
          size={size}
          insideFlavor={insideFlavor}
          outsideCovering={outsideCovering}
          layers={layers}
          decoration={decoration}
        />

        {/* Beautiful white ground with subtle reflection */}
        <mesh
          position={[0, -0.1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshPhysicalMaterial
            color='#F8F8F8'
            roughness={0.1}
            metalness={0.05}
            clearcoat={0.3}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Camera controls - user can rotate */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={6}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          enableDamping
          dampingFactor={0.05}
        />

        {/* Camera */}
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={45}
          near={0.1}
          far={100}
        />

        {/* Subtle post-processing for beauty */}
        <fog attach='fog' args={['#ffffff', 10, 50]} />

        {/* Performance monitoring (development only) */}
        <PerformanceMonitor />
      </Canvas>
    </div>
  );
}
