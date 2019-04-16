var express = require('express')
const { bodyValidator } = require('../middleware/schemaValidator')
const userController = require('../controllers/user')
const authMiddleware = require('../middleware/auth')

var router = express.Router()

const validateRequestBody = bodyValidator(true)

router.get('/', authMiddleware, userController.testeMiddleware)
router.post('/register', validateRequestBody, userController.register)

module.exports = router;
