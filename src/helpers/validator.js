class Validator {
    static validateTaskInfo(taskInfo) {
        if(taskInfo.hasOwnProperty("id") &&
        taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("completed")) {
            return {
                "status": true,
                "message": "Task has been validated"
            };
        } else {
            return {
                "status": false,
                "message": "Task Info is malformed, please provide me correct set of parameters"
            };
        }
    }

    
}

module.exports = Validator;