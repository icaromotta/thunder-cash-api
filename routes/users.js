var express = require('express')

const authMiddleware = require('../middleware/auth')
const { bodyValidator } = require('../middleware/schemaValidator')
const userController = require('../controllers/user')

var router = express.Router()

const validateRequestBody = bodyValidator(true)

router.post('/register', validateRequestBody, userController.register)
router.post('/login', validateRequestBody, userController.login)
router.get('/forgot-password', userController.forgotPassword)
router.post('/reset-password', validateRequestBody, authMiddleware, userController.resetPassword)

module.exports = router;
