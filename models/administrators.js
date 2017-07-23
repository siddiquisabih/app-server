const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const AdminSchema = new Schema({

    adminName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//Password Encryption
AdminSchema.pre('save', function (next) {
    const administrators = this

    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err) }

        bcrypt.hash(administrators.password, salt, null, function (err, hash) {
            if (err) { return next(err) }

            administrators.password = hash
            next();
        })
    })
});

//Password Dcryption
AdminSchema.methods.comparePassword = function (submitedPassword, callback) {
    bcrypt.compare(submitedPassword, this.password, function (err, isMatch) {
        if (err) { return callback(err) }

        callback(null, isMatch)
    });
}



const Administrators = mongoose.model('administrators', AdminSchema);
module.exports = Administrators;



