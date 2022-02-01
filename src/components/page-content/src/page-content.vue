<template>
  <div class="page-content">
    <YJTable
      :tableData="dataList"
      :dataCount="dataCount"
      v-model:page="pageInfo"
      v-bind="contentTableConfig"
    >
      <!-- table的表头显示 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
          >{{ title }}</el-button
        >
      </template>
      <!-- table内容的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        {{ $filters.formattime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formattime(scope.row.updateAt) }}
      </template>
      <template #handle="scope">
        <el-button
          v-if="isUpdate"
          class="textBtn"
          plain
          size="mini"
          type="text"
          icon="el-icon-edit"
          @click="handleEditClick(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="isDelete"
          class="textBtn"
          plain
          size="mini"
          type="text"
          icon="el-icon-delete"
          @click="deleteHandle(scope.row)"
        >
          <span>删除</span>
        </el-button>
      </template>
      <!-- 在page-content中动态插入剩余插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- #[item.slotName]="scope"  就相当于 #image="scope" -->
        <!-- 只有当存在slotName属性的时候才创建动态插槽 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </YJTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'

import YJTable from '@/base-ui/YJTable'
import { usePermission } from '@/hooks/usePermission'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: '新增'
    }
  },
  components: {
    YJTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => {
      getPageData()
    })

    // 获取所有的按钮权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName, //'/users/list'
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    const dataCount = computed(() =>
      store.getters['system/pageCountData'](props.pageName)
    )
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )

    // 获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig.propList.filter(
      (item: any) => {
        if (
          item.slotName !== 'status' &&
          item.slotName !== 'createAt' &&
          item.slotName !== 'updateAt' &&
          item.slotName !== 'handle'
        )
          return true
      }
    )

    // 删除操作
    const deleteHandle = (row: any) => {
      ElMessageBox.confirm('您确定要删除此记录吗. 确认?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('system/deletePageItemAction', {
          pageName: props.pageName,
          id: row.id
        })
      })
    }

    // 新增操作
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,
      deleteHandle,
      handleEditClick,
      handleNewClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.textBtn {
  border: none;
  &:hover {
    background-color: transparent;
  }
}
</style>
