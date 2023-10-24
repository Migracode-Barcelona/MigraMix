import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Configura el proxy solo para la ruta específica
      '/api/sign-up': {
        target: 'http://localhost:4000', // Reemplaza esto con la URL de tu servidor Express
        changeOrigin: true,
      },
    },
  },
})
