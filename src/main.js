import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const EventBus = new Vue();

const apis = {
    production: 'http://www.seele-exzzz.xyz:10000', // 线上 (生产环境)
    development: 'http://localhost:10000', // 本地 (开发环境) 
}
axios.defaults.baseURL= process.env.NODE_ENV === 'production' ? apis.production : apis.development
Vue.prototype.$axios = axios

Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    }
})

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
