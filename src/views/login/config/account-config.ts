export const rules = {
  name: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,10}$/,
      message: '用户名必须是5-10个字母或者数字组成',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      // pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
      pattern: /^\d{6}$/,
      message: '密码长度大于6位，由数字和字母组成',
      trigger: 'blur'
    }
  ]
}
