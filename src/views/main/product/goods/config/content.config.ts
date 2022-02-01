export const contentTableConfig = {
  title: '商品列表',
  showIndexColumn: true,
  showSelectColumn: true,
  propList: [
    { prop: 'name', label: '商品名称', 'min-width': '80' },
    { prop: 'oldPrice', label: '原价格', 'min-width': '80' },
    { prop: 'newPrice', label: '现价', 'min-width': '80' },
    {
      prop: 'imgUrl',
      label: '商品图片',
      slotName: 'image',
      'min-width': '100'
    },
    { prop: 'status', label: '状态', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      slotName: 'createAt',
      'min-width': '200'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      slotName: 'updateAt',
      'min-width': '200'
    },
    { label: '操作', slotName: 'handle' }
  ]
}
