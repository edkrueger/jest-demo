const fs = require('fs')
const FILEPATH = 'notes.json'
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

const saveNotes = notesArray => {
	fs.writeFileSync(FILEPATH, JSON.stringify(notesArray))
}

const findNoteByTitle = (notesArray, title) => notesArray.find(e => e.title === title)

const loadNotes = () => {
	try{
		return JSON.parse(fs.readFileSync('notes.json'))
	} catch(e){
		return []
	}
}

const addNote = (title, body) => {

	notesArray = loadNotes()
	notesDuplicate = findNoteByTitle(notesArray, title)

	if (!notesDuplicate){
		notesArray.push({'title': title, 'body': body})
		saveNotes(notesArray)
		logNote('added', title, body)
	} else {
		console.log(chalk.red('This note has a duplicate title! Please try again with another title.'))
	}

}

const removeNote = title => {

	notesArray =  loadNotes()
	titles = notesArray.map(e => e.title)

	if (titles.includes(title)){
		note = findNoteByTitle(notesArray, title)
		notesToKeep = notesArray.filter(e => e.title != title)
		saveNotes(notesToKeep)
		logNote('deleted', note.title, note.body)
	} else {
		console.log(chalk.red('No note with a matching title found! Please try again with another title.'))
	}
}

const listNotes = () => {loadNotes().map(note => {console.log(chalk.inverse(note.title))})}

const readNote = (title) => {
	notesArray = loadNotes()
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