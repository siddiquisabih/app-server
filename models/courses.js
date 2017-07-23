const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({

    course: {
        type: String,
        required: true
    },
    batch_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    program_name: {
        type: String,
        required: true
    }
})

const Courses = mongoose.model('courses', CoursesSchema);
module.exports = Courses;