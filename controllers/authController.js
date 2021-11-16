const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/user')

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body

      if (!email || !password)
        return res
          .status(400)
          .json({ message: 'Please provide email and password' })
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (reg.test(email) === false)
        return res.status(400).json({ message: 'Incorrect email format' })
      if (password.length < 6)
        return res
          .status(400)
          .json({ message: 'Password must be at least 6 characters long' })

      const newUser = new User({
        email,
        password,
      })

      const user = await User.findOne({ email })
      if (user)
        return res
          .status(400)
          .json({ message: 'Email already registered. Please Login' })

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err
          newUser.password = hash
          const user = await newUser.save()
          jwt.sign(
            { userId: user.id },
            config.jwtSecret,
            { expiresIn: 60 * 60 },
            (err, token) => {
              if (err) throw err
              res.json({
                token,
                email,
              })
            }
          )
        })
      })
    } catch (err) {
      throw err
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body

      if (!email || !password)
        return res
          .status(400)
          .json({ message: 'Please enter enter email and password' })
      const user = await User.findOne({ email })
      if (!user)
        return res
          .status(400)
          .json({ message: 'Email not found. Please register' })
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err
        const match = result
        if (!match)
          return res.status(401).json({ message: 'Incorrect Password' })
        jwt.sign(
          { userId: user.id },
          config.jwtSecret,
          { expiresIn: 60 * 60 },
          (err, token) => {
            if (err) throw err
            res.json({
              token,
              email,
            })
          }
        )
      })
    } catch (err) {
      console.log(err)
    }
  },
  async getUser(req, res) {
    try {
      const user = await User.findById(req.userId).select('-password')
      res.json(user)
    } catch (err) {
      throw err
    }
  },
}
