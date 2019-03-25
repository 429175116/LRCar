import api from '../../model/api'

export const productsList = () => {
  api.get(api.url('productsList')).then((ret) => {
    console.log('12313')
  })
  // return api.get(api.url('productsList'))
}

export const getOneProduct = (params) => {
  return api.get(api.url('productsDetail', params.id))
}
