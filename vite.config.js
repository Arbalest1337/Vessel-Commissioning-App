import { defineConfig } from "vite"
import uni from "@dcloudio/vite-plugin-uni"
import { fileURLToPath, URL } from "node:url"
import Components from "@uni-helper/vite-plugin-uni-components"
import { WotResolver } from "@uni-helper/vite-plugin-uni-components/resolvers"
import AutoImport from "unplugin-auto-import/vite"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
const serverConfig = {
  host: "0.0.0.0",
  port: 5175,
  open: false,
  proxy: {
    "/prod-api": {
      // target: "http://221.131.73.82:8801/prod-api",
      target: "http://192.168.10.12:3000",

      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/prod-api/, ""),
    },
    "/s3-endpoint": {
      // target: "http://221.131.73.82:8800",
      target: "http://192.168.10.12:9000",
       changeOrigin: true,
      rewrite: (path) => path.replace(/^\/s3-endpoint/, ""),
    },
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      directoryAsNamespace: true,
      resolvers: [WotResolver()],
    }),
    AutoImport({
      imports: ["vue", "pinia"],
    }),
    uni(),
  ],

  optimizeDeps: {
    exclude: ["jspdf"],
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: [
          "legacy-js-api",
          "global-builtin",
          "import",
          "color-functions",
        ],
      },
    },
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    ...serverConfig,
  },
})
