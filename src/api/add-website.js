import request from '@/utils/request'

export function addWebsite(form) {
  return request({
    url: '/uAdmin/tb-website/addWebsite',
    method: 'post',
    data: form
  })
}
