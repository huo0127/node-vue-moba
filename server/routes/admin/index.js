module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true,
  })

  // 創建資源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 更新資源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 刪除資源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true,
    })
  })

  // 資源列表
  router.get(
    '/',
    async (req, res, next) => {
      const token = String(req.headers.authorization || '')
        .split(' ')
        .pop()
      assert(token, 401, '請先登入')
      const { id } = jwt.verify(token, app.get('secret'))
      assert(id, 401, '請先登入')
      req.user = await AdminUser.findById(id)
      assert(req.user, 401, '請先登入')
      await next()
    },
    async (req, res) => {
      console.log(req.user)
      const queryOptions = {}
      if (req.Model.modelName === 'Category') {
        queryOptions.populate = 'parent'
      }
      const items = await req.Model.find().setOptions(queryOptions).limit(381)
      res.send(items)
    }
  )

  // 資源詳情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use(
    '/admin/api/rest/:resource',
    async (req, res, next) => {
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../../models/${modelName}`)
      next()
    },
    router
  )

  // 上傳
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登入
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根據用戶名找用戶
    const user = await AdminUser.findOne({
      username,
    }).select('+password')
    assert(user, 422, '用戶不存在')

    // 2.校驗密碼
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密碼錯誤')

    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    return res.send({ token })
  })

  // 錯誤處理函數
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    })
  })
}
