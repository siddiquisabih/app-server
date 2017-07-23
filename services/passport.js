const passport = require('passport');
const Administrators = require('../models/administrators')
const localStrategy = require('passport-local');


const localOptions = {
    usernameField: 'adminName'
}

const localLogin = new localStrategy(localOptions, function (adminName, password, done) {

    Administrators.findOne({ adminName: adminName }, function (err, user) {
        if (err) { return done(err) }

        if (user) {

            user.comparePassword(password, function (err, isMatch) {
                if (err) { return done(err) }

                if (isMatch) {
                    done(null, user)
                }
                else {
                    done(null, { success: false })
                }
            })
        }
        else {
            done(null, { success: false })
        }
    })
});

passport.use(localLogin);




