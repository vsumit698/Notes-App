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

module.exports.listNotes = ()=>{

  try {
    
    let dataObj = readJSON(jsonStorePath);
    let notesArray = dataObj.notes;
    let noteId = 0;
    logger('success',`Total ${notesArray.length} Notes Found`);
    for(let notesObj of notesArray){
      console.log(`${noteId + 1}. Title -> ${notesObj.title ? notesObj.title : ''}`);
      noteId++;
    }

  } catch (error) {
    logger('failure',`Failed To Load Notes`);
  }

}

module.exports.readNote = (queryTitle,position)=>{

  // console.log(position,queryTitle);

  if(!queryTitle && !position){
    logger('failure',`Provide either of title or valid id`);
    return;
  }

  let dataObj = readJSON(jsonStorePath);
  let notesArray = dataObj.notes;

  if(position && (notesArray.length >= position && position >= 1)){
    logger('success','Note Found');
    console.log(`Title -> ${notesArray[position-1].title}`);
    console.log(`Body -> ${notesArray[position-1].body}`);
    return;
  }
  
  if(queryTitle){
    let queryTitleLowerCase = queryTitle.toLowerCase();

    for(let notesObj of notesArray){

      if(notesObj.title.toLowerCase() === queryTitleLowerCase){
        logger('success','Note Found');
        console.log(`Title -> ${notesObj.title}`);
        console.log(`Body -> ${notesObj.body}`);
        return;
      }
    }
  }
  
  logger('failure','Note Not Found');

}
