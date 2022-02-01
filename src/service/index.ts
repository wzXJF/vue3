import YJRequest from './request'
import LocalCache from '@/utils/cache'

// 可以实现不同实例的封装
export default new YJRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 30000,
  interceptors: {
    requestInterceptor: (config) => {
      const token = LocalCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }

      return config
    },
    requestInterceptorCatch: (error) => {
      return error
    },
    responseInterceptor: (config) => {
      return config
    },
    responseInterceptorCatch: (error) => {
      return error
    }
  }
})
