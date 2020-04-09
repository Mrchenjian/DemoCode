import Vue from 'vue/dist/vue.js'
import App from './App.vue'
// import './mock.js'
import {Toast} from './elmentUi'
Vue.use(Toast)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
