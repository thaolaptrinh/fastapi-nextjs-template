import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/api/**": ["./app/**"],
    "/_next/**": ["./.next/**"],
  },
  turbopack: process.env.TURBOPACK_ROOT
    ? { root: process.env.TURBOPACK_ROOT }
    : undefined,
}

export default nextConfig
