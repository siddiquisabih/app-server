//Controllers
const authentication = require('../controllers/authentication');
const programControllers = require('../controllers/programControllers');
const batchControllers = require('../controllers/batchControllers');
const CourseControllers = require('../controllers/courseControllers');
const QuizControllers = require('../controllers/quizControllers');
const StudentControllers = require('../controllers/studentControllers');

//middlewares
const ErrMiddleware = require('../middlewares/errMiddleware');

//Passport To Authenticate
const passportService = require('../services/passport');
const passport = require('passport');
const requireLogin = passport.authenticate('local', { session: false })


function routes(app) {


    //create Admin
    app.post('/api/createAdmin', authentication.createAdmin);
    

    //Admin authentication when login
    app.post('/api/adminLogin', requireLogin, authentication.authenticateAdmin);

    //API's for Program
    app.post('/api/addProgram', programControllers.addProgram);
    
    app.delete('/api/deleteProgram/:id', programControllers.deleteProgram);
    

    //API's for Batches
    app.get('/api/getAllPrograms', batchControllers.getAllPrograms);
    
    app.post('/api/addBatch', batchControllers.addBatch);
    
    app.delete('/api/deleteBatch/:id', batchControllers.deleteBatch);
    
    app.get('/api/getSpecificBatches', batchControllers.specificBatches);
    

    //API's for courses
    app.get('/api/getAllBatches', CourseControllers.getAllBatches);
    
    app.post('/api/addCourse', CourseControllers.addCourse);
    
    app.delete('/api/deleteCourse/:id', CourseControllers.deleteCourse);
    
    app.get('/api/getSpecificCoureses', CourseControllers.specificCourses)
    

    //API's for Quizes
    app.get("/api/getAllCourses", QuizControllers.getAllCourses);
    
    app.post('/api/makeQuiz', QuizControllers.makeQuiz);
    
    app.delete('/api/deleteQuiz/:id', QuizControllers.deleteQuiz)
    
    app.put('/api/editQuiz/:id', QuizControllers.editQuiz)
    
    app.get('/api/getSpecificQuizes', QuizControllers.specificQuizes)

    app.get('/api/addQuizApproval', QuizControllers.addQuizApproval)
   
    app.get('/api/getAllQuizes', QuizControllers.getAllQuizes);
    
    app.get('/api/fetchQuizDetails/:courseId/:quizId', QuizControllers.fetchQuizDetails)
   
    app.get('/api/quizSchedule', QuizControllers.quizSchedule)
    
    app.put('/api/updateScheduleTable', QuizControllers.updateScheduleTable)
    
    app.post('/api/searchStudent', StudentControllers.searchStudent)
    
    app.put('/api/updateStudentForSaylaniFields', StudentControllers.updateStudentForSaylaniFields)
    
    app.get("/api/getProductKey", QuizControllers.getProductKey);
    
    app.get('/api/getSpecificStudentsResult/', StudentControllers.specificStudentsResult)
    

    //API's for attempQuizes
    app.get("/api/fetchAttempQuiz/:quizId", StudentControllers.fetchAttempQuiz);
    
    app.put("/api/saveQuizResult/:studentId", StudentControllers.saveQuizResult);
   
    app.get("/api/getPresentStudent", StudentControllers.getPresentStudent);
    
    app.use(ErrMiddleware)

}

module.exports = routes