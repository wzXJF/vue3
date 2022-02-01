import YJService from '@/service'
import { IAccount, ILoginResult } from './types'
import { IResult } from '../types'

enum LoginAPI {
  AccountLogin = 'login',
  LoginUserInfo = 'users/',
  UserMenus = 'role/' // role/{id}/menu
}

export function accountLoginRequest(
  account: IAccount
): Promise<IResult<ILoginResult>> {
  return YJService.request<IResult<ILoginResult>>({
    method: 'post',
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number): Promise<IResult> {
  return YJService.request<IResult>({
    method: 'get',
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestRoleMenusById(id: number): Promise<IResult> {
  return YJService.request<IResult>({
    method: 'get',
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
