import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/vicario-smart-repair-demo/',
  plugins: [react()],
  server: {
    allowedHosts: ['.loca.lt', '.trycloudflare.com'],
  },
  preview: {
    allowedHosts: ['.loca.lt', '.trycloudflare.com'],
  },
})
