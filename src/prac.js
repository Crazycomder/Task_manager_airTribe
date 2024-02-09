// const express = require('express');
// const taskData = require("./task.json");
// const Validator = require('./helpers/validator');
// const fs = require('fs');

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// app.get('/', (req, res) => {
//     return res.status(200).send("Hello ,  I am  Dev Harsh");
//   });


// // GET /tasks
// app.get('/tasks', (req, res) => {
//     return res.status(200).json(taskData);
// });



// app.get('/tasks/:id', (req, res) => {
//     const alltasks = taskData.tasks;
//     let filteredTask = allTasks.filter(task => task.id == req.params.id);
//     if(filteredTask.length == 0) {
//         return res.status(404).send("No Task found for your query");
//     }
//     return res.status(200).json(filteredCourse);
// }); 

// app.listen(port, (err) => {
//     if (err) {
//         return console.log('Something bad happened', err);
//     }
//     console.log(`Server is listening on ${port}`);
// });



// module.exports = app;


var data = 22;

if(typeof data === 'number'){
     // yes it is numeric

    if(data % 1 === 0){
       // yes it's an integer.
    }
}