import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
Vue.use(VueRouter)

// 定义组件, 也可以像教程之前教的方法从别的文件引入
//const searchMain = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
import searchResult from './component/searchResult.vue'

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    //mode: 'history',
    base: __dirname,
    routes: [
        {
         path: '/searchResult',
         component: searchResult
         }
    ]
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
