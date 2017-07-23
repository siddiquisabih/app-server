//Models
const Programs = require('../models/programs');

module.exports = {

    addProgram(req, res, next) {

        Programs.findOne({ program: req.body.program }, function (err, founded) {
            if (founded) {
                res.send({ success: false })
            }
            else {
                Programs.create(req.body)
                    .then((createdProgram) => { res.send({ success: true, DBdata: createdProgram }) })
                    .catch(next)
            }
        })
            .catch(next)
    },

    deleteProgram(req, res, next) {
        Programs.remove({ _id: req.params.id })
            .then((delPrg) => {
                res.send({ success: true })
            })
            .catch(next)
    }
}