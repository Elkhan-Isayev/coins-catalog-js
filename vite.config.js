import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The repository name is used as the base path so assets resolve correctly
// when the app is served from https://<user>.github.io/coins-catalog-js/.
export default defineConfig({
  base: '/coins-catalog-js/',
  plugins: [react()],
});
