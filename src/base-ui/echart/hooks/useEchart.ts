import * as echarts from 'echarts'
import china from '../data/china.json'

export default function (el: HTMLElement) {
  echarts.registerMap('china', china)
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  const updateSize = () => {
    echartInstance.resize()
  }

  // 监听屏幕尺寸的变化，自动更新echarts的宽度
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
