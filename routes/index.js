const router = require('express').Router()
const authRoutes = require('./auth')
const path = require('path')

router.get('/health', (req, res) => {
  res.json({ status: 'alive' })
})

router.use('/auth', authRoutes)

router.use('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
)

module.exports = router
