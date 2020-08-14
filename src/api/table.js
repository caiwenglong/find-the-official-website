import request from '@/utils/request'

export function getList(params) {
  return request({
    url: `/admin-api/uAdmin/tb-website/selectAllWebsite/` + params,
    method: 'get'
  })
}
