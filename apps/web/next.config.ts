import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Balíček @praxio/shared je psaný v TypeScriptu, Next.js ho musí sám přeložit.
  transpilePackages: ["@praxio/shared"],
};

export default nextConfig;
