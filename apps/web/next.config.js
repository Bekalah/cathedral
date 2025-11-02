/** @type {import('next').NextConfig} */
const isGhPages = process.env.NEXT_PUBLIC_GH_PAGES === 'true' || process.env.GH_PAGES === 'true';
const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Enable static export for Cloudflare Pages and Azure Static Web Apps
  output: "export",
  trailingSlash: true,
  // GitHub Pages project site served under /cathedral (conditional)
  // When deploying to Vercel/Cloudflare root domains, leave basePath empty
  ...(explicitBasePath
    ? { basePath: explicitBasePath, assetPrefix: explicitBasePath.endsWith('/') ? explicitBasePath : explicitBasePath + '/' }
    : isGhPages
    ? { basePath: "/cathedral", assetPrefix: "/cathedral/" }
    : {}),
  images: {
    unoptimized: true,
  },

  // Webpack configuration for Three.js, Babylon.js, p5.js, and Tone.js
  webpack: (config, { isServer }) => {
    // Handle Three.js and other libraries that expect window object
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: "three",
            chunks: "all",
          },
          babylonjs: {
            test: /[\\/]node_modules[\\/]babylonjs[\\/]/,
            name: "babylonjs",
            chunks: "all",
          },
          tone: {
            test: /[\\/]node_modules[\\/]tone[\\/]/,
            name: "tone",
            chunks: "all",
          },
        },
      },
    };

    return config;
  },

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    webVitalsAttribution: ["CLS", "LCP"],
  },
};

module.exports = nextConfig;
