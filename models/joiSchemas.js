const Joi = require('joi')
// [POST] Checa e valida os dados de inserção
const registerSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).max(30).required(),
})

module.exports = {
    '/register': registerSchema
}