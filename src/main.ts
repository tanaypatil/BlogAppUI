import { type App, createApp } from 'vue'
import './style.css'
import AppView from './App.vue'
import router from './router'
import { vuetify } from './plugins/vuetify.ts'
import { createPinia } from 'pinia'

let app: App<Element>
app = createApp(AppView)
app.use(vuetify)
app.use(router)
app.use(createPinia())
app.mount('#app')
