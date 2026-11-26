import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Cấu hình base phù hợp với GitHub Pages repository: /birthday-invitation/
  // Nếu repository trên GitHub của bạn có tên khác, hãy đổi '/birthday-invitation/' tương ứng
  base: process.env.VITE_BASE || '/birthday-invitation/',
  build: {
    // Hạ CSS target để LightningCSS tự chuyển oklch/color-mix sang rgb/rgba cho Safari/WebView cũ
    cssTarget: ['chrome87', 'safari13.1', 'ios13'],
  },
})
