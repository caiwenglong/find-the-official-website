import request from '@/utils/request'

export function addWebsite(form) {
  return request({
    url: '/website/add',
    method: 'post',
    data: form
  })
}
