'use strict'

const db = require('./db')

let commands = {
  'insert': insert,
  'listAll': listAll
}

function execute (input) {
  input = input.split(/\s+/)
  try {
    if (input[0] in commands) return commands[input[0]](input)
    else throw new Error('Invalid command')
  } catch (err) {
    console.error(err.message)
    return false
  }
}

function insert (command) {
  if (command.length === 3) return db.insert(command[1], command[2])
  else return new Error('Invalid syntax')
}

function listAll (command) {
  if (command.length === 1) return db.listAll()
  else return new Error('Invalid syntax')
}

module.exports = {
  execute: execute
}
