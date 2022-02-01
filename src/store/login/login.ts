import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootStore } from '../types'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'

// <S, R>: S模块中state的类型  R->根store中的state的类型
const loginModule: Module<ILoginState, IRootStore> = {
  namespaced: true,
  state() {
    return {
      token:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNvZGVyd2h5Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCJ9LCJpYXQiOjE2NDM3MjU5MTUsImV4cCI6MTY0NjMxNzkxNX0.hGIJuYif92G4u3YtYXWyOnOfPMmhnZWZcsdoXlt4ycJbcn5LI9Si8013A5UrgrUc5eO8cLsHs92qfmuCRr52r1DDe5ZYBSUUaf9LopPbVaScmnOw3Dna9LpIoOtSzRZtbXutqC7Ykps6Df97gSPnSwOu7XJgHhrwBE3HNvn9Y8o',
      userInfo: {
        id: 1,
        name: 'coderwhy',
        realname: 'coderwhy',
        cellphone: 18812345678,
        enable: 1,
        createAt: '2021-01-02T10:20:26.000Z',
        updateAt: '2021-01-03T04:50:13.000Z',
        role: {
          id: 1,
          name: '超级管理员',
          intro: '所有权限',
          createAt: '2021-01-02T10:01:52.000Z',
          updateAt: '2021-01-02T10:01:52.000Z'
        },
        department: {
          id: 1,
          name: '总裁办',
          parentId: null,
          createAt: '2021-01-02T10:03:09.000Z',
          updateAt: '2021-01-05T08:25:46.000Z',
          leader: 'coderwhy'
        }
      },
      userMenus: [],
      permissions: [
        'system:goods:create',
        'system:goods:delete',
        'system:goods:update',
        'system:goods:query'
      ]
    }
  },
  mutations: {
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 映射该账号下所有路由，动态添加到router的main下面
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    // 只要是刷新后就从本地缓存中读取信息存入到vuex中
    loadLocalLogin({ commit, dispatch }) {
      commit('changeUserMenus', [
        {
          id: 9,
          name: '商品中心',
          type: 1,
          url: '/main/product',
          icon: 'el-icon-goods',
          sort: 3,
          children: [
            {
              id: 16,
              url: '/main/product/goods',
              name: '商品信息',
              sort: 105,
              type: 2,
              children: [
                {
                  id: 34,
                  url: null,
                  name: '创建商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:create'
                },
                {
                  id: 35,
                  url: null,
                  name: '删除商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:delete'
                },
                {
                  id: 36,
                  url: null,
                  name: '修改商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:update'
                },
                {
                  id: 37,
                  url: null,
                  name: '查询商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:query'
                }
              ],
              parentId: 9
            }
          ]
        }
      ])
    },
    accountLoginAction({ commit, dispatch }) {
      // 更新路由
      commit('changeUserMenus', [
        {
          id: 9,
          name: '商品中心',
          type: 1,
          url: '/main/product',
          icon: 'el-icon-goods',
          sort: 3,
          children: [
            {
              id: 16,
              url: '/main/product/goods',
              name: '商品信息',
              sort: 105,
              type: 2,
              children: [
                {
                  id: 34,
                  url: null,
                  name: '创建商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:create'
                },
                {
                  id: 35,
                  url: null,
                  name: '删除商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:delete'
                },
                {
                  id: 36,
                  url: null,
                  name: '修改商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:update'
                },
                {
                  id: 37,
                  url: null,
                  name: '查询商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:query'
                }
              ],
              parentId: 9
            }
          ]
        }
      ])
      router.replace('/main')
    }
  },
  getters: {}
}

export default loginModule
