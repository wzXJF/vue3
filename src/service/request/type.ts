import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface YJRequstInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  // responseInterceptor?: (res: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 拦截器
interface YJRequstConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YJRequstInterceptors<T>
}

export { YJRequstInterceptors, YJRequstConfig }
