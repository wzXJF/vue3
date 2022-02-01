import { ref } from 'vue'
import type { Ref } from 'vue'

interface VerCode {
  isClick: Ref<boolean>
  btnText: Ref<string>
  getCode: () => void
}

export default function useVerCode(): VerCode {
  const isClick = ref(true)
  const btnText = ref('获取验证码')
  let count = 60
  function getCode() {
    isClick.value = true
    const timer = setInterval(() => {
      count -= 1
      if (count == 0) {
        clearInterval(timer)
        isClick.value = false
      }
      btnText.value = count == 0 ? '获取验证码' : '(' + count + ') 秒'
    }, 1000)
  }

  return {
    isClick,
    btnText,
    getCode
  }
}
