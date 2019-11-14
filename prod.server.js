const express = require('express')

const app = express()

const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings
// 通过express的路由对接口进行代理
const router = express.Router()

router.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

router.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})

router.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use('/api', router)
// 代理静态资源
app.use(express.static('./dist'))

const port = process.env.PORT || 9001

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
