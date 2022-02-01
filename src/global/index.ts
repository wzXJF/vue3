import type { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  // registerElement(app)
  // 注册element-plus的组件引入
  app.use(registerElement)
  app.use(registerProperties)
}
