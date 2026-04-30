/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Webpack’s persistent pack cache can throw "Array buffer allocation failed" on machines
   * with tight RAM. Disabling it in dev avoids huge cache buffers; builds stay more stable.
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
