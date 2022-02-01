import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootStore, IStoreType } from './types'
import login from './login/login'
import system from './system/system'

const store = createStore<IRootStore>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    login,
    system
  }
})

export function setupStore(): void {
  store.dispatch('login/loadLocalLogin')
  // 此处在退出登录之后，重新登录的时候，有可能在请求的时候还没有获取到token，因为请求是异步的，所以最好把该请求放到获取token之后再调用
}

export function useStore(): Store<IStoreType> {
  // 主动调用vuex自己的useStore
  return useVuexStore()
}

export default store
