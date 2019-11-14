import axios from 'ts-axios-new'

const urlMap = {
  development: '/',
  // 服务器生产地址
  production: 'http://localhost:9001/'
  // production: 'http://49.232.154.92:9001/'
  // nginx转发的请求接口地址
  // production: 'http://ustbhuangyi.com/sell/'
}
const baseUrl = urlMap[process.env.NODE_ENV]
const ERR_OK = 0
// 封装 axios 用函数柯里化的方法将参数提前固化在内部
export function get(url) {
  return function(params = {}) {
    // 返回的是promise
    return axios.get(baseUrl + url, {
      params
    }).then((res) => {
      const {errno, data} = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch((e) => {
    })
  }
}
