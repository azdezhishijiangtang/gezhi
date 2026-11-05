import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import {defineConfig} from "vite"
import process from "process"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '::',
    port: 5173,
    allowedHosts: true,
    cors: true,
    // 仅在云端 IDE 注入了空间环境变量时才启用远程 HMR；
    // 本地或变量缺失时回退为 Vite 默认（localhost），避免 host 变成 "5173-undefined..." 导致 HMR 失效
    hmr: process.env.X_IDE_SPACE_KEY
      ? {
          protocol: 'wss',
          host: `5173-${process.env.X_IDE_SPACE_KEY}.e2b.${process.env.X_IDE_SPACE_REGION}.${process.env.X_IDE_SPACE_HOST}`,
        }
      : undefined,
    proxy: {
      '/api': {
        // 后端模板服务运行在 3001（3000 由发布应用的静态服务器占用）
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 供应商分包：提升缓存命中率，降低首包体积
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-katex': ['katex'],
        },
      },
    },
  },
})
