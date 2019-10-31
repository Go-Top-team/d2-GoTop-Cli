
import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    // url: 'https://easy-mock.com/mock/5cb43f25879bdf35747b40ff/example/login',
    url: 'http://rest.apizza.net/mock/e9a897627b2b8d92c4acd87a88012dcd/logint',
    method: 'post',
    params: {
      fName: data.username,
      fPassword: data.password
    }
  })
}
