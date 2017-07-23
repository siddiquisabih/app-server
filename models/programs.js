const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgramsSchema = new Schema({

    program: {
        type: String,
        required: true
    }
})

const Programs = mongoose.model('programs', ProgramsSchema)
module.exports = Programs;