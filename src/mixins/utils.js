import { getStore } from 'wepy-redux'
import {getDeliveryConfig, getVipInfo} from '../normalrequest'

export const calculate = async (flag = false) => {
  let cart = getStore().getState().shoppingcart.shopping_cart || {}
  let fee = 0
  let totalAmount = 0
  let isVip = false
  if (flag) {
    let res = await getDeliveryConfig()
    isVip = res.is_vip
    if (res.success) {
      if (!res.is_vip || !!!res.data.is_free_for_vip) {
        fee = res.data.fee
      }
    }
  }

  for (let i in cart) {
    let product = cart[i]

    if (product.selected) {
      totalAmount += isVip ? product.discount_price * product.count : product.price * product.count
    }
  }

  return {
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    deliveryFee: fee,
    isVip: isVip
  }
}
