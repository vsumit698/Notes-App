const yargs = require('yargs');

const notes = require('./notes');
// creating notes app commands

// setting up add command

yargs.command({
  command : 'add',
  description : 'command to add Note...',
  builder : {
    title : {
      describe : 'note title',
      demandOption : true,
      type : 'string'
    },
    body : {
      describe : 'note body',
      demandOption : true,
      type : 'string'
    }
  },
  handler : (args)=>{
    notes.addNote(args.title,args.body);
  }
});

// setting up remove command
yargs.command({
  command : 'remove',
  description : 'command to delete Note...',
  builder : {
    title : {
      describe : 'note title',
      demandOption : true,
      type : 'string'
    }
  },
  handler : (args)=>{
    notes.removeNote(args.title);
  }
});

// setting up list command
yargs.command({
  command : 'list',
  description : 'command to list Notes',
  handler : (args)=>{
    notes.listNotes();
  }
});

// setting up read command
yargs.command({
  command : 'read',
  description : 'command to read Notes',
  builder : {
    title : {
      describe : 'note title',
      type : 'string'
    },
    id : {
      describe : 'id of Note',
      type : 'number'
    }
  },
  handler : (args)=>{
    notes.readNote(args.title,args.id);
  }
});

yargs.argv