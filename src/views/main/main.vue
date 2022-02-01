<template>
  <div class="main">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <NavMenu :collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <NavHeader @foldChange="handerFoldChange" />
        </el-header>
        <el-main>
          <div class="page">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

export default defineComponent({
  setup() {
    const isCollapse = ref(false)

    const handerFoldChange = (isFold: boolean) => {
      console.log(isFold)
      isCollapse.value = isFold
    }
    return { handerFoldChange, isCollapse }
  },
  components: {
    NavMenu,
    NavHeader
  }
})
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
    height: 48px !important;
  }
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }
  .page {
    background-color: #fff;
    border-radius: 5px;
  }
}
</style>
