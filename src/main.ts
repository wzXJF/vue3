import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import { globalRegister } from './global'
import 'normalize.css'
import '@/assets/css/index.less'

const app = createApp(App)
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)
/*
  app.use(router)
  setupStore()
  bug原因说明：
    app.use(router) -> install(){} -> 获取当前path -> router: routes -> 刷新的同时直接做路由匹配，
    此时路由列表中没有添加动态路由，所以匹配到的结果 name='not-found' -> 路由守卫(回调)，这个是后面的回调
    在 router.beforeEach((to) => {}) 中获取的 router.getRoutes() 是已经添加动态路由成功后，所以打印是
    没有问题的，但是当前的 to 已经是之前在app.use(router)中匹配过的，所以就跳转到了 not-found 页面

  解决方案：
  setupStore()
  app.use(router)
  调用顺序修改一下，优先执行动态路由的注入，然后此时已经有了所有路由，然后再调用 app.use(router) 就可以匹配
  到相应的路由
*/

app.mount('#app')
