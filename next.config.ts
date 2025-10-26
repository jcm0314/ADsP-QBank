import type { NextConfig } from "next";

const nextConfig = {
  reactCompiler: true,
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
  // Prisma 엔진을 배포 산출물에 포함
  outputFileTracingIncludes: {
    '/api/**': ['./node_modules/.prisma/client'],
  },
} satisfies NextConfig;

export default nextConfig;