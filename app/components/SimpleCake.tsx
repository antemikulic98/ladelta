'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

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

// Simple cake layer with realistic slice
function CakeLayer({
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
  // Inside cake material
  const cakeMaterial = useMemo(() => {
    return new THREE.MeshLambertMaterial({
      color: new THREE.Color(insideColor),
    });
  }, [insideColor]);

  // Outside covering material
  const coveringMaterial = useMemo(() => {
    const colors = {
      krema: '#F8F6F0',
      marcipan: '#E8D5A3',
      'chocolate-ganache': '#2D1810',
      fondant: '#FFFFFF',
      buttercream: '#F5EBD0',
    };

    return new THREE.MeshLambertMaterial({
      color: new THREE.Color(
        colors[outsideCovering as keyof typeof colors] || colors.krema
      ),
    });
  }, [outsideCovering]);

  return (
    <group position={position}>
      {/* Main cake - with slice cut out */}
      <mesh material={coveringMaterial} castShadow receiveShadow>
        <cylinderGeometry
          args={[radius, radius, height, 32, 1, false, 0, Math.PI * 1.8]}
        />
      </mesh>

      {/* Inner cake visible */}
      <mesh material={cakeMaterial} castShadow receiveShadow>
        <cylinderGeometry
          args={[
            radius * 0.9,
            radius * 0.9,
            height * 0.98,
            32,
            1,
            false,
            0,
            Math.PI * 1.8,
          ]}
        />
      </mesh>

      {/* Cut faces */}
      <mesh
        position={[radius * 0.6, 0, radius * 0.2]}
        rotation={[0, Math.PI * 0.1, 0]}
        material={cakeMaterial}
        castShadow
      >
        <planeGeometry args={[radius * 0.7, height]} />
      </mesh>

      <mesh
        position={[radius * 0.2, 0, radius * 0.6]}
        rotation={[0, -Math.PI * 0.4, 0]}
        material={cakeMaterial}
        castShadow
      >
        <planeGeometry args={[radius * 0.7, height]} />
      </mesh>

      {/* Simple decorations */}
      {isTop && decoration === 'roses' && (
        <>
          {Array.from({ length: 3 }, (_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 3) * Math.PI * 2) * (radius * 0.4),
                height / 2 + 0.03,
                Math.sin((i / 3) * Math.PI * 2) * (radius * 0.4),
              ]}
              castShadow
            >
              <sphereGeometry args={[0.025, 8, 6]} />
              <meshLambertMaterial color='#FFB6C1' />
            </mesh>
          ))}
        </>
      )}

      {isTop && decoration === 'berries' && (
        <>
          {Array.from({ length: 4 }, (_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 4) * Math.PI * 2) * (radius * 0.3),
                height / 2 + 0.02,
                Math.sin((i / 4) * Math.PI * 2) * (radius * 0.3),
              ]}
              castShadow
            >
              <sphereGeometry args={[0.02, 8, 6]} />
              <meshLambertMaterial color='#DC143C' />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

// Simple cake plate
function CakePlate({ radius }: { radius: number }) {
  return (
    <mesh position={[0, -0.05, 0]} receiveShadow>
      <cylinderGeometry args={[radius * 1.3, radius * 1.3, 0.05, 32]} />
      <meshLambertMaterial color='#F0F0F0' />
    </mesh>
  );
}

function SimpleCakeModel({
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
      <CakePlate radius={baseRadius} />

      {Array.from({ length: layers }, (_, index) => {
        const layerRadius = baseRadius - index * 0.08;
        const yPosition = index * layerHeight + layerHeight / 2;
        const isTopLayer = index === layers - 1;

        return (
          <CakeLayer
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

export default function SimpleCake({
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
      <Canvas shadows gl={{ antialias: true }} dpr={[1, 2]}>
        <color args={['#ffffff']} attach='background' />

        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.0}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.3} />

        <SimpleCakeModel
          size={size}
          insideFlavor={insideFlavor}
          outsideCovering={outsideCovering}
          layers={layers}
          decoration={decoration}
        />

        <mesh
          position={[0, -0.1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <meshLambertMaterial color='#ffffff' />
        </mesh>

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

        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={45}
          near={0.1}
          far={100}
        />
      </Canvas>
    </div>
  );
}
