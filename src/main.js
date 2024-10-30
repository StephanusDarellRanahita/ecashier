import { createApp } from 'vue'
import './style.css'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'

const app = createApp(App)

app
.use(router)
.use(store)
.use(Antd)
.mount('#app')
