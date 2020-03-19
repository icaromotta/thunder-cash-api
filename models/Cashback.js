const mongoose = require('mongoose')

var cashbackSchema = new mongoose.Schema({
    userCode: { type: String },
    saleCode: { type: String },
    saleVelue: { type: Number },
    saleDate: { type: Date },
    createdOn: {
        type: Date,
        'default': Date.now
    },
    updatedAt: { type: Date }
})

const Cashback = mongoose.model('Cashback', cashbackSchema)

module.exports = Cashback