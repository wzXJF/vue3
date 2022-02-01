import { App } from 'vue'
import { formatUtcString } from '@/utils/date-format'

// 注册全局属性
export default function (app: App): void {
  app.config.globalProperties.$filters = {
    formattime(dateTime: string) {
      return formatUtcString(dateTime)
    }
  }
}
