/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.google.cl", "www.localhost.com"],
  },
};

module.exports = nextConfig;
