export const rules = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  verCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      pattern: /^\d{6}$/,
      message: '请输入6位验证码',
      trigger: 'blur'
    }
  ]
}
