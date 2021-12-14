import request from '@/utils/request'

// 添加单个网站
export function addWebsite(form) {
  return request({
    url: '/admin-api/uAdmin/tb-website/addWebsite',
    method: 'post',
    data: form
  })
}
// 添加单个网站
export function getWebsite() {
  return request({
    url: '/user-api//api.php/provide/type/?ac=list',
    method: 'get'
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

export function getAllWebsiteByUserId(params, pageNum, pageSize) {
  return request({
    url: `/admin-api/uAdmin/tb-website/selectAllWebsite/` + params + '/' + pageNum + '/' + pageSize,
    method: 'get'
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

// 通过网站ID删除网站
export function delWebsiteById(id) {
  return request({
    url: `/admin-api/uAdmin/tb-website/delWebsiteById/` + id,
    method: 'delete'
  })
}

// 通过网站ID数组批量删除网站
export function batchDelWebsite(idList) {
  return request({
    url: `/admin-api/uAdmin/tb-website/batchDelWebsite/`,
    method: 'delete',
    data: idList
  })
}

// 获取所有的分类
export function getWbCategories() {
  return request({
    url: '/admin-api/uAdmin/wb-category/getAllWbCategory',
    method: 'get'
  })
}

// 通过分类ID获取分类名称
export function getWbCategoryName(idCategory) {
  return request({
    url: `/admin-api/uAdmin/wb-category/getWbCategory/${idCategory}`,
    method: 'get'
  })
}

export function modifyWebsiteKeywords(websiteId, keywords) {
  return request({
    url: `/admin-api/uAdmin/tb-website/modifyWebsiteKeywords/${websiteId}/${keywords}`,
    method: 'get'
  })
}
