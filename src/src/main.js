import Vue from 'vue'
import App from './App'
Vue.use(require('vue-resource'));

Vue.component('uploader',require('./components/uploader.vue'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
