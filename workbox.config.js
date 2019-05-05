module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{ico,png,jpg,svg,js,html,json}'
  ],
  swDest: 'dist/service-worker.js',
  navigateFallback: '/index.html',
};
