var express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const User = mongoose.model('User')
const { mailer } = require('../helpers/mailer')

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports.register = (req, res) => {

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

module.exports.login = (req, res) => {

    const { email, password } = req.body

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(400).send({ error: 'error' })
        }
        if (!user) {
            return res.status(401).send({ error: `${email} não cadastrado!` })
        }

        user.comparePassword(password, user.password, (err, isMatch) => {
            if (err) { return res.status(400).send(err) }
            if (isMatch) {
                return res.send({
                    token: generateToken({ _id: user._id })
                })
            }
            return res.status(200).send({
                ok: false,
                error: 'Email ou senha inválidos!'
            })
        })
    })
}

module.exports.forgotPassword = (req, res) => {

    const { email } = req.body

    User.findOne({ email: email }, (err, user) => {

        if (!user) {
            return res.status(404).send({ error: 'Email não encontrado.' })
        }

        let token = generateToken({ _id: user._id })

        mailer().send(user.email, 'App - Redefinição de senha', `Acesse esse <a href="https://nos.com.br/admin/#/recuperar-senha/${token}">Link</a> para recuperar sua senha.`)

        //TODO: Aguardar resposta do envio de email
        return res.status(200).send({ token: 'ok' })
    })
}

module.exports.testeMiddleware = (req, res) => {

    console.log('CUCUCUC');
}

