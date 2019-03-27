import Vue from 'vue'
import VueRouter from 'vue-router'
import Content from '../components/Content.vue'
import UserShow from '../components/UserShow.vue'
import Information from '../components/Information.vue'
import store from '../store.js'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'talk', path: '/', component: Content },
    { name: 'user_show', path: '/users/', component: UserShow },  // idなどのパラメータがあるときは、nameを指定
    { name: 'info', path: '/info', component: Information }
  ]
})

export default router

// 全てのルートの遷移前に以下の処理がなされる
router.beforeEach((to, from, next) => {
  store.dispatch('doChangeLoading', true)
  setTimeout(next, 2000)  // 1秒待ってから、nextする（ページを遷移する）これがないと、すぐに遷移してafterEachメソッドが呼び出されてしまう。
})

router.afterEach(() => {
  store.dispatch('doChangeLoading', false)
})
