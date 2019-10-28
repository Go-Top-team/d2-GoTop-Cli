import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function GetData () {
  return request({
    url: 'index',
    method: 'get'
  })
}

export function GetNum () {
  return request({
    url: 'getNum',
    method: 'get'
  })
}

export function GetCheck () {
  return request({
    url: 'getcheck',
    method: 'get'
  })
}

export function GetPage (page) {
  return request({
    url: 'getpage',
    method: 'get',
    params: {
      page: page
    }
  })
}

export function UpStatus (id, Check) {
  return request({
    url: 'upStatus',
    method: 'post',
    params: {
      fId: id,
      fIsCheck: Check
    }
  })
}
