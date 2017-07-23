const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BatchesSchema = new Schema({

    batch: {
        type: String,
        required: true
    },
    program_id: {
        type: mongoose.Schema.Types.ObjectId
    }
})

const Batches = mongoose.model('batches', BatchesSchema);
module.exports = Batches;