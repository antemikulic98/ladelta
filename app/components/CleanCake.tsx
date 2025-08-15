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

// Clean cake layer with better materials for lighting
function CleanCakeLayer({
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
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(insideColor),
      roughness: 0.8,
      metalness: 0.1,
    });
  }, [insideColor]);

  // Outside covering material
  const coveringMaterial = useMemo(() => {
    const colors = {
      krema: '#FFFEF7',
      marcipan: '#F4E4BC',
      'chocolate-ganache': '#8B4513',
      fondant: '#FFFFFF',
      buttercream: '#FFF8DC',
    };

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(
        colors[outsideCovering as keyof typeof colors] || colors.krema
      ),
      roughness: 0.6,
      metalness: 0.1,
    });
  }, [outsideCovering]);

  return (
    <group position={position}>
      {/* Main cake body - complete cylinder */}
      <mesh material={cakeMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 32]} />
      </mesh>

      {/* Thin outer covering */}
      <mesh material={coveringMaterial} castShadow receiveShadow>
        <cylinderGeometry
          args={[radius + 0.01, radius + 0.01, height + 0.005, 32]}
        />
      </mesh>

      {/* Top frosting */}
      <mesh
        position={[0, height / 2 + 0.01, 0]}
        material={coveringMaterial}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[radius + 0.01, radius + 0.01, 0.02, 32]} />
      </mesh>

      {/* Simple decorations on top layer only */}
      {isTop && decoration === 'roses' && (
        <>
          {Array.from({ length: 4 }, (_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 4) * Math.PI * 2) * (radius * 0.5),
                height / 2 + 0.03,
                Math.sin((i / 4) * Math.PI * 2) * (radius * 0.5),
              ]}
              castShadow
            >
              <sphereGeometry args={[0.025, 8, 6]} />
              <meshStandardMaterial color='#FFB6C1' roughness={0.7} />
            </mesh>
          ))}
        </>
      )}

      {isTop && decoration === 'berries' && (
        <>
          {Array.from({ length: 5 }, (_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 5) * Math.PI * 2) * (radius * 0.4),
                height / 2 + 0.025,
                Math.sin((i / 5) * Math.PI * 2) * (radius * 0.4),
              ]}
              castShadow
            >
              <sphereGeometry args={[0.02, 8, 6]} />
              <meshStandardMaterial color='#DC143C' roughness={0.8} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

// Reliable triangular cake slice using cylinder geometry
function TriangularCakeSlice({
  radius,
  height,
  position,
  insideColor,
  outsideCovering,
}: {
  radius: number;
  height: number;
  position: [number, number, number];
  insideColor: string;
  outsideCovering: string;
}) {
  const cakeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(insideColor),
      roughness: 0.8,
      metalness: 0.1,
    });
  }, [insideColor]);

  const coveringMaterial = useMemo(() => {
    const colors = {
      krema: '#FFFEF7',
      marcipan: '#F4E4BC',
      'chocolate-ganache': '#8B4513',
      fondant: '#FFFFFF',
      buttercream: '#FFF8DC',
    };

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(
        colors[outsideCovering as keyof typeof colors] || colors.krema
      ),
      roughness: 0.6,
      metalness: 0.1,
    });
  }, [outsideCovering]);

  return (
    <group position={position}>
      {/* Main filled cake slice using cylinder wedge */}
      <mesh
        material={cakeMaterial}
        castShadow
        receiveShadow
        rotation={[0, Math.PI / 2, 0]}
      >
        <cylinderGeometry
          args={[
            radius * 0.2, // top radius
            radius * 0.3, // bottom radius
            height, // height
            6, // segments
            1, // height segments
            false, // open ended
            0, // theta start
            Math.PI / 3, // theta length (60 degrees slice)
          ]}
        />
      </mesh>

      {/* Thin covering layer using slightly larger wedge */}
      <mesh
        material={coveringMaterial}
        castShadow
        receiveShadow
        rotation={[0, Math.PI / 2, 0]}
        scale={[1.02, 1.01, 1.02]}
      >
        <cylinderGeometry
          args={[
            radius * 0.2, // top radius
            radius * 0.3, // bottom radius
            height, // height
            6, // segments
            1, // height segments
            false, // open ended
            0, // theta start
            Math.PI / 3, // theta length (60 degrees slice)
          ]}
        />
      </mesh>

      {/* Top frosting */}
      <mesh
        position={[0, height / 2 + 0.01, 0]}
        material={coveringMaterial}
        castShadow
        rotation={[0, Math.PI / 2, 0]}
      >
        <cylinderGeometry
          args={[
            radius * 0.2, // top radius
            radius * 0.3, // bottom radius
            0.02, // height
            6, // segments
            1, // height segments
            false, // open ended
            0, // theta start
            Math.PI / 3, // theta length
          ]}
        />
      </mesh>
    </group>
  );
}

