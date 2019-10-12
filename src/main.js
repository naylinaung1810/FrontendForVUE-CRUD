import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

import '@fortawesome/fontawesome-free/css/all.css'
 //import 'jquery'
// global.$ = require('jquery');
// global.jquery=require('jquery');
window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
