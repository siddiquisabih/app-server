const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const studentSchema = new Schema({

    facebook_name: {
        type: String,
        required: true
    },
    facebook_userId: {
        type: String,
        required: true
    },
    saylani_name: {
        type: String,
        default: ''
    },
    saylani_id: {
        type: String,
        default: ''
    },
    student_email: {
        type: String,
        default: ''
    },
    // program_id: {
    //     type: mongoose.Schema.Types.ObjectId
    // },
    // batch_id: {
    //     type: mongoose.Schema.Types.ObjectId
    // },
    attemptedQuizes: [{
        quiz_id: String,
        quiz_marks: String,
        default: ''
    }]
})

const Students = mongoose.model('students', studentSchema)
module.exports = Students



