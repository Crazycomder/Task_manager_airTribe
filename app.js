const express = require('express');
const taskData= require("./task.json");
const Validator = require('./src/helpers/validator');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    return res.status(200).send("Hello ,  I am  Dev Harsh");
  });


// GET /tasks
app.get('/tasks', (req, res) => {
    return res.status(200).json(taskData);
});


// app.get('/tasks/:id', (req, res) => {
//     const taskId = parseInt(req.params.id);
//     const task = taskData.find(task => task.id === taskId);
//     if (!task) {
//       return res.status(404).json({ error: 'Task not found' });
//     }
//     res.status(200).json(task);
//   });

// app.get('/tasks/:id', (req, res) => {
//     try {
//         const allTasks = taskData.tasks;

//         if(allTasks.length < req.params.id){
//             return res.status(404).send("No Task found for your query");
//         }

//         let filteredTask = allTasks.filter(task => task.id == req.params.id);
//         let Id  = filteredTask[0].id;
//         return res.status(200).json(filteredTask);
//     }
//     catch(err){
//         return res.status(400).json("Enter valid Id in integer")
//     }
// }); 
app.get('/tasks/:id', (req, res) => {
    try {
        const allTasks = taskData.tasks;
        const taskId = parseInt(req.params.id);

        const filteredTask = allTasks.find(task => task.id === taskId);

        if (!filteredTask) {
            return res.status(404).send("No task found for the provided ID.");
        }

        return res.status(200).json(filteredTask);
    } catch (err) {
        return res.status(400).json("Enter a valid integer ID.");
    }
});

// app.get('/tasks/:id',(req,res) => {
//     try{
//         const allTasks = taskData.tasks;                                           
//         let filteredTask = allTasks.filter(task => task.id == req.params.id);   
    
//         // console.log(typeof(filteredTask[0].id));
        
//         return res.status(200).json(filteredTask); 
    
//     }
//     catch{
      
//         return res.status(200).json("Task Id should be an Integer"); 

//     } 
// });

// GET /tasks/:id
// app.get('/tasks/:id',(req,res) => {
//     const allTasks = taskData.tasks;                                           
//     let filteredTask = allTasks.filter(task => task.id == req.params.id);   

//     // console.log(typeof(filteredTask[0].id));

//     if(typeof (filteredTask[0].id) !== 'number'){
//         res.json({ error: 'Task ID should be an Integer' });   
//                       //  id not numeric
//     }
//      if((filteredTask[0].id) % 1 !== 0){
//         res.json({ error: 'Task ID should be an Integer' });                   // it's not an integer.
//     }
//     if(filteredTask.length == 0){                                          // Handling the error case 
//         return res.status(404).json({ error: 'Task not found' });
//     }
    
//     return res.status(200).json(filteredTask); 
// });


app.post('/tasks', (req, res) => {
    const taskDetails = req.body;
    
    const validationResult = Validator.validateTaskInfo(taskDetails);
    if (!validationResult.status) {
        return res.status(400).json(validationResult);
    }

    // Make a copy of taskData before modifying it
    let taskDataModified = [taskData];
    taskDataModified.push(taskDetails);
    
    fs.writeFile('./task.json', JSON.stringify(taskDataModified), { encoding: 'utf8', flag: 'w' }, (err, data) => {
        if (err) {
            console.error("Error writing task data:", err);
            return res.status(500).send("Something went wrong, please try again");
        } else {
            return res.status(201).send("Task has been successfully created");
        }
    });
});

// app.put('/tasks/:id', (req, res) => {
//     const taskId = parseInt(req.params.id);
//     let taskData = require('./task.json'); // Load task data from the file

//     const taskIndex = taskData.tasks.findIndex(task => task.id === taskId);

//     if (taskIndex === -1) {
//         return res.status(404).json({ error: 'Task not found' });
//     }

//     const { title, description, completed } = req.body;

//     taskData.tasks[taskIndex] = {
//         ...taskData.tasks[taskIndex],
//         title: title || taskData.tasks[taskIndex].title,
//         description: description || taskData.tasks[taskIndex].description,
//         completed: typeof completed === 'boolean' ? completed : taskData.tasks[taskIndex].completed
//     };

//     fs.writeFile('./task.json', JSON.stringify(taskData, null, 2), { encoding: 'utf8', flag: 'w' }, (err, data) => {
//         if (err) {
//             return res.status(500).send("Something went wrong, please try again");
//         } else {
//             return res.status(200).json(taskData.tasks[taskIndex]);
//         }
//     });
// });

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    let taskData = require('./task.json'); // Load task data from the file

    const taskIndex = taskData.tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, description, completed } = req.body;

    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed field must be a boolean' });
    }

    taskData.tasks[taskIndex] = {
        ...taskData.tasks[taskIndex],
        title: title || taskData.tasks[taskIndex].title,
        description: description || taskData.tasks[taskIndex].description,
        completed
    };

    fs.writeFile('./task.json', JSON.stringify(taskData, null, 2), { encoding: 'utf8', flag: 'w' }, (err, data) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again");
        } else {
            return res.status(200).json(taskData.tasks[taskIndex]);
        }
    });
});



// PUT /tasks/:id
//   app.put('/tasks/:id', (req, res) => {
//     // const allTasks = taskData.tasks;                                           
//     // let filteredTask = allTasks.filter(task => task.id == req.params.id); 
    
//     const taskId = parseInt(req.params.id);
//     // console.log(taskData);
//     let temp=taskData.tasks
//     const taskIndex = temp.filter(task => task.id === taskId)
//     // console.log(taskIndex);
//     if (taskIndex === -1) {
//       return res.status(404).json({ error: 'Task not found' });
//     }
//     const { title, description, completed } = req.body;
//     // if (!title || !description || typeof completed !== 'boolean') {
//     //   return res.status(400).json({ error: 'Invalid input' });
//     // }

//     // console.log(taskData);
    
//     taskData[taskIndex] = {
//       ...taskData[taskIndex],
//       title,
//       description,
//       completed
//     };
//     // console.log(taskData);
//     fs.writeFile('./task.json' , JSON.stringify(req.body, null, 2), {encoding: 'utf8', flag: 'w'}, (err, data) => {
//         if(err) {
//             return res.status(500).send("Something went wrong , please try again");
//         } else {
//             return res.status(201).send("Task has been successfuly updated");
//         }
//     })
//     res.json(taskData[taskIndex]);
//     // console.log(taskData);
   
//   });
  
//   DELETE /tasks/:id

  app.delete('/tasks/:id', (req, res) => {
    try{
        const taskId = parseInt(req.params.id);
        const taskIndex = taskData.filter(task => task.id != taskId);
        // console.log(taskIndex);
        // if id not not found
        fs.writeFile('./task.json' , JSON.stringify(taskIndex), {encoding: 'utf8', flag: 'w'}, (err, data) => {
            if(err) {
                return res.status(500).send("Something went wrong , please try again");
            } else {
                return res.status(201).send("Task has been successfuly deleted");
            }
        });
        
        res.status(204).json(taskIndex);
    }
    catch(err){
        res.send(err.message)
    }
   
  });
  
//   // Step 4: Error Handling Middleware
//   app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: 'Internal Server Error' });
//   });  

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;