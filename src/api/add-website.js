import request from '@/utils/request'

export function addWebsite(form) {
  return request({
    url: '/admin-api/uAdmin/tb-website/addWebsite',
    method: 'post',
    data: form
  })
}
