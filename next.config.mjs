/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: process.cwd(),
  },
};

export default nextConfig;
