'use strict'

const developer = {
  hyt: 'http://192.168.0.113:8000', // 何远涛
}

const current = developer.hyt

export default {
  open: true,
  host: '0.0.0.0',
  port: 2333,
  proxy: {
    // 匹配代理的url标识, 请求到'/proxy_api'下的请求都会被代理到target地址中
    '/admin': {
      target: current, // api地址
      secure: false, // 接受运行在https上的服务
      pathRewrite: { '^/admin': '' }, // 路径重写，替换代理url标识Q
      changeOrigin: true, // needed for virtual hosted sites
      ws: false // proxy websockets
    }
  },
  before(app) {
    app.get(/^((?!hot-update).)*.(js)$/, (req, res, next) => {
      if (process.env.IS_OPEN_GZIP === 'open') {
        req.url = req.url + '.gz'
        res.set('Content-Encoding', 'gzip')
        res.set('Content-Type', 'application/javascript')
      }
      next()
    })
  }
}
