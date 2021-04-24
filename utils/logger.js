const chalk = require('chalk');

function logger(type,message){

  if(!message) return;

  if(type === 'success'){
    console.log(chalk.green.inverse(type),message);
  }else if(type === 'failure'){
    console.log(chalk.red.inverse(type),message);
  }

}

module.exports = logger;