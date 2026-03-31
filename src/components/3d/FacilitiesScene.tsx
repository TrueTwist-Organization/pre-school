import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useCursor, Float } from '@react-three/drei';
import { type ReactNode, useMemo, useRef, useState } from 'react';
import { Group, Mesh } from 'three';
import { facilities } from '@/lib/content';

export type FacilityRoomId = (typeof facilities)[number]['id'];

export default function FacilitiesScene({
  onSelect
}: {
  onSelect: (room: (typeof facilities)[number]) => void;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 shadow-soft">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 8.2, 13.2], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[7, 12, 7]} intensity={2.5} color="#fff8da" />
        <directionalLight position={[-6, 8, -4]} intensity={1.1} color="#4ECDC4" />
        <Rig>
          <Dollhouse onSelect={onSelect} />
        </Rig>
      </Canvas>
    </div>
  );
}

function Rig({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.pointer.x * 0.2;
    ref.current.rotation.x = -0.04 + state.pointer.y * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

function Dollhouse({ onSelect }: { onSelect: (room: (typeof facilities)[number]) => void }) {
  const rooms = useMemo(
    () => {
      const slotPositions: [number, number, number][] = [
        [-3.55, 0.7, 1.8],
        [0, 0.7, 1.8],
        [3.55, 0.7, 1.8],
        [-3.55, 0.7, -1.8],
        [0, 0.7, -1.8],
        [3.55, 0.7, -1.8]
      ];
      const palette = ['#FF6B6B', '#FFD93D', '#4D96FF', '#6BCB77', '#9B5DE5', '#FFEEAD'];

      return facilities.map((room, index) => ({
        room,
        position: slotPositions[index % slotPositions.length]!,
        color: palette[index % palette.length]!
      }));
    },
    []
  );

  return (
    <group position={[0, -0.25, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.42, 0]}>
        <planeGeometry args={[14.8, 9.8]} />
        <meshStandardMaterial color="#F8EFD8" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.95, 0]}>
        <boxGeometry args={[9.8, 2.1, 6.6]} />
        <meshStandardMaterial color="#ffffff" opacity={0.86} transparent />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 2.2, 0]}>
        <boxGeometry args={[10.1, 0.18, 6.95]} />
        <meshStandardMaterial color="#FFEEAD" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 2.55, 0]}>
        <boxGeometry args={[10.35, 0.26, 7.2]} />
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.12} />
      </mesh>

      <group position={[0, 0.05, 0]}>
        <mesh position={[-3.35, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.16, 2.2, 6.7]} />
          <meshStandardMaterial color="#D4A5A5" />
        </mesh>
        <mesh position={[0, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.16, 2.2, 6.7]} />
          <meshStandardMaterial color="#D4A5A5" />
        </mesh>
        <mesh position={[3.35, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.16, 2.2, 6.7]} />
          <meshStandardMaterial color="#D4A5A5" />
        </mesh>
        <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[9.8, 0.12, 0.16]} />
          <meshStandardMaterial color="#D4A5A5" />
        </mesh>
      </group>

      {rooms.map(({ room, position, color }) => (
        <ClickableRoom key={room.id} room={room} position={position as [number, number, number]} color={color} onSelect={onSelect} />
      ))}
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.5}>
        <mesh position={[5.15, 2.6, -2.5]}>
          <sphereGeometry args={[0.55, 24, 24]} />
          <meshStandardMaterial color="#FFEEAD" emissive="#FFEEAD" emissiveIntensity={0.4} />
        </mesh>
      </Float>
      <Float speed={0.7} rotationIntensity={0.2} floatIntensity={0.55}>
        <mesh position={[-5.0, 2.35, 2.2]}>
          <torusGeometry args={[0.55, 0.16, 16, 36]} />
          <meshStandardMaterial color="#9B5DE5" emissive="#9B5DE5" emissiveIntensity={0.22} />
        </mesh>
      </Float>
    </group>
  );
}

function ClickableRoom({
  room,
  position,
  color,
  onSelect
}: {
  room: (typeof facilities)[number];
  position: [number, number, number];
  color: string;
  onSelect: (room: (typeof facilities)[number]) => void;
}) {
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.08;
    mesh.current.scale.setScalar(hovered ? 1.05 : 1);
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(room)}
      >
        <boxGeometry args={[2.25, 1.05, 1.55]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.24 : 0.12} />
      </mesh>
      <Html center distanceFactor={8} position={[0, 0.92, 0]}>
        <div className="pointer-events-none rounded-full bg-white/90 px-4 py-2 text-center text-xs font-semibold text-ink shadow-soft">
          {room.title}
        </div>
      </Html>
      <mesh position={[0, 0.72, 0.84]}>
        <boxGeometry args={[1.28, 0.2, 0.16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.46, 0.15, 0.84]}>
        <boxGeometry args={[0.28, 0.55, 0.12]} />
        <meshStandardMaterial color="#fffaf2" />
      </mesh>
      <mesh position={[0.46, 0.15, 0.84]}>
        <boxGeometry args={[0.28, 0.55, 0.12]} />
        <meshStandardMaterial color="#fffaf2" />
      </mesh>
    </group>
  );
}
