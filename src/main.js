import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import plugin from '@js/plugin.js';
import './assets/css/normalize.css';
// import 'iview/dist/styles/iview.css';
import './assets/css/cover.less';

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(plugin)

router.beforeEach((to, from, next) => {
  const isEmpty = (store.state.userInfo === null) || $K.isEmpty(store.state.userInfo)
  to.matched[0].meta.needLogin && isEmpty ? next({ name: "Login" }) : next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
