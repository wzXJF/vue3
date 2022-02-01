import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        // 记录第一个菜单
        if (!firstMenu) firstMenu = menu
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}

// 返回当前路径url所对应的nav-menu的default-active
export function patchMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = patchMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name, path: menu.url })
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 返回面包屑的数据
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  patchMapToMenu(userMenus, currentPath, breadcrumbs)

  return breadcrumbs
}

// export function getCurrentMenuIndex(
//   userMenus: any[],
//   currentPath: string
// ): string {
//   let endPathIndex = ''
//   const _recureGetCurrentMenu = (menus: any[]) => {
//     for (const menu of menus) {
//       if (menu.url == currentPath) {
//         endPathIndex = menu.id
//         return
//       } else if (menu.children) {
//         _recureGetCurrentMenu(menu.children)
//       }
//     }
//   }

//   _recureGetCurrentMenu(userMenus)
//   return endPathIndex + ''
// }

export function mapMenuToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recureGetCurrenPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recureGetCurrenPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }

  _recureGetCurrenPermission(userMenus)

  return permissions
}

export function getMenuLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []

  const _recureGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recureGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }

  _recureGetLeaf(menuList)

  return leafKeys
}

export { firstMenu }
