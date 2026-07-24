import { createSSRApp } from "vue"
import * as Pinia from "pinia"
import "@/style/tailwindcss.css"
import "@/style/index.scss"

import App from "./App.vue"
export function createApp() {
  const app = createSSRApp(App)

  const pinia = Pinia.createPinia()
  app.use(pinia)
  return {
    app,
    pinia,
  }
}
