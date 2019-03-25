import api from '../../model/api'

export const storeCart = (params) => {
  let shops = []

  for (let i in params) {
    let product = params[i]
    shops.push({id: i, count: product.count})
  }

  if (shops.length > 0) {
    return api.put(api.url('cart'), {cart: shops})
  }
}
export const getShipment = (params) => {
  return api.get(api.url('cart'), params)
}
