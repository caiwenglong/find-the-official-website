import request from '@/utils/request'

// 添加单个网站
export function addWebsite(form) {
  return request({
    url: '/admin-api/uAdmin/tb-website/addWebsite',
    method: 'post',
    data: form
  })
}

// 批量添加网站
export function batchAddWebsite(file) {
  return request({
    url: '/admin-api/uAdmin/tb-website/batchAddWebsite',
    method: 'post',
    data: file
  })
}

// 修改网站信息
export function modifyWebsite(form) {
  return request({
    url: '/admin-api/uAdmin/tb-website/modifyWebsite',
    method: 'post',
    data: form
  })
}

// 获取所有的分类
export function getWbCategories() {
  return request({
    url: '/admin-api/uAdmin/wb-category/getAllWbCategory',
    method: 'get'
  })
}
