<template>
  <div class="page-search">
    <YJForm v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="search">
          <el-button
            size="medium"
            icon="el-icon-refresh"
            @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            size="medium"
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </YJForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import YJForm from '@/base-ui/form'

export default defineComponent({
  components: {
    YJForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    // 双向绑定的属性元素是由配置的field来决定的
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 重置操作
    const handleResetClick = () => {
      // formData.value = formOriginData 这块直接赋值一个对象的话，内部是不会改变的, 可以使用fom1的那种方式
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }
    // 筛选操作
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.search {
  text-align: right;
  padding: 0 20px 20px 0;
}
</style>
