import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

const NailBottle = ({ position = [0, 0, 0], color = '#F8BBD0', scale = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
    }
  });
  
  return (
    <group position={position} scale={scale}>
      {/* Bottle base */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.5, 0.7, 2, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.7} metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Bottle cap */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.6, 32]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Brush handle */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
        <meshStandardMaterial color="#555" metalness={0.5} roughness={0.5} />
      </mesh>
      
      {/* Brush tip */}
      <mesh position={[0, 2.7, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const Sparkle = ({ position = [0, 0, 0], color = '#FFD700', size = 0.3 }) => {
  const sparkleRef = useRef();
  const { clock } = useThree();
  
  useFrame(() => {
    if (sparkleRef.current) {
      sparkleRef.current.rotation.z = clock.getElapsedTime() * 0.5;
      sparkleRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });
  
  return (
    <mesh ref={sparkleRef} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} />
    </mesh>
  );
};

const Scene = () => {
  const [dpr, setDpr] = React.useState(1.5);
  
  return (
    <>
      <color attach="background" args={['#111']} />
      <fog attach="fog" args={['#111', 10, 20]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#FFD700" />
      
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
          <NailBottle position={[-2, 0, -1]} color="#F8BBD0" scale={0.7} />
        </Float>
        
        <Float speed={1} rotationIntensity={0.7} floatIntensity={1}>
          <NailBottle position={[2, -1, 0]} color="#FFD700" scale={0.6} />
        </Float>
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={2}>
          <NailBottle position={[0, 1, -3]} color="#9C27B0" scale={0.8} />
        </Float>
        
        {/* Sparkles */}
        <Float speed={3} rotationIntensity={4} floatIntensity={2}>
          <Sparkle position={[1, 2, -2]} color="#FFD700" size={0.2} />
        </Float>
        
        <Float speed={2.5} rotationIntensity={3} floatIntensity={1.5}>
          <Sparkle position={[-2, -1, -1]} color="#F8BBD0" size={0.15} />
        </Float>
        
        <Float speed={2} rotationIntensity={3.5} floatIntensity={1.8}>
          <Sparkle position={[3, 0, -2]} color="#FFFFFF" size={0.1} />
        </Float>
      </PerformanceMonitor>
    </>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 60 }}>
      <Scene />
    </Canvas>
  );
};

export default ThreeBackground;