<!-- 此版本是不使用双向绑定的方式实现动态的修改form组件中的属性 -->
<template>
  <div class="yj-form">
    <slot name="header"></slot>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="itemStyle">
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeValue($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeValue($event, item.field)"
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
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeValue($event, item.field)"
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
import { defineComponent, PropType } from 'vue'
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
    const changeValue = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return { changeValue }
  }
})
</script>

<style scoped lang="less">
.yj-form {
  padding: 20px 20px 0 0;
}
</style>
