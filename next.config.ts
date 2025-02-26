import type { NextConfig } from "next";
import TerserPlugin from "terser-webpack-plugin";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        minimizer: [
          ...(config.optimization?.minimizer || []),
          new TerserPlugin({
            terserOptions: {
              output: {
                comments: false,
              },
            },
          }),
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
