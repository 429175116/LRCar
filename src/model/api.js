import wepy from 'wepy'
import {getStore} from 'wepy-redux'
import settings from './setting'
// import { LOGIN } from '../store/types/index'

const base = settings.host
const store = getStore()
const endpoints = {
  'login': '/login',
  'productsList': '/productsList',
  'productsDetail': '/productsDetail/{1}'
}
const request = (method, url, params) => {
  // wepy.showLoading()

  let headers = {
    'Content-Type': 'application/json'
  }

  // const token = store.getState().login.login_info.access_token
  // if (token) {
  //   headers['Authorization'] = token
  // }

  return new Promise((resolve, reject) => {
    wepy.request({
      url: url,
      method: method.toUpperCase(),
      data: params,
      header: headers,
      dataType: 'json',
      success(data) {
        let token = data.header.Authorization
        if (token) {
          store.getState().login.login_info.access_token = token
        }

        if (data.hasOwnProperty('statusCode')) {
          if (data.statusCode === 200) {
            resolve(data.data)
          }
        }
      },
      fail(data) {
        reject(data)
      }
    })
  })
}

class Api {
  constructor (base, endPoints) {
    this.base = base
    this.endpoints = endPoints
  }

  url (endpointName, ...args) {
    let endpoint = this.endpoints[endpointName]
    if (!endpoint) {
      throw Error('endpoint not foud!')
    }
    if (args.length > 0) {
      let i = 0
      let arg
      while ((arg = args.shift())) {
        i++
        endpoint = endpoint.replace('{' + i + '}', arg)
      }
    }
    return this.base + endpoint
  }

  get (url, params) {
    return request('get', url, params)
  }

  post (url, params) {
    return request('post', url, params)
  }

  patch (url, params) {
    return request('patch', url, params)
  }

  delete (url, params) {
    return request('delete', url, params)
  }

  put (url, params) {
    return request('put', url, params)
  }
}

export default new Api(base, endpoints)
