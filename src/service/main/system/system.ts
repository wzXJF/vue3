import YJService from '@/service'
import { IResult } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return YJService.request<IResult>({
    method: 'post',
    url: url,
    data: queryInfo
  })
}

export function deletePageItem(url: string) {
  return YJService.request<IResult>({
    method: 'delete',
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return YJService.request<IResult>({
    method: 'post',
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return YJService.request<IResult>({
    method: 'patch',
    url: url,
    data: editData
  })
}
