export interface IAccount {
  name: string
  password: string
}
export interface ILoginResult {
  token: string
  name: string
  id: number
}

//1.第一种方案 json2ts 可以快速转换，然后粘贴过来
//2.第二种方案 直接用any，因为在现实中的项目中返回的数据是很复杂的，如果一个个的转太过复杂
/*
export interface Role {
  id: number
  name: string
  intro: string
  createAt: Date
  updateAt: Date
}
export interface Department {
  id: number
  name: string
  parentId?: any
  createAt: Date
  updateAt: Date
  leader: string
}

export interface IUserInfo {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: Date
  updateAt: Date
  role: Role
  department: Department
}
*/
