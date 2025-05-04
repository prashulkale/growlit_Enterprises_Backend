/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // experimental: {
  //   serverActions: true, // Enable Server Actions
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ["images.clerk.dev"],
    unoptimized: true ,
  },
};

module.exports = nextConfig;
