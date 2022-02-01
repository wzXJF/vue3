<template>
  <div class="yj-form">
    <slot name="header"></slot>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.label"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      // 非基本数据类型的默认值，必须用箭头函数（数组、对象）
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 修改el-form-item
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 20px' })
    },
    // 修改col的span尺寸，不传为默认值
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 实现真正的双向绑定, 然后获取到的数据,结构后就不是响应式的,然后再包装成ref,当组件中的绑定元素变化后,再调用update:model手动去更新
    const formData = ref({ ...props.modelValue })

    // 重置操作，会产生循环引用
    // watch(
    //   () => props.modelValue,
    //   (newValue) => {
    //     formData.value = { ...newValue }
    //   }
    // )
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    return { formData }
  }
})
</script>

<style scoped lang="less">
.yj-form {
  padding: 20px 20px 0 0;
}
</style>
