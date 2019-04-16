var express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

const User = mongoose.model('User')

var router = express.Router()

// TODO: mover para fora do arquivo atual
// TODO: o tempo de expiração para o token de recuperação de senha precisa ser de menos tempo
const generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

router.post('/register', (req, res) => {

  User.create(req.body, (err, user) => {

    let readyAuth = {
      email: user.email,
      token: generateToken({ _id: user._id })
    }

    return res.status(200).send(readyAuth)
  })
})

module.exports = router;
