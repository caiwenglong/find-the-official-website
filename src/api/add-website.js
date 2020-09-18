import request from '@/utils/request'

export function addWebsite(form) {
  return request({
    url: '/admin-api/uAdmin/tb-website/addWebsite',
    method: 'post',
    data: form
  })
}

export function batchAddWebsite(file) {
  return request({
    url: '/admin-api/uAdmin/tb-website/batchAddWebsite',
    method: 'post',
    data: file
  })
}

export function getWbCategories() {
  return request({
    url: '/admin-api/uAdmin/wb-category/getAllWbCategory',
    method: 'get'
  })
}
