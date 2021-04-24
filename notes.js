const fs = require("fs");

const logger = require('./utils/logger');
const jsonStorePath = './store.json';

const defaultData ={
  notes : [],
  author : 'sumit'
}

const readJSON = (filePath)=>{
  try {

    let bufferData = fs.readFileSync(filePath);
    return JSON.parse(bufferData.toString());

  } catch (error) {
    if(error.code==='ENOENT'){
      // console.log('store.json file NOT FOUND');
      return JSON.parse(JSON.stringify(defaultData));
    }
    console.log('error in reading store.json file',error);
  }
}

const writeJSON = (filePath, dataObj)=>{
  try {
    fs.writeFileSync(filePath, JSON.stringify(dataObj));
  } catch (error) {
    console.log('error in writing store.json file at ',filePath);
  }
}

module.exports.addNote = (newTitle,body)=>{
  
  try {

    let newTitleLowerCase = newTitle.toLowerCase();
    let dataObj = readJSON(jsonStorePath);
    let notesArray = dataObj.notes;
    for(let notesObj of notesArray){

      if(notesObj.title.toLowerCase() === newTitleLowerCase){
        logger('failure','Title Already Exists');
        return;
      }

    }
    // newTitle is free for now
    notesArray.push({title : newTitle, body : body});
    writeJSON(jsonStorePath,dataObj);
    logger('success', 'Note Added');
  } catch (error) {
    console.log(error);
    logger('failure', 'Failed To Add !');
  }

}

module.exports.removeNote = (queryTitle)=>{
  try {

    let queryTitleLowerCase = queryTitle.toLowerCase();
    let dataObj = readJSON(jsonStorePath);
    let notesArray = dataObj.notes;
    let noteId = 0;
    for(let notesObj of notesArray){

      if(notesObj.title.toLowerCase() === queryTitleLowerCase){
        notesArray.splice(noteId,1);
        writeJSON(jsonStorePath,dataObj);
        logger('success',`Note Deleted of title - ${queryTitle}`);
        return;
      }
      noteId++;
    }
    // queryTitle is not found
    logger('failure','Title Not Found');

  } catch (error) {
    logger('failure', 'Failed To Delete !');
  }
}

const listNotes = ()=>{

}

const readNote = (queryTitle)=>{
  
}
