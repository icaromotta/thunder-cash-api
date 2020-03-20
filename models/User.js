const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')

const cashbackSchema = new mongoose.Schema({
    userCode: { type: String },
    saleCode: { type: String },
    saleValue: { type: Number },
    saleDate: { type: Date },
    refundPercentage: { type: String }, 
    cashbackValue: { type: String },
    status: { type: String }
})

const userSchema = new mongoose.Schema({
    name: { type: String},
    cpf: { type: String },
    email: { type: String },
    password: { type: String },
    createdOn: {
        type: Date,
        'default': Date.now
    },
    updatedAt: { type: Date },
    cashback: [cashbackSchema]
})

userSchema.pre('save', function save(next) {
    const user = this
    if (!user.isModified('password')) { return next() }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err) }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err) }
            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = (password, selfPass, cb) => {
    bcrypt.compare(password, selfPass, (err, isMatch) => {
        selfPass = undefined
        cb(err, isMatch)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User