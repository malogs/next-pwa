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
  skipWaiting: true,
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