import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../index.css' // tailwindcss
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import Pusher from 'pusher-js';

const app = createApp(App)

var token = store.getters.getToken

// axios
axios.defaults.headers.common['Authorization'] = token ?? ''
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/' : 'https://api-golimbah.intaniofficial.com/api/'

// pusher
const pusher = new Pusher('b3d4312adf3221170947', {
    cluster: 'ap1'
});
const pusher_channel = pusher.subscribe('my-channel');
app.config.globalProperties.channel = pusher_channel



app.use(router)
app.use(store)
app.use(VueAxios, axios)

app.mount('#app')
