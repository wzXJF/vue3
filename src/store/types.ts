import { ILoginState } from './login/types'

export interface IRootStore {
  entireDepartment: []
  entireRole: []
  entireMenu: []
}

export interface IRootWithModule {
  login: ILoginState
}

// 交叉类型或者类型
export type IStoreType = IRootStore & IRootWithModule
