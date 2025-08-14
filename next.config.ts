import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@codesandbox/sdk", "@prisma/client"],
  output: 'standalone',
};

export default nextConfig;
