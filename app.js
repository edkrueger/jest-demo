const path = require('path')
const fs = require('fs')
const validator = require('validator')
const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./resc/notes')

const PATHARGS = {
	folder: 'data',
	filename: 'notes.json'
}

PATHARGS.filepath = path.join(PATHARGS['folder'], PATHARGS['filename'])

fs.mkdirSync(PATHARGS.folder, {recursive: true})

console.log

yargs.version('1.1.0')

yargs.command({
	command: 'add',
	describe: 'Adds a new note.',
	builder: {
		title: {
			describe: 'Note title.',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string'
		}
	},
	handler: argv => notes.addNote(argv.title, argv.body, PATHARGS)
})

yargs.command({
	command: 'remove',
	describe: 'Removes a note.',
	builder: {
		title: {
			describe: 'Note title.',
			demandOption: true,
			type: 'string'
		}
	},
	handler: argv => notes.removeNote(argv.title, PATHARGS)
})

yargs.command({
	command: 'list',
	describe: 'List the notes.',
	handler: () => notes.listNotes(PATHARGS)
})

yargs.command({
	command: 'read',
	describe: 'Reads a note.',
	builder: {
		title: {
			describe: 'Note title.',
			demandOption: true,
			type: 'string'
		}
	},
	handler: argv => notes.readNote(argv.title, PATHARGS)
})

yargs.parse()