import { ref } from 'vue'
import pageModel from '@/components/page-model'

type CallbackFn = (item?: any) => void

export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModelRef = ref<InstanceType<typeof pageModel>>()
  const defaultInfo = ref({})
  const newBtnClick = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const editBtnClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }

  return {
    pageModelRef,
    newBtnClick,
    editBtnClick,
    defaultInfo
  }
}
