import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv, type UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {

  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    plugins: [
      tailwindcss(),
      UnoCSS(),
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: process.env.VITE_SERVER_HOST ?? 'localhost',
      port: Number(process.env.VITE_SERVER_PORT ?? 5173),
      https: process.env.VITE_SERVER_HTTPS_PATH_CERT
        ? {
          cert: process.env.VITE_SERVER_HTTPS_PATH_CERT,
          key: process.env.VITE_SERVER_HTTPS_PATH_KEY,
          ciphers: process.env.VITE_SERVER_HTTPS_CIPHERS,
        }
        : undefined,
    },
    build: {
      sourcemap: true,
    },
  }
})
