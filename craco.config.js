const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@store': path.resolve(__dirname, 'src/store'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/utils/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@mock': path.resolve(__dirname, 'src/mock'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@navigation': path.resolve(__dirname, 'src/navigation'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
};
