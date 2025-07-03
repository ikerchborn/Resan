import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Resan/", // ⚠️ Reemplaza "Resan" con el nombre EXACTO del repo si cambia
  plugins: [react()],
})
