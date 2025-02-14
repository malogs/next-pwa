/* eslint-disable @typescript-eslint/no-require-imports */
// import withPWA from "next-pwa";

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "ui-avatars.com",
//       },
//     ],
//   },
// };

// export default withPWA({
//   ...nextConfig,
//   pwa: {
//     register: true,
//     skipWaiting: true,
//     disable: process.env.NODE_ENV === "development",
//     mode: "production"
//   },
// });

const withPWA = require('next-pwa')({
  register: true,
  dest: 'public',
  // skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/localhost:3000\/_next\//,
      handler: "NetworkFirst",
      options: {
        cacheName: "next-assets",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
  ],
})

module.exports = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
})