<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" v-model="activeName" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <acount-login ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <phone-login ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="remPW">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login" type="primary" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AcountLogin from './acount-login.vue'
import PhoneLogin from './phone-login.vue'
import LocalCache from '@/utils/cache'

export default defineComponent({
  components: {
    AcountLogin,
    PhoneLogin
  },
  setup() {
    const activeName = ref('account')
    let isKeepPW: boolean = LocalCache.getCache('isKeepPW')
    const remPW = ref(isKeepPW)
    // AcountLogin 是一个组件描述对象，组件是描述创建出来的组件实例
    // InstanceType 可以帮助我们从一个描述对象类型拿到其构造函数的  其最后结果是拿到描述对象实例的类型
    console.log(AcountLogin)

    const accountRef = ref<InstanceType<typeof AcountLogin>>() // 拿到组件实例的类型
    const phoneRef = ref<InstanceType<typeof PhoneLogin>>()
    function handleLoginClick() {
      if (activeName.value == 'account') {
        accountRef.value?.loginAction(remPW.value) // 因为没有赋值的话，accountRef.value 有可能为空，所以就是可选链，只有不为空的话才去调用
      } else {
        console.log('手机登录')
        phoneRef.value?.loginAction()
      }
    }

    return {
      activeName,
      remPW,
      handleLoginClick,
      accountRef,
      phoneRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
