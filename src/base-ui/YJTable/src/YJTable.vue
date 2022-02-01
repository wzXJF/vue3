<template>
  <div class="yj-table">
    <div class="header">
      <span class="title">{{ title }}</span>
      <div class="handle">
        <slot name="headerHandler"></slot>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        align="center"
        width="80"
        label="序号"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!-- 这个是嵌套插槽，然后通过数据动态的设置具名插槽，有默认值，
            如果外面想自己设置或者对数据做处理的话，可以通过这个插槽处理，同时
            把数据传递出去，在外面就可以访问到当前的数据
            -->
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'yj-table',
  props: {
    propList: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    dataCount: {
      type: Number,
      default: 0
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    // 昨天的select框选择的回调
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    // 分页器中的currentPage和pageSize的改变后的回调
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage: currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize: pageSize })
    }

    return { handleSelectionChange, handleCurrentChange, handleSizeChange }
  }
})
</script>

<style scoped lang="less">
.yj-table {
  width: 100%;
  .header {
    display: flex;
    height: 45px;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    .handle {
      align-items: center;
    }
  }
  .footer {
    text-align: right;
    padding: 10px 0;
  }
}
</style>
