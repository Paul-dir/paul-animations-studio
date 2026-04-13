import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 128, 128]} scale={2.2}>
        <MeshDistortMaterial
          color="#3ECBDB"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          emissive="#3ECBDB"
          emissiveIntensity={0.15}
        />
      </Sphere>
    </Float>
  );
};

const FloatingRing = ({ position, rotation, scale, speed }: { position: [number, number, number]; rotation: [number, number, number]; scale: number; speed: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = rotation[0] + state.clock.getElapsedTime() * speed * 0.3;
      ref.current.rotation.y = rotation[1] + state.clock.getElapsedTime() * speed * 0.2;
      ref.current.rotation.z = rotation[2] + state.clock.getElapsedTime() * speed * 0.1;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#3ECBDB"
          metalness={0.9}
          roughness={0.1}
          emissive="#3ECBDB"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const points = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      color.setHSL(0.52 + Math.random() * 0.05, 0.85, 0.55 + Math.random() * 0.2);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2000} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={2000} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
};

const GlowOrb = ({ position, color, size, speed }: { position: [number, number, number]; color: string; size: number; speed: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.5;
      ref.current.position.x = position[0] + Math.cos(state.clock.getElapsedTime() * speed * 0.7) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

const Icosahedron = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref} position={[-4, 1, -3]} scale={0.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#4D9EC7"
          wireframe
          emissive="#3ECBDB"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
};

const OctahedronGem = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.1;
      ref.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime()) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={ref} position={[4, -1, -2]} scale={0.6}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#3ECBDB"
          metalness={0.95}
          roughness={0.05}
          emissive="#3ECBDB"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3ECBDB" />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#4D9EC7" />
        <spotLight position={[0, 10, 10]} angle={0.3} intensity={0.6} color="#3ECBDB" penumbra={1} />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <AnimatedSphere />
        <Particles />
        <Icosahedron />
        <OctahedronGem />
        
        <FloatingRing position={[0, 0, 0]} rotation={[0.5, 0, 0]} scale={3.5} speed={1} />
        <FloatingRing position={[0, 0, 0]} rotation={[0, 0.8, 0.3]} scale={4.2} speed={0.7} />
        <FloatingRing position={[0, 0, 0]} rotation={[0.3, 0.3, 0.6]} scale={5} speed={0.5} />
        
        <GlowOrb position={[-3, 2, -4]} color="#3ECBDB" size={0.15} speed={1.5} />
        <GlowOrb position={[4, -2, -3]} color="#4D9EC7" size={0.1} speed={2} />
        <GlowOrb position={[2, 3, -5]} color="#3ECBDB" size={0.12} speed={1.2} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
