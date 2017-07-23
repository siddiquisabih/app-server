const jwt = require('jwt-simple');
const Administrators = require('../models/administrators');
const config = require('../config');

function tokenForUser(createdUser) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: createdUser.id, iat: timestamp }, config.secret)
}


module.exports = {

    //controller for admin creating
    createAdmin(req, res, next) {

        const name = req.body.adminName;
        const pass = req.body.password

        Administrators.findOne({ adminName: name }, (err, user) => {
            if (err) { return next(err) }

            if (user) {
                return res.status(422).send({ error: 'This Admin Name already Exists' })
            }

            Administrators.create(req.body)
                .then((adminObj) => { res.send({ success: 'Admin Created successfully !!' }) })
                .catch(next)
        })
    },

    //controller for admin login
    authenticateAdmin(req, res, next) {

        if (req.user.success === false) {
            res.send(req.user);
        }
        else {
            res.send({token: tokenForUser(req.user)});
        }

    }
}