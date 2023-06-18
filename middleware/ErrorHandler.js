const {logger,logEvents} = require('./logEvents');

const ErrorHandlingEvent = (error,req,res,next) =>{

    logEvents(`${error.name} : ${error.message}`,'errLog.txt');
    console.log(`Error found in the corse methode : ${error.message}`);
    res.status(500).send('<h1>Error found : 500 </h1>')
 }

 module.exports = {ErrorHandlingEvent};