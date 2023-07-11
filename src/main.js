import {createApp} from 'vue'
import 'normalize.css/normalize.css'
import 'vue-global-api'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
