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
    lastname: Joi.string().min(3).max(100).required(),
    address: Joi.string().min(20).max(250).required(),
    phone: Joi.string().min(9).max(10).required(),
    birthday: Joi.date().required(),
    age: Joi.number().integer().min(1).max(3).required(),
    rg: Joi.string().alphanum().min(11).max(11).required(),
    cpf: Joi.string().alphanum().min(11).max(11).required(),
    scholling: Joi.string().min(5).max(200).required(),
    professionalQualification: Joi.string().min(3).max(100).required(),
    profession: Joi.string().min(3).max(100).required(),
    skills: Joi.array().items(Joi.string()),
    volunteerExperience: Joi.boolean().required(),
    axes: Joi.array().items(Joi.string()),
    schedule: Joi.array().items(Joi.string()),
    police: Joi.boolean().valid(true).required(),
})

const schoolingSchema = Joi.object().keys({
    scholling: Joi.string().min(3).max(100).required(),
    profession: Joi.string().min(3).max(100).required(),
    skills: Joi.array().items(Joi.string()) 
})

module.exports = {
    '/register': registerSchema,
    '/login': loginSchema,
    '/reset-password': passwordSchema,
    '/voluntary-profile': profileShema,
    '/add-schooling': schoolingSchema
}