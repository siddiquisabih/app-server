//Model
const Quizes = require('../models/quizes');
const Courses = require('../models/courses');
const Batches = require("../models/batches");
const Programs = require('../models/programs');
const Students = require('../models/students.js')

module.exports = {

    // for fetching attemp Quiz
    fetchAttempQuiz(req, res, next) {

        Quizes.findOne({ _id: req.params.quizId })
            .then(quizzes => res.send(quizzes))
            .catch(next)

    },
    //for save student Quiz Result
    saveQuizResult(req, res, next) {
        var studentId = req.params.studentId;
        var attemped = {
            quiz_id: req.body.quizId,
            quiz_marks: req.body.marks
        }
        var attemptedQuizes = [];

        Students.findById({ _id: studentId }, function (err, founded) {
            attemptedQuizes = founded.attemptedQuizes
            console.log(attemptedQuizes)
            attemptedQuizes.push(attemped)

            Students.findByIdAndUpdate({ _id: studentId }, { attemptedQuizes: attemptedQuizes })
                .then(student => res.send(student))
                .catch(next)
        })
    },

    searchStudent(req, res, next) {

        Students.findOne({ facebook_name: req.body.facebookName, facebook_userId: req.body.facebookUserId })
            .then((founded) => {
                if (founded !== null) {
                    if (founded.saylani_id === '' && founded.saylani_name === '') {
                        res.send({ success: false, StudentDocId: founded._id })
                    }
                    else {
                        res.send({ success: true, currentStudent: founded })
                    }
                }
                if (founded === null) {
                    Students.create({ facebook_name: req.body.facebookName, facebook_userId: req.body.facebookUserId })
                        .then((createdStudent) => {
                            res.send({ success: false, StudentDocId: createdStudent._id })
                        })
                        .catch(next)
                }
            })
            .catch(next)
    },

    specificStudentsResult(req, res, next) {
        var quizID = req.headers.quiz_id;
        var attemptedStudents = [];
        console.log(quizID)
        Students.find({}, function (err, founded) {

            founded.forEach((student, i) => {
                for (var i = 0; i < student.attemptedQuizes.length; i++) {
                    var attemptedQuiz = student.attemptedQuizes[i];
                    if (attemptedQuiz.quiz_id === quizID) {
                        var st = {};
                        st.saylani_id = student.saylani_id;
                        st.saylani_name = student.saylani_name;
                        st.quiz_marks = attemptedQuiz.quiz_marks;
                        attemptedStudents.push(st);
                        break;
                    }
                }
            })
            res.send(attemptedStudents)
        })
            .catch(next)
    },

    updateStudentForSaylaniFields(req, res, next) {
        Students.findByIdAndUpdate({ _id: req.body.studentDocId }, {
            saylani_name: req.body.saylaniName,
            saylani_id: req.body.saylaniId,
            student_email: req.body.yourEmail
        })
            .then((updatedDoc) => {
                Students.findOne({ _id: req.body.studentDocId }, (err, founded) => {
                    res.send(founded)
                })
                    .catch(next)
            })
            .catch(next)
    },

    getPresentStudent(req, res, next) {
        Students.findOne({ _id: req.headers._id })
            .then((founded) => {
                res.send(founded)
            })
    }

}