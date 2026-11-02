"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// 1. Swirling Cybernetic Particle Nebula (Vortex Flow)
function ParticleNebula({ count = 420 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    const colorCyan = new THREE.Color("#00F5FF");
    const colorViolet = new THREE.Color("#8B5CF6");
    const colorBlue = new THREE.Color("#0066FF");
    const colorEmerald = new THREE.Color("#10B981");

    for (let i = 0; i < count; i++) {
      // Spiral vortex distribution around center
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.pow(Math.random(), 1.5) * 6.5;
      const height = (Math.random() - 0.5) * 4.5;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height + Math.sin(angle * 2) * 0.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      // Color distribution based on radius and random variance
      const rand = Math.random();
      const chosenColor =
        rand < 0.4 ? colorCyan : rand < 0.7 ? colorViolet : rand < 0.9 ? colorBlue : colorEmerald;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      sc[i] = 0.04 + Math.random() * 0.06;
    }
    return [pos, col, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.06;
      pointsRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 2. The RankZee Central Matrix Core (Interactive Gyroscope & Floating Diamond)
function GrowthMatrixCore() {
  const coreRef = useRef<THREE.Group>(null!);
  const innerMeshRef = useRef<THREE.Mesh>(null!);
  const outerWireRef = useRef<THREE.LineSegments>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const diamondRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y += delta * 0.4;
      innerMeshRef.current.rotation.x += delta * 0.25;
      innerMeshRef.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.05);
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.y -= delta * 0.25;
      outerWireRef.current.rotation.z += delta * 0.15;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.45;
      ring1Ref.current.rotation.x = Math.sin(t * 0.8) * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.35;
      ring2Ref.current.rotation.y = Math.cos(t * 0.7) * 0.4;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.5;
    }

    if (diamondRef.current) {
      diamondRef.current.rotation.y += delta * 0.8;
      diamondRef.current.position.y = Math.sin(t * 2) * 0.12;
    }
  });

  return (
    <group ref={coreRef} position={[2.2, 0.2, 0]}>
      {/* Central Pulsing Polyhedron */}
      <mesh ref={innerMeshRef}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#0066FF"
          emissive="#00F5FF"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Floating #1 Apex Diamond Core inside */}
      <mesh ref={diamondRef}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#8B5CF6"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={1.0}
        />
      </mesh>

      {/* Outer Cybernetic Geodesic Cage */}
      <lineSegments ref={outerWireRef}>
        <wireframeGeometry args={[new THREE.IcosahedronGeometry(1.4, 2)]} />
        <lineBasicMaterial color="#00F5FF" transparent opacity={0.35} />
      </lineSegments>

      {/* Orbital Neon Gyro Ring 1 (Electric Cyan) */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.85, 0.022, 16, 72]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={0.8}
          roughness={0.2}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Orbital Neon Gyro Ring 2 (Electric Violet) */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.1, 0.018, 16, 72]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.9}
          roughness={0.2}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Outer Attractor Orbit Ring (Emerald ROI Green) */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[2.35, 0.012, 16, 72]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={0.7}
          roughness={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

// 3. Orbiting Data Satellites with Laser Beams
function SatelliteOrbiters() {
  const groupRef = useRef<THREE.Group>(null!);

  const satellites = useMemo(
    () => [
      { radius: 2.8, speed: 0.6, phase: 0, color: "#00F5FF", size: 0.12 },
      { radius: 3.2, speed: 0.45, phase: Math.PI * 0.7, color: "#8B5CF6", size: 0.1 },
      { radius: 2.5, speed: 0.8, phase: Math.PI * 1.4, color: "#10B981", size: 0.09 },
      { radius: 3.6, speed: 0.35, phase: Math.PI * 0.3, color: "#3B82F6", size: 0.11 },
    ],
    []
  );

  const meshesRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    satellites.forEach((sat, i) => {
      const mesh = meshesRef.current[i];
      if (mesh) {
        const angle = t * sat.speed + sat.phase;
        mesh.position.x = 2.2 + Math.cos(angle) * sat.radius;
        mesh.position.z = Math.sin(angle) * (sat.radius * 0.7);
        mesh.position.y = Math.sin(t * 1.5 + sat.phase) * 0.6;
        mesh.rotation.y += 0.02;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {satellites.map((sat, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshesRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[sat.size, 16, 16]} />
          <meshStandardMaterial
            color={sat.color}
            emissive={sat.color}
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// 4. Dynamic #1 Google SERP Ranking Growth Ladder (Interactive Bars)
function RankingGrowthLadder() {
  const ladderGroupRef = useRef<THREE.Group>(null!);
  const barMeshesRef = useRef<THREE.Mesh[]>([]);
  const beaconRef = useRef<THREE.Mesh>(null!);

  const barData = useMemo(
    () => [
      { x: -1.2, baseH: 0.7, color: "#1E3A8A", rank: "Top 50" },
      { x: -0.6, baseH: 1.3, color: "#2563EB", rank: "Top 20" },
      { x: 0.0, baseH: 2.0, color: "#7C3AED", rank: "Top 10" },
      { x: 0.6, baseH: 2.8, color: "#06B6D4", rank: "Page 1" },
      { x: 1.2, baseH: 3.7, color: "#00F5FF", rank: "#1 Rank" },
    ],
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (ladderGroupRef.current) {
      ladderGroupRef.current.position.y = -1.4 + Math.sin(t * 0.9) * 0.07;
      ladderGroupRef.current.rotation.y = -0.3 + Math.sin(t * 0.5) * 0.1;
    }

    // Dynamic wave modulation on the ranking bars
    barData.forEach((bar, i) => {
      const mesh = barMeshesRef.current[i];
      if (mesh) {
        const wave = Math.sin(t * 2 + i * 0.6) * 0.12;
        mesh.scale.y = 1 + wave;
      }
    });

    if (beaconRef.current) {
      beaconRef.current.rotation.y += 0.04;
      beaconRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.15);
    }
  });

  return (
    <group ref={ladderGroupRef} position={[-2.4, -1.4, -0.6]}>
      {barData.map((bar, i) => (
        <group key={i} position={[bar.x, bar.baseH / 2, 0]}>
          <mesh
            ref={(el) => {
              if (el) barMeshesRef.current[i] = el;
            }}
          >
            <boxGeometry args={[0.38, bar.baseH, 0.38]} />
            <meshStandardMaterial
              color={bar.color}
              emissive={bar.color}
              emissiveIntensity={i === 4 ? 0.8 : 0.35}
              roughness={0.25}
              metalness={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Glowing Top Plate */}
          <mesh position={[0, bar.baseH / 2 + 0.03, 0]}>
            <boxGeometry args={[0.4, 0.05, 0.4]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={bar.color}
              emissiveIntensity={1}
            />
          </mesh>
        </group>
      ))}

      {/* #1 Apex Crown Marker on the highest bar */}
      <mesh ref={beaconRef} position={[1.2, 3.7 + 0.35, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={1.5}
          metalness={1.0}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// 5. Main Three.js Scene Root with Global Pointer Physics
export default function HeroScene() {
  const rootGroupRef = useRef<THREE.Group>(null!);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const light1Ref = useRef<THREE.PointLight>(null!);
  const light2Ref = useRef<THREE.PointLight>(null!);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Normalize pointer coordinates: -1 to +1
      pointerTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth inertia interpolation towards mouse pointer
    if (rootGroupRef.current) {
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.y,
        pointerTarget.current.x * 0.32,
        0.04
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.x,
        -pointerTarget.current.y * 0.22,
        0.04
      );
    }

    // Dynamic orbiting neon spotlights
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.cos(t * 0.8) * 6;
      light1Ref.current.position.y = Math.sin(t * 0.6) * 4;
      light1Ref.current.position.z = Math.sin(t * 0.8) * 6;
    }

    if (light2Ref.current) {
      light2Ref.current.position.x = -Math.cos(t * 0.7) * 7;
      light2Ref.current.position.y = -Math.sin(t * 0.5) * 4;
      light2Ref.current.position.z = -Math.sin(t * 0.7) * 7;
    }
  });

  return (
    <>
      {/* Dynamic Lighting System */}
      <ambientLight intensity={0.65} color="#0c162d" />
      <directionalLight position={[8, 12, 6]} intensity={1.4} color="#e0f2fe" />
      <pointLight
        ref={light1Ref}
        position={[6, 3, 5]}
        intensity={2.4}
        color="#00F5FF"
        distance={18}
      />
      <pointLight
        ref={light2Ref}
        position={[-6, -3, -5]}
        intensity={2.6}
        color="#8B5CF6"
        distance={20}
      />

      {/* Main 3D Interactive Group */}
      <group ref={rootGroupRef}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <GrowthMatrixCore />
        </Float>
        <SatelliteOrbiters />
        <RankingGrowthLadder />
        <ParticleNebula count={460} />
      </group>
    </>
  );
}
