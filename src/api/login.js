
import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    // url: '/administrator/user/login/',
    url: 'https://easy-mock.com/mock/5cb43f25879bdf35747b40ff/example/login',
    method: 'post',
    params: {
      fName: data.username,
      fPassword: data.password
    }
  })
}
