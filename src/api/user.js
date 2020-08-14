import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user-api/uCenter/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user-api/uCenter/getInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user-api/vue-admin-template/user/logout',
    method: 'post'
  })
}
