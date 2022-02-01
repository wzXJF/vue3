<template>
  <div class="line-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import baseEchart from '@/base-ui/echart'

const props = defineProps<{
  lineData: {
    xData: string[]
    yData: number[]
  }
}>()

const option = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.lineData.xData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.lineData.yData,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
