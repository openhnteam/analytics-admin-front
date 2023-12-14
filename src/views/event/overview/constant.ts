export const EVENT_OVERVIEW_COLUMNS = [
  {
    title: '事件KEY',
    dataIndex: 'eventId',
    key: 'eventId'
  },
  {
    title: '事件名称',
    dataIndex: 'eventName',
    key: 'eventName'
  },
  {
    title: '事件描述',
    dataIndex: 'eventDes',
    key: 'eventDes'
  },
  {
    title: '独立用户数',
    dataIndex: 'uv',
    key: 'back',
    slots: { customRender: 'uv' }
  },
  {
    title: '消息总数',
    dataIndex: 'pv',
    key: 'back',
    slots: { customRender: 'pv' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    slots: { customRender: 'operation' }
  }
]

export const CALCULATING_EVENT = [
  {
    title: '事件ID',
    dataIndex: 'eventId',
    key: 'eventId'
  },
  {
    title: '显示名称',
    dataIndex: 'eventName',
    key: 'eventName'
  },
  {
    title: '是否有数据上报',
    dataIndex: 'active',
    key: 'active',
    slots: { customRender: 'active' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    slots: { customRender: 'operation' }
  }
]

export const PAUSE_EVENT = [
  {
    title: '事件ID',
    dataIndex: 'eventId',
    key: 'eventId'
  },
  {
    title: '显示名称',
    dataIndex: 'eventName',
    key: 'eventName'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    slots: { customRender: 'operation' }
  }
]

export const UNREGISTERED_EVENT = [
  {
    title: '事件ID',
    dataIndex: 'eventId',
    key: 'eventId'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    slots: { customRender: 'operation' }
  }
]

export const MANAGEMENT_EDIT_COLUMNS = [
  {
    title: '参数ID',
    dataIndex: 'segId',
    key: 'segId'
  },
  {
    title: '参数名称',
    dataIndex: 'segName',
    key: 'segName',
    slots: { customRender: 'segName' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    slots: { customRender: 'operation' }
  }
]
