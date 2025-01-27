'use client';

import { Bounds, OrbitControls, PerspectiveCamera, useTexture, View } from '@react-three/drei';
import { JsonValue } from '@/lib/nbt/json';
import { NbtType } from '@/lib/nbt/tags/type';

interface BlockProps {
  position: [number, number, number];
  name: string;
}

function Block({ position, name }: BlockProps) {
  const texture = useTexture(`/textures/${name.replace('minecraft:', '')}.png`);

  return (
    <mesh position={position}>
      <boxGeometry />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

interface NbtViewerProps {
  data: Record<
    string,
    {
      type: NbtType;
      value: JsonValue;
    }
  >;
}

export function ModelViewer({ data }: NbtViewerProps) {
  return (
    <div className='relative w-full h-full'>
      <View className='absolute w-full h-full'>
        <PerspectiveCamera makeDefault position={[Math.PI / 4, Math.PI / 2, Math.PI / 4]} />
        <OrbitControls makeDefault />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Bounds fit clip observe>
          <group position={[0, 0, 0]}>
            <group rotation={[0, 0, 0]}>
              {data.blocks.value?.items?.map((item, i) => (
                <Block
                  key={i}
                  position={item.pos.value.items}
                  name={data.palette.value.items[item.state.value].Name.value}
                />
              ))}
            </group>
          </group>
        </Bounds>
      </View>
    </div>
  );
}
