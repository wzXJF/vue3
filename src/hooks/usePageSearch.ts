import { ref } from 'vue'
import pageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()

  const resetBtnClick = () => {
    pageContentRef.value?.getPageData()
  }
  const queryBtnClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return {
    pageContentRef,
    resetBtnClick,
    queryBtnClick
  }
}
