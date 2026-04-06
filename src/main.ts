import 'virtual:uno.css'
import './assets/styles/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import globalComponents from './components'

const app = createApp(App)

app.use(globalComponents)
app.mount('#app')
