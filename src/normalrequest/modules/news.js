import api from '../../model/api'

export const getNews = () => {
  return api.get(api.url('newslist'))
}

export const getOneNews = (params) => {
  return api.get(api.url('news', params.id))
}
