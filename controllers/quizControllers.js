//Model
const Quizes = require('../models/quizes');
const Courses = require('../models/courses');
const Batches = require("../models/batches");
const Programs = require('../models/programs');
const Students = require('../models/students.js');


module.exports = {

    getAllCourses(req, res, next) {
        Courses.find()
            .then((allCourses) => {
                res.send(allCourses)
            })
            .catch(next)
    },

    makeQuiz(req, res, next) {

        var doc = {
            quiz: req.body.quiz,
            course_id: req.body.courseID,
            quiz_description: req.body.quiz_description,
            passing_score: req.body.passing_score,
            held_on: '',
            held_for: '',
            quiz_time: req.body.quiz_time,
            mcqs: req.body.mcqs,
            productKey: req.body.productKey,
            mcqs: req.body.mcqs
        }

        Quizes.update(doc, doc, { upsert: true }, function (err, createdQuiz) {

            Quizes.findOne({ _id: createdQuiz.upserted[0]._id }, function (err, createdQuiz) {
                res.send(createdQuiz)
            })
        })
        // console.log(req.body.quiz, req.body.courseID, req.body.assignedDate, req.body.quiz_time, req.body.mcqs)
    },

    deleteQuiz(req, res, next) {
        Quizes.remove({ _id: req.params.id }, function (err, delQuiz) {
            res.send({ success: true })
        })
            .catch(next)
    },

    editQuiz(req, res, next) {
        var quizId = req.params.id;
        var editObj = req.body;
        var quiz_time = {
            hour: req.body.hour,
            minute: req.body.minute
        }
        console.log(quiz_time)
        Quizes.findByIdAndUpdate({ _id: quizId }, {
            quiz: editObj.quiz,
            productKey: editObj.productKey,
            quiz_description: editObj.quiz_description,
            passing_score: editObj.passing_score,
            quiz_time: quiz_time
        })
            .then((quiz) => {
                res.send(quiz)
            })
            .catch(next)

    },

    specificQuizes(req, res, next) {

        var courseID = req.headers.course_id;

        Quizes.find({ course_id: courseID }, function (err, founded) {
            res.send(founded)
        })
            .catch(next)
    },
    addQuizApproval(req, res, next) {

        // console.log(req.headers.title, req.headers.course, req.headers.minute, req.headers.second)

        var quiz = req.headers.title
        var courseID = req.headers.course
        var approvalFlag = true

        Quizes.find({ quiz: req.headers.title }, function (err, founded) {

            founded.forEach((quizOBJ) => {
                if (quizOBJ.course_id.toString() === courseID) {
                    approvalFlag = false
                    res.send({ Approval: approvalFlag })
                }
            })
            if (approvalFlag === true) {
                res.send({ Approval: approvalFlag })
            }
        })
    },

    getAllQuizes(req, res, next) {
        Quizes.find()
            .then((allQuizes) => {
                res.send(allQuizes)
            })
    },
    getProductKey(req, res, next) {
        Quizes.findOne({ _id: req.headers.quiz_id })
            .then((quizDoc) => {
                res.send(quizDoc)
            })
    },

    fetchQuizDetails(req, res, next) {

        var QuizHeldFor;
        var ItsCourse;
        var ItsBatch;
        var ItsProgram;

        Quizes.findOne({ _id: req.params.quizId }, function (err, founded) {
            QuizHeldFor = founded.held_for
        })

        Courses.findOne({ _id: req.params.courseId }, function (err, founded) {
            ItsCourse = founded.course
            Batches.findOne({ _id: founded.batch_id }, function (err, founded) {
                ItsBatch = founded.batch
                Programs.findOne({ _id: founded.program_id }, function (err, founded) {
                    ItsProgram = founded.program
                    res.send({ heldFor: QuizHeldFor, course: ItsCourse, batch: ItsBatch, program: ItsProgram })
                })
                    .catch(next)
            })
                .catch(next)
        })
            .catch(next)
    },



    quizSchedule(req, res, next) {
        var counter = 0;
        var arrayForTable = [];

        Courses.find()
            .then((allCourseDoc) => {
                return Promise.all(allCourseDoc.map((courseOBJ) => {
                    return Quizes.find({ course_id: courseOBJ._id })
                        .then(founded => {
                            var temp = [];
                            temp.push(courseOBJ.course)

                            founded.forEach((quizOBJ) => {
                                temp.push(quizOBJ)
                            })
                            arrayForTable.push(temp)
                        })
                }))
            })
            .then(() => {
                res.send(arrayForTable)
            })
    },

    updateScheduleTable(req, res, next) {
        var counter = 0;
        var arrayForTable = [];

        console.log(req.body)
        Quizes.findByIdAndUpdate({ _id: req.body.quizID }, {

            held_on: req.body.heldOn,
            held_for: req.body.heldFor,
            productKey: req.body.productKey
        })
            .then(() => {
                Courses.find()
                    .then((allCourseDoc) => {
                        return Promise.all(allCourseDoc.map((courseOBJ) => {
                            return Quizes.find({ course_id: courseOBJ._id })
                                .then(founded => {
                                    var temp = [];
                                    temp.push(courseOBJ.course)

                                    founded.forEach((quizOBJ) => {
                                        temp.push(quizOBJ)
                                    })
                                    arrayForTable.push(temp)
                                })
                        }))
                    })
                    .then(() => {
                        res.send(arrayForTable)
                    })
            })
            .catch(next)
    }

    // searchStudent(req, res, next) {

    //     Students.findOne({ facebook_name: req.body.facebookName, facebook_email: req.body.facebookEmail })
    //         .then((founded) => {
    //             if (founded !== null) {
    //                 if (founded.saylani_id === '' && founded.saylani_name === '') {
    //                     res.send({ success: false })
    //                 }
    //                 else {
    //                     res.send({ success: true })
    //                 }
    //             }
    //             if (founded === null) {
    //                 Students.create({ facebook_name: req.body.facebookName, facebook_email: req.body.facebookEmail })
    //                     .then((createdStudent) => {
    //                         res.send({ success: false })
    //                     })
    //                     .catch(next)
    //             }
    //         })
    //         .catch(next)
    // }
}

