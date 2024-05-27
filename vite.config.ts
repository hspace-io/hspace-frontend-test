import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import type { UserConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const config: UserConfig = {
    plugins: [react()],
    build: {
      outDir: './build',
      sourcemap: true,
    },
  };
  return config;
});
