const db = require('./db')

let commands = {
  'insert': insert,
  'listAll': listAll
}

function execute (input) {
  input = input.split(/\s+/)
  if (input[0] in commands) {
    return commands[input[0]](input)
  } else {
    return new Error('Invalid command')
  }
}

function insert (command) {
  if (command.length === 3) {
    if (command[1] !== 'undefined' && command[1] !== 'null' && command[2] !== 'undefined') {
      return db.insert(command[1], command[2])
    } else {
      return new Error('Invalid key/value')
    }
  } else {
    return new Error('Invalid syntax')
  }
}

function listAll (command) {
  if (command.length === 1) return db.listAll()
  else return new Error('Invalid syntax')
}

module.exports = {
  execute: execute
}
