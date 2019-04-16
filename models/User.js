const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    createdOn: {
        type: Date,
        'default': Date.now
    },
    updatedAt: { type: Date }
})

// Aplica hash na password antes de salvar no banco
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



const User = mongoose.model('User', userSchema)

module.exports = User