
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const title = {
  describe: 'Title of note',
  demand: true,
  alias: 't',
};

const body = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b',
};

const argv = yargs
  .command('add', 'add a new note', {
    title,
    body,
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title,
  })
  .command('remove', 'Remove a note', {
    title,
  })
  .help()
  .argv;


const command = argv._[0];

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (!note) { console.log('note already exists'); } else { console.log('adding...'); notes.logNote(note); }
} else if (command === 'list') {
  const allNotes = notes.getAll();

  console.log(`Notes number: ${allNotes.length}`);

  allNotes.forEach((el) => {
    notes.logNote(el);
  });
} else if (command === 'read') {
  const note = notes.getNote(argv.title);

  if (note) { console.log('note found'); notes.logNote(note); } else { console.log('note not found'); }
} else if (command === 'remove') {
  const noteRemoved = notes.removeNote(argv.title);

  const msg = noteRemoved ? 'Note was removed' : 'Error - note not found';

  console.log(msg);
} else {
  console.log('Command not recognized');
}
