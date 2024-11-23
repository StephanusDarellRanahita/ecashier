import { createApp } from 'vue'
import './style.css'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'

import moment from 'moment/dist/moment'
import id from 'moment/dist/locale/id'

moment.locale('id', id)

const app = createApp(App)

app.config.globalProperties.$filters = {
    timeAgo(date) {
        return moment(date).fromNow()
    }
}

app
.use(router)
.use(store)
.use(Antd)
.mount('#app')
