<template>
  <div class="acount-login">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="account.password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import LocalCache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    // 获取store
    const store = useStore()

    const name: string = LocalCache.getCache('name')
    const password: string = LocalCache.getCache('password')

    const account = reactive({
      name: name ?? '',
      password: password ?? ''
    })
    // 获取elform组件实例
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPW: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 是否记录密码
          LocalCache.setCache('isKeepPW', isKeepPW)
          if (isKeepPW) {
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
          } else {
            LocalCache.deleteCache('name')
            LocalCache.deleteCache('password')
          }
          // 发送数据开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        } else {
          return false
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  },
  directives: {
    focus: {
      beforeMount(el: HTMLElement) {
        let firstChild = el.children[0]
        firstChild.removeAttribute('readonly')
        el.focus()
      }
    }
  }
})
</script>

<style scoped></style>
