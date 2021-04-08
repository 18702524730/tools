import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
const routes = [
	{ path: '/', component: App },
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes:routes
})

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')

