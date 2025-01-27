'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, View } from '@react-three/drei';

interface CanvasProviderProps {
  children: React.ReactNode;
}

export function CanvasProvider({ children }: CanvasProviderProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref.current ?? undefined}
        eventPrefix='client'
      >
        <View.Port />
        <Preload all />
      </Canvas>
    </div>
  );
}
