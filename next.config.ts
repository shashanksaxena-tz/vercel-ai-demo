import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // This is needed because the registry components use dynamic props from @json-render
    // which return 'unknown' types by design.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
