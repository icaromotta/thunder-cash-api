const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(400).send({ error: 'Necessário o TOKEN!' })
    }

    const parts = authHeader.split(' ')

    if (!parts.lenght === 2) {
        return res.status(401).send({ error: 'TOKEN error!' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'TOKEN estranho!' })
    }
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'TOKEN inválido' })
        }

        req._id = decoded._id

        return next()
    })
}