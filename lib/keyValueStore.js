'use strict'

const db = require('./db')

let commands = {
  'insert': insert,
  'listAll': listAll,
  'update': update,
  'delete': remove,
  'show': show,
  'keyExists': keyExists
}

function execute (input) {
  input = input.split(/\s+/)
  try {
    if (input[0] in commands) {
      if (input.length >= 3) {
        input = typeInferValue(input)
      }
      // console.log(commands[input[0]])
      return commands[input[0]](input)
    }
    throw new Error('Invalid command')
  } catch (err) {
    console.error(err.message)
  }
}

function insert (command) {
  try {
    if (command.length === 3) return db.insert(command[1], command[2])
    throw new Error('Invalid syntax')
  } catch (err) {
    console.error(err.message)
  }
}

function listAll (command) {
  try {
    if (command.length === 1) return db.listAll()
    throw new Error('Invalid syntax')
  } catch (err) {
    console.error(err.message)
  }
}

function update (command) {
  try {
    if (command.length === 3) return db.update(command[1], command[2])
    throw new Error('Invalid syntax')
  } catch (err) {
    console.error(err.message)
  }
}

function remove (command) {
  try {
    if (command.length === 2) return db.remove(command[1])
    throw new Error('Invalid syntax')
  } catch (err) {
    console.error(err.message)
  }
}

function show (command) {
  try {
    if (command.length === 2) return db.show(command[1])
    throw new Error('Invalid syntax')
  } catch (err) {
    console.error(err.message)
  }
}

function keyExists (command) {
  try {
    if (command.length === 2) return db.keyExists(command[1])
    throw new Error('Invalid syntax')
  } catch (err) {
    console.error(err.message)
  }
}

function typeInferValue (command) {
  let input = command.slice(2).join(' '), val
  try {
    val = JSON.parse(input)
  } catch (err) {
    if (err.name === 'SyntaxError') val = input
    else console.error(err)
  }
  command = command.slice(0, 2)
  command.push(val)
  return command
}

module.exports = {
  execute: execute
}
