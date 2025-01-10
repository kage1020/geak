import { ImageResponse } from 'next/og';
import { Logo } from '@/components/logo';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const alt = 'GEAK';
export const contentType = 'image/svg+xml';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Logo />
      </div>
    )
  );
}
