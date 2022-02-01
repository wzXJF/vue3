/* eslint-disable */
// 对 .vue 文件进行声明，同时声明模块中导出了类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $store: any
declare module '*.json'
