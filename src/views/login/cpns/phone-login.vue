<template>
  <div class="phone-login">
    <el-form label-width="67px" :model="phoneInfo" :rules="rules" ref="formRef">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phoneInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verCode">
        <div class="ver-code">
          <el-input v-model="phoneInfo.verCode"></el-input>
          <el-button
            type="primary"
            :disabled="isClick"
            class="ver-btn"
            @click="getCode"
            >{{ btnText }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { rules } from '../config/phone-config'
import useVerCode from '../hooks/useVerCode'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const phoneInfo = reactive({
      phone: '',
      verCode: ''
    })

    let { isClick, btnText, getCode } = useVerCode()

    // 获取验证码
    watch(
      () => phoneInfo.phone,
      function (newValue) {
        let para = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
        let res = para.test(newValue)
        isClick.value = !res
      }
    )

    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('手机号登录')
          store.dispatch('login/phoneLoginAction', { ...phoneInfo })
        } else {
          return false
        }
      })
    }

    return {
      phoneInfo,
      rules,
      isClick,
      btnText,
      getCode,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped lang="less">
.ver-code {
  display: flex;
  .el-input {
    flex: 1;
  }
  .ver-btn {
    width: 100px;
    margin-left: 5px;
    font-size: 13px !important;
  }
}
</style>
