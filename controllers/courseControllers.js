//Models
const Courses = require('../models/courses');
const Programs = require('../models/programs');
const Batches = require("../models/batches");


module.exports = {

    getAllBatches(req, res, next) {
        Batches.find()
            .then((allBatches) => { res.send(allBatches) })
            .catch(next)
    },

    addCourse(req, res, next) {

        const course = req.body.course;
        const batchName = req.body.batch_name;
        const programName = req.body.program_name;

        Batches.find({ batch: batchName }, function (err, founded) {

            founded.forEach((bat) => {
                Programs.findOne({ _id: bat.program_id }, function (err, foundedProgram) {

                    if (foundedProgram.program === programName) {

                        var doc = {
                            course: course,
                            batch_id: bat._id,
                            program_name: programName
                        }

                        Courses.update(doc, doc, { upsert: true }, function (err, createdCourse) {

                            if (createdCourse.hasOwnProperty('upserted') === true) {
                                Courses.findOne({ _id: createdCourse.upserted[0]._id }, function (err, createdCourse) {
                                    res.send(createdCourse)
                                })
                            }
                            if (createdCourse.hasOwnProperty('upserted') === false) {
                                res.send({ success: false })
                            }
                        })
                    }
                })
                    .catch(next)
            })
        })
            .catch(next)
    },

    deleteCourse(req, res, next) {
        Courses.remove({ _id: req.params.id })
            .then((delCor) => {
                res.send({ success: true })
            })
            .catch(next)
    },

    specificCourses(req, res, next) {

        var batchID = req.headers.batch_id;

        Courses.find({ batch_id: batchID }, function (err, founded) {
            res.send(founded)
        })
            .catch(next)
    }
}

