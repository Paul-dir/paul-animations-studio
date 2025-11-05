import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial
          color="#3ECBDB"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const Particles = () => {
  const points = useRef<THREE.Points>(null);
  
  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3ECBDB"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Torus = () => {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      torusRef.current.rotation.z = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={torusRef} position={[3, 0, -2]}>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <meshStandardMaterial
          color="#4D9EC7"
          metalness={0.7}
          roughness={0.2}
          emissive="#3ECBDB"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

const Box = () => {
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      boxRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={boxRef} position={[-3, 0, -1]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#3ECBDB"
          metalness={0.8}
          roughness={0.1}
          emissive="#3ECBDB"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3ECBDB" />
        <spotLight position={[0, 10, 10]} angle={0.3} intensity={1} color="#4D9EC7" />
        
        <AnimatedSphere />
        <Particles />
        <Torus />
        <Box />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
