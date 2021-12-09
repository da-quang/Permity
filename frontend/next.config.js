module.exports = {
  env: {
    customKey: 'my-value',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack5: false,
  optimizeFonts: false,
}
