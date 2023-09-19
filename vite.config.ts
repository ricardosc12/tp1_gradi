import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path'
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    solidPlugin(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    // sourcemap: true
  },
});
