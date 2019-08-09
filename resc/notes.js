const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const logNote = (action, title, body) => {
	console.log(chalk.green(
		[	
			`Action: ${action}`,
			`Title: ${title}`,
			`Body: ${body}`,
		].join('\n')
	))
}

const saveNotes = (notesArray, pathArgs) => {
	fs.writeFileSync(pathArgs.filepath, JSON.stringify(notesArray))
}

const findNoteByTitle = (notesArray, title) => notesArray.find(e => e.title === title)

const loadNotes = (pathArgs) => {
	try{
		return JSON.parse(fs.readFileSync(pathArgs.filepath))
	} catch(e){
		return []
	}
}

const addNote = (title, body, pathArgs) => {

	notesArray = loadNotes(pathArgs)
	notesDuplicate = findNoteByTitle(notesArray, title)

	if (!notesDuplicate){
		notesArray.push({'title': title, 'body': body})
		saveNotes(notesArray, pathArgs)
		logNote('added', title, body)
	} else {
		console.log(chalk.red('This note has a duplicate title! Please try again with another title.'))
	}

}

const removeNote = (title, pathArgs) => {

	notesArray =  loadNotes(pathArgs)
	titles = notesArray.map(e => e.title)

	if (titles.includes(title)){
		note = findNoteByTitle(notesArray, title)
		notesToKeep = notesArray.filter(e => e.title != title)
		saveNotes(notesToKeep, pathArgs)
		logNote('deleted', note.title, note.body)
	} else {
		console.log(chalk.red('No note with a matching title found! Please try again with another title.'))
	}
}

const listNotes = (pathArgs) => {loadNotes(pathArgs).map(note => {console.log(chalk.inverse(note.title))})}

const readNote = (title, pathArgs) => {
	notesArray = loadNotes(pathArgs)
	note = findNoteByTitle(notesArray, title)
	if (note){
		console.log(chalk.inverse(note.title))
		console.log(note.body)
	} else {
		console.log(chalk.red('No note with a matching title found! Please try again with another title.'))
	}
}


module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}