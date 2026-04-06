import { type App } from 'vue'
import FaIcon from './fa-icon.vue'

export default {
  install (app: App) {
    app.component('FaIcon', FaIcon)
  },
}

declare module 'vue' {
  export interface GlobalComponents {
    FaIcon: typeof FaIcon,
  }
}
