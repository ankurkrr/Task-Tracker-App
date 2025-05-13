import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Bind to this IP address
    port: 3000,        // Use port 3000
  },
});
