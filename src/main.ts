import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFullScreen from 'vue-fullscreen'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(VueFullScreen)

app.mount('#app')
