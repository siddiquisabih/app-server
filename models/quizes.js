const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const McqsSchema = new Schema({

    question: {
        type: String
    },
    options: {
        type: Array,
        default: []
    },
    answers: {
        type: Array,
        default: []
    }
})

const TimeSchema = new Schema({
    hour: {
        type: String,
        required: true
    },
    minute: {
        type: String,
        required: true
    }
})

const QuizesSchema = new Schema({

    quiz: {
        type: String,
        required: true
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    productKey: {
        type: String,
        required: true
    },

    quiz_description: {
        type: String,
        required: true
    },

    passing_score: {
        type: String,
        required: true
    },

    quiz_time: TimeSchema,

    held_on: {
        type: String,
        required: true
    },
    held_for: {
        type: String,
        required: true
    },
    mcqs: [McqsSchema]
})

const Quizes = mongoose.model('quizes', QuizesSchema)
module.exports = Quizes;



// {
//      "quiz": "quiz#1",
//      "course_name": "DCCN",
//      "mcqs": [
//      	{
//          "question": "what is topology?", 
//          "options": ["LAN", "the way in which constituent parts are interrelated or arranged", "the topology of a computer network", "WAN"], 
//          "answers": ["the way in which constituent parts are interrelated or arranged", "the topology of a computer network"]
//          },

//         {
//          "question": "what is topology?", 
//          "options": ["LAN", "the way in which constituent parts are interrelated or arranged", "the topology of a computer network", "WAN"], 
//          "answers": ["the way in which constituent parts are interrelated or arranged", "the topology of a computer network"]	
//         },
//          {
//          "question": "what is topology?", 
//          "options": ["LAN", "the way in which constituent parts are interrelated or arranged", "the topology of a computer network", "WAN"], 
//          "answers": ["the way in which constituent parts are interrelated or arranged", "the topology of a computer network"]	
//         }
//          ]
// }