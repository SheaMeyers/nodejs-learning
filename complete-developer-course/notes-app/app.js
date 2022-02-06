const fs = require('fs')

fs.writeFileSync('notes.txt', 'My name is Shea.')

fs.appendFileSync('notes.txt', ' I live in Voorburg.')