// Small plate for cake slice with better materials
function SlicePlate({ radius }: { radius: number }) {
  return (
    <mesh position={[0, -0.05, 0]} receiveShadow>
      <cylinderGeometry args={[radius * 0.6, radius * 0.6, 0.05, 32]} />
      <meshStandardMaterial color='#F8F8F8' roughness={0.3} metalness={0.0} />
    </mesh>
  );
}

// Main cake plate with better materials
function CakePlate({ radius }: { radius: number }) {
  return (
    <mesh position={[0, -0.05, 0]} receiveShadow>
      <cylinderGeometry args={[radius * 1.4, radius * 1.4, 0.05, 32]} />
      <meshStandardMaterial color='#F8F8F8' roughness={0.3} metalness={0.0} />
    </mesh>
  );
}

function CleanCakeModel({
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
        return '#D2691E'; // Rich chocolate sponge color
      case 'vanilla':
        return '#FFFACD'; // Creamy vanilla sponge
      case 'strawberry':
        return '#FFC0CB'; // Sweet strawberry pink
      case 'lemon':
        return '#FFFFE0'; // Light lemon sponge
      case 'red-velvet':
        return '#DC143C'; // Classic red velvet
      case 'carrot':
        return '#DEB887'; // Warm carrot spice
      default:
        return '#D2691E';
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

      {/* Main cake layers */}
      {Array.from({ length: layers }, (_, index) => {
        const layerRadius = baseRadius - index * 0.08;
        const yPosition = index * layerHeight + layerHeight / 2;
        const isTopLayer = index === layers - 1;

        return (
          <CleanCakeLayer
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

      {/* Separate plate for cake slices */}
      <group position={[baseRadius * 2.2, 0, 0]}>
        <SlicePlate radius={baseRadius} />

        {/* Triangular slice pieces on separate plate */}
        {Array.from({ length: layers }, (_, index) => {
          const layerRadius = baseRadius - index * 0.08;
          const yPosition = index * layerHeight + layerHeight / 2;

          return (
            <TriangularCakeSlice
              key={`slice-${index}`}
              radius={layerRadius}
              height={layerHeight}
              position={[0, yPosition, 0]}
              insideColor={insideColor}
              outsideCovering={outsideCovering}
            />
          );
        })}
      </group>
    </group>
  );
}

export default function CleanCake({
  size,
  insideFlavor,
  outsideCovering,
  layers,
  decoration,
}: CakeProps) {
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([3, 2.5, 3]);

  useEffect(() => {
    const sizeMultiplier =
      size === 'large' ? 1.3 : size === 'small' ? 0.8 : 1.0;
    setCameraPosition([
      3 * sizeMultiplier,
      2.5 * sizeMultiplier,
      3 * sizeMultiplier,
    ]);
  }, [size]);

  return (
    <div className='h-80 w-full rounded-2xl overflow-hidden'>
      <Canvas shadows gl={{ antialias: true }} dpr={[1, 2]}>
        <color args={['#ffffff']} attach='background' />

        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.4} />

        {/* Main directional light */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={20}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />

        {/* Fill light from the side */}
        <directionalLight
          position={[-3, 5, 2]}
          intensity={0.5}
          color='#fff9e6'
        />

        {/* Rim light for definition */}
        <pointLight position={[0, 4, -6]} intensity={0.4} color='#e6f3ff' />

        {/* Soft fill light */}
        <pointLight position={[3, 3, 3]} intensity={0.3} />

        <CleanCakeModel
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
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color='#ffffff' roughness={0.9} />
        </mesh>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={8}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          enableDamping
          dampingFactor={0.05}
        />

        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={50}
          near={0.1}
          far={100}
        />
      </Canvas>
    </div>
  );
}
