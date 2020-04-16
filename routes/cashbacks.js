var express = require('express')
const cashbackController = require('../controllers/cashback')

var router = express.Router()

router.post('/', cashbackController.addNewCashBack)
router.get('/', cashbackController.listCashbacks)
router.delete('/', cashbackController.deleteCashback)

module.exports = router;