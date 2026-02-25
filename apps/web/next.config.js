/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@website-engine/core"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "**.pexels.com" },
    ],
  },
};

module.exports = nextConfig;
