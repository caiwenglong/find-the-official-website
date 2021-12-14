import request from '@/utils/request'

export function apiAddArticle(article) {
  request({
    url: '/article-api/sr-article/add',
    method: 'post',
    data: article
  })
}
