import request from '@/plugin/axios'

export function GetKey () {
  return request({
    url: '/administrator/secret/detail/',
    method: 'get',
    params: {
      fWho: 'anglerfishman'
    }
  })
}
