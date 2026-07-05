import type { NextConfig } from "next";

const allowedDevOrigins = process.env.NEXT_ALLOWED_DEV_ORIGIN
  ? [process.env.NEXT_ALLOWED_DEV_ORIGIN]
  : undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(allowedDevOrigins ? { allowedDevOrigins } : {}),
};

export default nextConfig;
