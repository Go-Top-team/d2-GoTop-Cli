const userDB = [
  { username: 'admin', password: 'admin', uuid: 'admin-uuid', name: '管理员' },
  { username: 'editor', password: 'editor', uuid: 'editor-uuid', name: '编辑' },
  { username: 'user1', password: 'user1', uuid: 'user1-uuid', name: '用户1' },
  { username: 'jjf', password: '123', uuid: 'jjf-uuid', name: '纪俊锋' }
]

const IndexDB = [
  { usernum: '20318', title: '今日顶峰' },
  { usernum: '5844', title: '当前人数' }
]

const NumDB = [
  { num: '50', title: '今日新增客户数' },
  { num: '5', title: '今日消费用户数' }
]

const checkDB = [
  { fId: '1', fTitle: '今日收获，一条大魔鬼鱼', fImg: 'https://images.unsplash.com/photo-1516894039413-0ee3187dbd9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80', fContent: '3米多的鱼,真他娘的大', fIsCheck: 0, fStatus: '通过' },
  { fId: '2', fTitle: '明天有一起跑步的吗？', fImg: 'https://images.unsplash.com/photo-1516894039413-0ee3187dbd9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80', fContent: '明天台湾海峡吗？我出船', fIsCheck: 1, fStatus: '下架' },
  { fId: '4', fTitle: '来看我抽铁板', fImg: 'https://images.unsplash.com/photo-1516894039413-0ee3187dbd9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80', fContent: '你们看抽铁板多帅', fIsCheck: 0, fStatus: '通过' }
]

const Page = [{ PageSize: 1, PageTotal: 100 }]

export default [
  {
    path: '/api/login',
    method: 'post',
    handle ({ body }) {
      const user = userDB.find(e => e.username === body.username && e.password === body.password)
      if (user) {
        return {
          code: 0,
          msg: '登录成功',
          data: {
            ...user,
            token: '8dfhassad0asdjwoeiruty'
          }
        }
      } else {
        return {
          code: 401,
          msg: '用户名或密码错误',
          data: {}
        }
      }
    }
  },
  {
    path: '/api/index',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: '获取成功',
        data: {
          data: IndexDB
        }
      }
    }
  },
  {
    path: '/api/getNum',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: '获取成功',
        data: {
          data: NumDB
        }
      }
    }
  },
  {
    path: '/api/getcheck',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: '获取成功',
        data: {
          data: checkDB
        }
      }
    }
  },
  {
    path: '/api/getpage',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: '获取成功',
        data: {
          data: Page
        }
      }
    }
  },
  {
    path: '/api/upStatus',
    method: 'post',
    handle ({ body }) {
      return {
        code: 0,
        msg: '修改成功',
        data: {
          code: 0
        }
      }
    }
  }
]
