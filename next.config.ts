const TerserPlugin = require("terser-webpack-plugin");

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = config.optimization || {};
      config.optimization.minimize = true;
      config.optimization.minimizer = config.optimization.minimizer || [];
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log", "console.warn", "console.error"],
            },
            output: {
              comments: false,
            },
          },
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
