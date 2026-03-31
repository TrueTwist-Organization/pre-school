import { Suspense, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette
} from '@react-three/postprocessing';
import {
  Cloud,
  Float,
  Sparkles,
  Stars,
  Text3D
} from '@react-three/drei';
import { Group } from 'three';
import font from 'three/examples/fonts/helvetiker_regular.typeface.json';

const textFont = font as unknown as string;

export default function Hero3D() {
  const pointer = useMouseTilt();

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <CanvasScene pointer={pointer} />
    </div>
  );
}

function useMouseTilt() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      setPointer({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return pointer;
}

function CanvasScene({ pointer }: { pointer: { x: number; y: number } }) {
  return (
    <Suspense fallback={null}>
      <Scene pointer={pointer} />
    </Suspense>
  );
}

function Scene({ pointer }: { pointer: { x: number; y: number } }) {
  return (
    <div className="absolute inset-0">
      <CanvasWrapper>
        <ParallaxRig pointer={pointer}>
          <ambientLight intensity={1.25} />
          <directionalLight position={[4, 8, 6]} intensity={2.8} color="#fff8e8" />
          <directionalLight position={[-8, 3, 2]} intensity={1.5} color="#8de1dc" />
          <pointLight position={[0, 2, 8]} intensity={22} color="#9B5DE5" distance={22} />

          <RainbowArch />
          <ABCBlocks />
          <Sun />
          <BalloonCluster />
          <Butterflies />
          <Birds />
          <TeddyOnCloud />
          <NanhiDuniyaText />
          <StarsField />
        </ParallaxRig>

        <EffectComposer multisampling={4}>
          <Bloom intensity={1.35} luminanceThreshold={0.2} luminanceSmoothing={0.75} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.08} darkness={0.8} />
        </EffectComposer>
      </CanvasWrapper>
    </div>
  );
}

function ParallaxRig({
  children,
  pointer
}: {
  children: ReactNode;
  pointer: { x: number; y: number };
}) {
  const rig = useRef<Group>(null);

  useFrame((state) => {
    if (!rig.current) return;

    rig.current.rotation.y = pointer.x * 0.28;
    rig.current.rotation.x = -pointer.y * 0.12;
    rig.current.position.x = pointer.x * 0.55;
    rig.current.position.y = pointer.y * 0.32 + Math.sin(state.clock.elapsedTime * 0.55) * 0.06;
  });

  return <group ref={rig}>{children}</group>;
}

function CanvasWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.25, 13], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {children}
      </Canvas>
    </div>
  );
}

