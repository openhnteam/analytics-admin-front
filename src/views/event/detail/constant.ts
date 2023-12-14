export const EVENT_DETAILS_COLUMNS = [
  {
    title: '参数名称',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '消息数量（占比）',
    dataIndex: 'pvFormat',
    key: 'pvFormat'
  },
  {
    title: '用户（占比）',
    dataIndex: 'uvFormat',
    key: 'uvFormat'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    slots: { customRender: 'operation' }
  }
]
