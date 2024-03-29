/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process?.env?.NEXT_PUBLIC_HOSTNAME],
    unoptimized: true,
    // path: process?.env?.NEXT_PUBLIC_HOSTNAME
  },
};
module.exports = nextConfig;