function RainbowArch() {
  const colors = ['#FF6B6B', '#FFEEAD', '#4ECDC4', '#45B7D1', '#96CEB4', '#9B5DE5'];
  return (
    <group position={[0, 0.95, -6.6]} rotation={[0.02, 0, 0]}>
      {colors.map((color, index) => (
        <mesh key={color} position={[0, index * 0.01, 0]}>
          <torusGeometry args={[4.6 - index * 0.35, 0.22, 18, 128, Math.PI]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function ABCBlocks() {
  const blocks = useMemo(
    () => [
      { letter: 'A', color: '#FF6B6B', position: [-4.4, -1.25, 1.15] as const },
      { letter: 'B', color: '#4ECDC4', position: [-2.85, -1.1, 1.55] as const },
      { letter: 'C', color: '#9B5DE5', position: [-1.22, -1.28, 1.2] as const }
    ],
    []
  );

  return (
    <group position={[-0.4, -0.6, 0]} rotation={[-0.08, 0.2, -0.04]}>
      {blocks.map((block, index) => (
        <FloatingBlock key={block.letter} {...block} wobble={index * 0.5} />
      ))}
    </group>
  );
}

function FloatingBlock({
  letter,
  color,
  position,
  wobble
}: {
  letter: string;
  color: string;
  position: readonly [number, number, number];
  wobble: number;
}) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + wobble;
    ref.current.rotation.y = Math.sin(t * 0.7) * 0.25 + 0.2;
    ref.current.rotation.x = Math.sin(t * 0.8) * 0.1;
    ref.current.position.y = position[1] + Math.sin(t * 1.35) * 0.12;
  });

  return (
    <group ref={ref} position={position as [number, number, number]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color={color} roughness={0.28} metalness={0.18} />
      </mesh>
      <Text3D
        font={textFont}
        size={0.52}
        height={0.18}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.02}
        bevelSegments={4}
        position={[-0.13, -0.05, 0.9]}
      >
        {letter}
        <meshStandardMaterial color="#fffaf2" emissive="#ffffff" emissiveIntensity={0.55} />
      </Text3D>
      <mesh position={[0.25, 0.32, 0.92]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[-0.23, 0.32, 0.92]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </group>
  );
}

function Sun() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.45) * 0.05;
    ref.current.position.y = 3.25 + Math.sin(state.clock.elapsedTime * 0.9) * 0.12;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.9}>
      <group ref={ref} position={[4.4, 3.2, -0.75]}>
        <mesh>
          <sphereGeometry args={[1.35, 32, 32]} />
          <meshStandardMaterial color="#FFEEAD" emissive="#ffd76b" emissiveIntensity={0.42} />
        </mesh>
        <mesh position={[-0.44, 0.27, 1.05]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#2C2C2C" />
        </mesh>
        <mesh position={[0.44, 0.27, 1.05]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#2C2C2C" />
        </mesh>
        <mesh position={[0, -0.1, 1.1]} rotation={[Math.PI, 0, 0]}>
          <torusGeometry args={[0.44, 0.08, 14, 48, Math.PI]} />
          <meshStandardMaterial color="#2C2C2C" />
        </mesh>
        {Array.from({ length: 10 }).map((_, index) => (
          <mesh
            key={index}
            position={[
              Math.cos((index / 10) * Math.PI * 2) * 1.9,
              Math.sin((index / 10) * Math.PI * 2) * 1.9,
              0
            ]}
            rotation={[0, 0, (index / 10) * Math.PI * 2]}
          >
            <cylinderGeometry args={[0.09, 0.12, 0.7, 10]} />
            <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.4} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function BalloonCluster() {
  const balloons = useMemo(
    () => [
      { color: '#FF6B6B', position: [-5.5, 1.35, -0.2] as const, phase: 0 },
      { color: '#4ECDC4', position: [-4.15, 2.1, -0.1] as const, phase: 0.4 },
      { color: '#45B7D1', position: [-3.1, 0.95, 0] as const, phase: 0.8 },
      { color: '#96CEB4', position: [-1.9, 2.25, -0.15] as const, phase: 1.2 },
      { color: '#9B5DE5', position: [-0.8, 1.2, -0.2] as const, phase: 1.55 },
      { color: '#FFEEAD', position: [-6.6, 2.6, -0.35] as const, phase: 1.95 }
    ],
    []
  );

  return (
    <group position={[0.3, -0.2, -0.7]}>
      {balloons.map((balloon) => (
        <FloatingBalloon key={balloon.color} {...balloon} />
      ))}
    </group>
  );
}

function FloatingBalloon({
  color,
  position,
  phase
}: {
  color: string;
  position: readonly [number, number, number];
  phase: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.position.y = position[1] + Math.sin(t * 1.25) * 0.25;
    ref.current.position.x = position[0] + Math.sin(t * 0.85) * 0.18;
    ref.current.rotation.z = Math.sin(t * 0.9) * 0.08;
  });

  return (
    <group ref={ref} position={position as [number, number, number]}>
      <mesh>
        <sphereGeometry args={[0.66, 28, 28]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.22} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.82, 0]}>
        <cylinderGeometry args={[0.025, 0.015, 1.75, 8]} />
        <meshStandardMaterial color="#D4A5A5" />
      </mesh>
      <mesh position={[0, -1.65, 0]} rotation={[0.02, 0, 0]}>
        <sphereGeometry args={[0.075, 10, 10]} />
        <meshStandardMaterial color="#D4A5A5" />
      </mesh>
    </group>
  );
}

function Butterflies() {
  return (
    <group position={[-1.8, 1.15, -0.2]}>
      <WingedCreature color="#FF6B6B" position={[-0.5, 0.3, 0.2]} wobble={0.4} />
      <WingedCreature color="#9B5DE5" position={[1.5, 1.1, -0.1]} wobble={1.3} />
    </group>
  );
}

function Birds() {
  return (
    <group position={[0, 1.2, -0.8]}>
      <Bird color="#2C2C2C" position={[-4.2, 2.6, 0.2]} wobble={0} direction={1} />
      <Bird color="#2C2C2C" position={[2.8, 3.3, -0.2]} wobble={1} direction={-1} />
    </group>
  );
}

function Bird({
  color,
  position,
  wobble,
  direction
}: {
  color: string;
  position: readonly [number, number, number];
  wobble: number;
  direction: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.7 + wobble;
    ref.current.position.x = position[0] + Math.sin(t) * 1.3 * direction;
    ref.current.position.y = position[1] + Math.sin(t * 1.8) * 0.25;
    ref.current.rotation.z = Math.sin(t * 3) * 0.28 * direction;
  });

  return (
    <group ref={ref} position={position as [number, number, number]}>
      <mesh rotation={[0, 0, 0.3]}>
        <torusGeometry args={[0.36, 0.075, 12, 28, Math.PI]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh rotation={[0, 0, -0.3]} position={[0.5 * direction, 0.12, 0]}>
        <torusGeometry args={[0.36, 0.075, 12, 28, Math.PI]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.08 * direction, -0.02, 0.05]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function WingedCreature({
  color,
  position,
  wobble
}: {
  color: string;
  position: readonly [number, number, number];
  wobble: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 2 + wobble;
    ref.current.position.y = position[1] + Math.sin(t) * 0.22;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.18;
    ref.current.rotation.z = Math.sin(t * 4) * 0.35;
  });

  return (
    <group ref={ref} position={position as [number, number, number]}>
      <mesh position={[-0.16, 0.08, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.16, 0.08, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <capsuleGeometry args={[0.05, 0.35, 4, 10]} />
        <meshStandardMaterial color="#fffaf2" />
      </mesh>
    </group>
  );
}

function TeddyOnCloud() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = -1.42 + Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
    ref.current.rotation.y = 0.2 + Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
  });

  return (
    <group ref={ref} position={[2.1, -1.3, 0.8]} rotation={[0, -0.15, 0]}>
      <group position={[0, 0.4, -0.4]}>
      <Cloud opacity={0.36} speed={0.4} segments={20} />
      </group>
      <group position={[0, -0.1, 0]}>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.72, 32, 32]} />
          <meshStandardMaterial color="#C98B5F" roughness={0.65} />
        </mesh>
        <mesh position={[-0.48, 1.24, 0]}>
          <sphereGeometry args={[0.24, 20, 20]} />
          <meshStandardMaterial color="#C98B5F" roughness={0.7} />
        </mesh>
        <mesh position={[0.48, 1.24, 0]}>
          <sphereGeometry args={[0.24, 20, 20]} />
          <meshStandardMaterial color="#C98B5F" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.8, 0.62]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#2C2C2C" />
        </mesh>
        <mesh position={[-0.2, 0.94, 0.58]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#2C2C2C" />
        </mesh>
        <mesh position={[0.2, 0.94, 0.58]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#2C2C2C" />
        </mesh>
        <mesh position={[0, 0.68, 0.6]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#FF6B6B" />
        </mesh>
        <mesh position={[0, 0.58, 0.6]}>
          <torusGeometry args={[0.11, 0.02, 10, 20, Math.PI]} />
          <meshStandardMaterial color="#2C2C2C" />
        </mesh>
        <mesh position={[-0.34, 0.34, 0.25]} rotation={[0, 0, 0.55]}>
          <capsuleGeometry args={[0.08, 0.45, 4, 10]} />
          <meshStandardMaterial color="#B97951" />
        </mesh>
        <mesh position={[0.34, 0.34, 0.25]} rotation={[0, 0, -0.55]}>
          <capsuleGeometry args={[0.08, 0.45, 4, 10]} />
          <meshStandardMaterial color="#B97951" />
        </mesh>
        <mesh position={[-0.24, -0.22, 0.18]} rotation={[0, 0, -0.14]}>
          <capsuleGeometry args={[0.09, 0.52, 4, 10]} />
          <meshStandardMaterial color="#B97951" />
        </mesh>
        <mesh position={[0.24, -0.22, 0.18]} rotation={[0, 0, 0.14]}>
          <capsuleGeometry args={[0.09, 0.52, 4, 10]} />
          <meshStandardMaterial color="#B97951" />
        </mesh>
      </group>
    </group>
  );
}

function NanhiDuniyaText() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
    ref.current.position.y = 1.65 + Math.sin(state.clock.elapsedTime * 0.75) * 0.05;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={ref} position={[0, 1.75, 0.55]}>
        <Text3D
          font={textFont}
          size={0.92}
          height={0.22}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.03}
          bevelSegments={4}
          position={[-3.9, 0, 0]}
        >
          NanhiDuniya
          <meshStandardMaterial color="#ffffff" emissive="#9B5DE5" emissiveIntensity={1.2} roughness={0.18} />
        </Text3D>
        <Text3D
          font={textFont}
          size={0.92}
          height={0.05}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelSegments={2}
          position={[-3.96, -0.02, -0.12]}
        >
          NanhiDuniya
          <meshStandardMaterial color="#FFEEAD" transparent opacity={0.22} emissive="#FFEEAD" emissiveIntensity={0.55} />
        </Text3D>
      </group>
    </Float>
  );
}

function StarsField() {
  return (
    <group>
      <Sparkles count={80} speed={0.45} scale={[18, 9, 10]} size={3.4} color="#ffffff" opacity={0.65} />
      <Stars radius={35} depth={18} count={800} factor={4} saturation={0} fade speed={0.4} />
    </group>
  );
}
