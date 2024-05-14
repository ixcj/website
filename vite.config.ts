import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { fileURLToPath, URL } from 'node:url'

const tags = require('./src/config/index.ts').tags
const assetsUrl = require('./src/config/index.ts').assetsUrl

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      inject: {
        tags,
      },
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$assetsUrl: '${assetsUrl}';`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true
  }
})
