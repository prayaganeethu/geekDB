const db = require('./db')

let commands = {
  'insert': insert
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
  if (command[0] === 'insert' & command.length === 3) {
    return db.insert(command[1], command[2])
  } else {
    return new Error('Invalid syntax')
  }
}

module.exports = {
  execute: execute
}
