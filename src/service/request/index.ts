import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { YJRequstConfig, YJRequstInterceptors } from './type'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

class YJRequst {
  instance: AxiosInstance
  interceptors?: YJRequstInterceptors
  loadingInstance?: ILoadingInstance //引用loading类型

  constructor(config: YJRequstConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器：请求成功拦截')
        this.loadingInstance = ElLoading.service({
          lock: true,
          text: '正在加载数据...',
          background: 'rgba(0,0,0,0.5)'
        })
        return config
      },
      (error) => {
        // console.log('所有的实例都有的拦截器：请求失败拦截')
        return error
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器：响应成功拦截')
        this.loadingInstance?.close()
        return res.data
      },
      (error) => {
        // console.log('所有的实例都有的拦截器：响应失败拦截')
        this.loadingInstance?.close()
        return error
      }
    )
  }

  request<T>(config: YJRequstConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果外面传入 requestInterceptor 的话，就帮助执行一下
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果config里面传入了 responseInterceptor 的话，就调用处理一下res，然后返回
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default YJRequst
