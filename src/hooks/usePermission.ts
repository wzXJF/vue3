import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions

  const verifyPermisson = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item === verifyPermisson) // !! 相当于是一个转换成bool值的一种方式
}
