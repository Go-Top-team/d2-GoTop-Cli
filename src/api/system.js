import request from '@/plugin/axios'
import { getToken } from '@/libs/info.js'

export function OssToken () {
  var token = getToken()
  return request({
    url: '/main/ststoken/detail/',
    method: 'get',
    params: {
      token: token
    }
  })
}
