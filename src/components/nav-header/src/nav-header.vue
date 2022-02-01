<template>
  <div class="nav-header">
    <i
      class="header-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <YJBreadcrumb :breadcrumb="breadcrumbs" />
      <el-dropdown trigger="click">
        <span
          class="el-dropdown-link"
          style="outline: none; vertical-align: middle; cursor: pointer"
        >
          <el-avatar
            size="small"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
          <span style="vertical-align: top; padding-left: 10px">{{
            name
          }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logoutHandle">退出登录</el-dropdown-item>
            <el-dropdown-item divided>用户信息</el-dropdown-item>
            <el-dropdown-item>系统管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import YJBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import LocalCache from '@/utils/cache'

export default defineComponent({
  components: {
    YJBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const store = useStore()
    const router = useRouter()
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const name = store.state.login.userInfo.name
    // 放到计算属性中进行,只要路由变化,就会响应式的进行变化
    const breadcrumbs = computed(() => {
      const userMenus = computed(() => store.state.login.userMenus)
      const currentPath = router.currentRoute.value.fullPath
      return pathMapBreadcrumbs(userMenus.value, currentPath)
    })

    const logoutHandle = () => {
      LocalCache.deleteCache('token')
      router.push('/main')
    }

    return {
      isFold,
      handleFoldClick,
      name,
      breadcrumbs,
      logoutHandle
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  overflow: hidden;
  .header-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
