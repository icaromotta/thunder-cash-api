var express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const User = mongoose.model('User')

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports.register = function (req, res) {

    User.findOne({ email: req.body.email }, (err, user) => {

        if (user) {
            return res.status(406).send({ error: 'Este e-mail já está em uso. Tente outro.' })
        }
                
        User.create(req.body, (err, user) => {

            let readyAuth = {
                email: user.email,
                token: generateToken({ _id: user._id })
            }

            return res.status(200).send(readyAuth)
        })
    })
}

module.exports.testeMiddleware = (req, res) => {

    console.log('CUCUCUC');
}

