import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'MaLogs App',
    short_name: 'MaLogs',
    description: 'A Next.js Malogs Progressive Web App',
    start_url: '/?mode=standalone',
    display: 'standalone',
    orientation: 'portrait',
    display_override: ['fullscreen', 'minimal-ui'],
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/icons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/desktop.png',
        sizes: '3600x2338',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: '/mobile.png',
        sizes: '784x1688',
        type: 'image/png',
      },
    ],
  };
}
