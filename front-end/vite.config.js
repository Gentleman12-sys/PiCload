import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

const VITE_FRONT_PORT = process.env.VITE_FRONT_PORT

console.log(VITE_FRONT_PORT)

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [react()]
});
