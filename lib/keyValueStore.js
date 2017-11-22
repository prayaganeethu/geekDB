'use strict'

const db = require('./db')

let commands = {
  'insert': insert,
  'listAll': listAll,
  'update': update
}

function execute (input) {
  input = input.split(/\s+/)
  try {
    if (input[0] in commands) return commands[input[0]](input)
    throw new Error('Invalid command')
  } catch (err) {
    console.error(err.message)
    return false
  }
}

function insert (command) {
  try {
    if (command.length === 3) return db.insert(command[1], command[2])
    throw new Error('Invalid syntax')
  } catch (err) {
    console.error(err.message)
    return false
  }
}

function listAll (command) {
  try {
    if (command.length === 1) return db.listAll()
    throw new Error('Invalid syntax')
  } catch (err) {
    console.error(err.message)
    return false
  }
}

function update (command) {
  try {
    if (command.length === 3) return db.update(command[1], command[2])
    throw new Error('Invalid syntax')
  } catch (err) {
    console.error(err.message)
    return false
  }
}

module.exports = {
  execute: execute
}
