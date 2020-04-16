const mongoose = require('mongoose')
const User = mongoose.model('User')

handleData = () => { }

generatesRefundAmount = (req) => {

    const refundPercentage = Math.floor(Math.random() * 100);
    const refundValue = req.body.saleValue * (refundPercentage / 100);

    const newCashback = {
        cashbackValue: refundValue.toFixed(1),
        refundPercentage: `${refundPercentage}%`
    }

    return newCashback
}
async function addNewCashBack(req, res) {

    const { userId, saleCode, saleValue, saleDate, status } = req.body
    const cashbackData = await generatesRefundAmount(req)
    const cashackStatus = [ 'Em validação', 'Reprovado', 'Aprovado' ]

    User.findById({ _id: userId }, (err, user) => {

        const cashback = {
            userCode: userId,
            saleCode: saleCode,
            saleValue: saleValue,
            saleDate: req.body.saleDate.split("-").join("/"),
            refundPercentage: cashbackData.refundPercentage,
            cashbackValue: cashbackData.cashbackValue,
            status: cashackStatus[Math.floor(Math.random() * cashackStatus.length)]
        }

        user.cashback.push(cashback)
        user.save((err, user) => {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json({ ok: true })
            }
        })
    })

}

function listCashbacks(req, res) {

    User.findById(req.query.userId)
        .select('cashback')
        .exec((err, user) => {
            res.status(200).json(user)
        })
}

function deleteCashback(req, res) {

    const { userId, cashbackId} = req.query
    
    User.findById({ _id: userId }, (err, user) => {
        user.cashback.id(cashbackId).remove();
        user.save((err, user) => {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json({ ok: true })
            }
        });
    })
}

module.exports = {
    handleData,
    generatesRefundAmount,
    addNewCashBack,
    listCashbacks,
    deleteCashback
}