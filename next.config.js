/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath:'/src',
  redirects: async () => [
    {
      source: "/",
      destination: "/menu/menu",
      // basePath:false,
      permanent: true,
    },
  ],
  images: {
    domains: ["www.spiceupthecurry.com"],
  },
};

module.exports = nextConfig
