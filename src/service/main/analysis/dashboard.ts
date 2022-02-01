import YJService from '@/service'
import { IResult } from '../../types'

enum DashboardAPI {
  categoryGoodsCount = 'goods/category/count',
  categoryGoodsSale = 'goods/category/sale',
  categoryGoodsFavor = 'goods/category/favor',
  addressGoodsSale = 'goods/address/sale'
}

export function getCategoryGoodsCount() {
  return YJService.request<IResult>({
    method: 'get',
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return YJService.request<IResult>({
    method: 'get',
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return YJService.request<IResult>({
    method: 'get',
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return YJService.request<IResult>({
    method: 'get',
    url: DashboardAPI.addressGoodsSale
  })
}
