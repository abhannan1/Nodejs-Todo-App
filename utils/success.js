


const success = (success = true, task = null, message = null, statusCode = 200, req, res, next) => {
    const response = {
      success,
    };
    
    if (message == null && task != null) {
      response.message = task;
    } else if (message != null && task == null) {
      response.message = message;
    } else {
      response.task = task;
      response.message = message;
    }
  
    return res.status(statusCode).send(response);
  }



//if msg is null msg :task and task:undefined, if msg not null msg:msg and task:task, if task is null, task:null
// const success = (success = true, task = null, message = null, statusCode = 200, req, res, next) => {
//   const response = {
//     success,
//     message: (message === null) ? task : message,
//     task: (message === null) ? undefined : task
//   };
  
//   return res.status(statusCode).send(response);
// }

module.exports = {success}