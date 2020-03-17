const Joi = require('joi')

const registerSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).max(30).required(),
})

const loginSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).max(30).required(),
})

const passwordSchema = Joi.object().keys({
    password: Joi.string().min(6).max(30).required(),
})

const profileShema = Joi.object().keys({
    name: Joi.string().min(3).max(100).required(),
    cpf: Joi.string().alphanum().min(11).max(11).required(),
    email: Joi.string().min(3).max(100).required()
})

module.exports = {
    '/register': registerSchema,
    '/login': loginSchema,
    '/reset-password': passwordSchema,
    '/voluntary-profile': profileShema
}