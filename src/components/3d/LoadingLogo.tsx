import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

function LogoModel() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.95;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.65) * 0.08;
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.28} roughness={0.3} />
      </mesh>
      <mesh position={[-0.52, 0.78, 0]}>
        <sphereGeometry args={[0.28, 20, 20]} />
        <meshStandardMaterial color="#FFEEAD" />
      </mesh>
      <mesh position={[0.52, 0.78, 0]}>
        <sphereGeometry args={[0.28, 20, 20]} />
        <meshStandardMaterial color="#FFEEAD" />
      </mesh>
      <mesh position={[-0.28, 0.12, 0.6]}>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      <mesh position={[0.28, 0.12, 0.6]}>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      <mesh position={[0, -0.1, 0.64]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
    </group>
  );
}

export default function LoadingLogo() {
  return (
    <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-[2rem] bg-white/75 shadow-soft">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 38 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#fff8d6" />
        <Float speed={1.3} rotationIntensity={0.45} floatIntensity={0.7}>
          <LogoModel />
        </Float>
      </Canvas>
    </div>
  );
}
