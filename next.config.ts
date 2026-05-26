import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["rough-notation", "gsap", "@gsap/react"],
};

export default nextConfig;
