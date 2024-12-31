/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.pdf$/, // Test for PDF file types
      use: {
        loader: "file-loader", // Use file-loader to handle PDF imports
        options: {
          name: "[path][name].[ext]", // Preserve file name and extension
        },
      },
    });

    return config;
  },
};

export default nextConfig;
