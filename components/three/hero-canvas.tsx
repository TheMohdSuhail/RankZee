"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { FallbackGradient } from "./fallback-gradient";

// Lazy load the 3D Canvas dynamically with ssr: false
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  {
    ssr: false,
    loading: () => <FallbackGradient />,
  }
);

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
});

export function HeroCanvas() {
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check device screen width (avoid running WebGL on narrow mobile screens for power/battery saving)
    const isMobile = window.innerWidth < 768;

    // Check WebGL availability safely
    let hasWebGL = false;
    try {
      const testCanvas = document.createElement("canvas");
      hasWebGL = !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))
      );
    } catch {
      hasWebGL = false;
    }

    if (!prefersReducedMotion && !isMobile && hasWebGL) {
      setShouldRender3D(true);
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Background Gradient Fallback is always mounted to prevent flashing and guarantee immediate LCP */}
      <FallbackGradient />

      {shouldRender3D && (
        <div className="absolute inset-0 w-full h-full opacity-80 pointer-events-none transition-opacity duration-1000">
          <Canvas
            camera={{ position: [0, 0, 7.5], fov: 45 }}
            dpr={[1, 2]} // Cap pixel ratio at 2
            gl={{
              powerPreference: "high-performance",
              antialias: true,
              alpha: true,
            }}
          >
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
}

