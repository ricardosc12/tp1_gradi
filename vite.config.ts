import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path'
import vercel from 'vite-plugin-vercel';

// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    // vercel(),
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
    target: 'esnext'
    // sourcemap: true
  }
});
