const Joi = require('joi')

const registerSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).max(30).required(),
})

const loginSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).max(30).required(),
})

module.exports = {
    '/register': registerSchema,
    '/login': loginSchema
}