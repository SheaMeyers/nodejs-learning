const fs = require('fs')
const chalk = require('chalk')

const getNotes = function() {
    return "Your notes..."
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })


    if (duplicateNotes.length === 0) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)        
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const removeNote = function (title) {
    const notes = loadNotes()
    const filteredNotes = notes.filter(note => note.title !== title)
    if (notes.length !== filteredNotes.length) {
        saveNotes(filteredNotes)
        console.log(chalk.green('Note removed!'))
    } else {
        console.log(chalk.red('No note found!'))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = function () {
    try {
      const dataBuffer = fs.readFileSync("notes.json");
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
    } catch (e) {
      return [];
    }
}

module.exports = {
    addNote, getNotes, removeNote
}
