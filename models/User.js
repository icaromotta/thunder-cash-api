const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')

var schollingSchema = new mongoose.Schema({
    scholling: { type: String },
    profession: { type: String },
    skill: [String]
});

var userSchema = new mongoose.Schema({
    name: { type: String},
    lastname: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    birthday: { type: String },
    age: { type: String },
    rg: { type: String },
    cpf: { type: String },
    scholling: [schollingSchema],
    professionalQualification: { type: String },
    profession: { type: String },
    skills: [
        { type: String }
    ],
    volunteerExperience: { type: Boolean },
    axes: [
        { type: String }
    ],
    schedule: [
        { type: String }
    ],
    police: { type: Boolean },
    password: { type: String },
    createdOn: {
        type: Date,
        'default': Date.now
    },
    updatedAt: { type: Date }
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