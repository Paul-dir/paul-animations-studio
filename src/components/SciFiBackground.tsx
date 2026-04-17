import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Icosahedron, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/contexts/ThemeContext";

// Theme-aware colors
const themePalette = {
  cyan: { primary: "#3ECBDB", secondary: "#5AA9FF", accent: "#8B5CF6" },
  light: { primary: "#06B6D4", secondary: "#6366F1", accent: "#EC4899" },
  golden: { primary: "#E8A020", secondary: "#FF6B35", accent: "#FFD700" },
  purple: { primary: "#9B59E0", secondary: "#EC4899", accent: "#A855F7" },
} as const;

// Floating particle field
const Particles = ({ color, opacity = 0.7, size = 0.04 }: { color: string; opacity?: number; size?: number }) => {
  const ref = useRef<THREE.Points>(null);
  const count = 1500;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 25;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 25;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.02;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
};

// Wireframe icosahedron
const WireIcosahedron = ({ color, position, opacity = 0.5 }: { color: string; position: [number, number, number]; opacity?: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <Icosahedron ref={ref} args={[1.4, 1]} position={position}>
        <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
      </Icosahedron>
    </Float>
  );
};

// Wireframe torus
const WireTorus = ({ color, position, opacity = 0.45 }: { color: string; position: [number, number, number]; opacity?: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.25;
    ref.current.rotation.z = state.clock.elapsedTime * 0.18;
  });

  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={2}>
      <Torus ref={ref} args={[1.6, 0.4, 16, 50]} position={position}>
        <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
      </Torus>
    </Float>
  );
};

// Glowing crystal orb
const GlowOrb = ({ color, position, intensity = 1 }: { color: string; position: [number, number, number]; intensity?: number }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2.5}>
      <Sphere args={[0.8, 32, 32]} position={position}>
        <meshBasicMaterial color={color} transparent opacity={0.15 * intensity} />
      </Sphere>
      <Sphere args={[0.4, 24, 24]} position={position}>
        <meshBasicMaterial color={color} transparent opacity={0.4 * intensity} />
      </Sphere>
    </Float>
  );
};

// Neon grid floor
const Grid = ({ color, opacity = 0.18 }: { color: string; opacity?: number }) => {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.Material & { opacity?: number };
    if (mat.opacity !== undefined) {
      mat.opacity = opacity + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <gridHelper
      ref={ref}
      args={[40, 40, color, color]}
      position={[0, -6, 0]}
      rotation={[0, 0, 0]}
    >
      <lineBasicMaterial attach="material" color={color} transparent opacity={opacity} />
    </gridHelper>
  );
};

// Scene composition
const Scene = () => {
  const { theme } = useTheme();
  const palette = themePalette[theme as keyof typeof themePalette] || themePalette.cyan;
  const isLight = theme === "light";

  return (
    <>
      <ambientLight intensity={isLight ? 0.8 : 0.5} />
      <Particles color={palette.primary} opacity={isLight ? 0.9 : 0.7} size={isLight ? 0.05 : 0.04} />
      <WireIcosahedron color={palette.primary} position={[-4, 2, -2]} opacity={isLight ? 0.75 : 0.5} />
      <WireIcosahedron color={palette.accent} position={[5, -1, -3]} opacity={isLight ? 0.75 : 0.5} />
      <WireTorus color={palette.secondary} position={[3, 3, -4]} opacity={isLight ? 0.7 : 0.45} />
      <WireTorus color={palette.primary} position={[-5, -2, -1]} opacity={isLight ? 0.7 : 0.45} />
      <GlowOrb color={palette.accent} position={[0, 0, -2]} intensity={isLight ? 1.6 : 1} />
      <GlowOrb color={palette.secondary} position={[-2, 4, -5]} intensity={isLight ? 1.6 : 1} />
      <GlowOrb color={palette.primary} position={[4, -3, -3]} intensity={isLight ? 1.6 : 1} />
      <Grid color={palette.primary} opacity={isLight ? 0.35 : 0.18} />
    </>
  );
};

const SciFiBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SciFiBackground;
