//model
const Batches = require("../models/batches");
const Programs = require('../models/programs');


module.exports = {

    getAllPrograms(req, res, next) {

        Programs.find()
            .then((allPrograms) => { res.send(allPrograms) })
            .catch(next)
    },

    addBatch(req, res, next) {
        const batch = req.body.batch;
        const programName = req.body.program_name;

        Programs.findOne({ program: programName }, function (err, founded) {

            if (founded) {

                var doc = {
                    batch: batch,
                    program_id: founded._id
                }

                Batches.update(doc, doc, { upsert: true }, function (err, createdBatch) {

                    if (createdBatch.hasOwnProperty('upserted') === true) {
                        Batches.findOne({ _id: createdBatch.upserted[0]._id }, function (err, createdBatch) {
                            res.send(createdBatch)
                        })
                    }
                    if (createdBatch.hasOwnProperty('upserted') === false) {
                        res.send({ success: false })
                    }

                })
            }
            else {
                res.send({ success: false })
            }
        })
            .catch(next)
    },

    deleteBatch(req, res, next) {
        Batches.remove({ _id: req.params.id })
            .then((delBatch) => {
                res.send({ success: true })
            })
            .catch(next)
    },

    specificBatches(req, res, next) {
        var programID = req.headers.program_id;

        Batches.find({ program_id: programID }, function (err, founded) {
            res.send(founded)
        })
            .catch(next)
    }
}



