import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import store from './store.js'
import router from './router/index'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'


Vue.use(Vuetify, {
  iconfont: 'fa'  // fontawesomeを使うために指定
})

Vue.use(VueRouter)

new Vue({
  el: '#app',
  store,  // storeを登録。全てのコンポーネントからstoreにアクセスできるようになる
  router,
  components: { App }
});

