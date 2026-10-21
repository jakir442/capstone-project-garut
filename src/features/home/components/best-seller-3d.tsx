"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const MODEL_PATH = "/gambar/3d-model/Avocado2.glb";

function IceCoffeeModel() {
  const { scene } = useGLTF(MODEL_PATH);

  return <primitive object={scene} scale={6} position={[0, -1.2, 0]} />;
}

function LoadingObject() {
  return (
    <mesh position={[0, -0.5, 0]}>
      <cylinderGeometry args={[0.8, 0.8, 1.8, 32]} />
      <meshStandardMaterial color='#6f4e37' roughness={0.35} metalness={0} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight position={[4, 5, 4]} intensity={2.5} />

      <directionalLight position={[-4, 3, 2]} intensity={1.5} />

      <directionalLight position={[0, -2, 4]} intensity={0.6} />

      <Suspense fallback={<LoadingObject />}>
        <IceCoffeeModel />
      </Suspense>

      <OrbitControls
        makeDefault
        enableZoom
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.7}
        zoomSpeed={0.7}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI - 0.15}
        target={[0, -0.3, 0]}
      />
    </>
  );
}

export function BestSeller3D() {
  return (
    <div className='relative h-[360px] w-full sm:h-[460px] md:h-[520px] lg:h-[580px]'>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 35,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>

      <div className='pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] text-white/40 backdrop-blur-sm sm:text-xs'>
        Drag untuk memutar · Scroll untuk zoom
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
