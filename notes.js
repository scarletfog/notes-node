
const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const jsonData = JSON.stringify(notes);
  fs.writeFileSync('notes-data.json', jsonData);
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body,
  };


  const duplicateNotes = notes.filter(i => i.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => fetchNotes();

const getNote = (title) => {
  const notes = fetchNotes();
  // const filteredNotes = notes.filter(i => i.title === title);
  // return filteredNotes[0];
  return notes.find(el => el.title === title);
};

const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(i => i.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};


const logNote = (note) => {
  debugger;

  console.log('----');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote,
};
