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
      if (input) return commands[input[0]](input)
      else return null
    }
    throw new Error('Invalid command')
  } catch (err) {
    console.error(err)
  }
}

function checkInput (input) {
  if (input.length >= 2) {
    if (input[1][0] !== '"' && input[1][input[1].length - 1] !== '"') {
      console.error('Missing quotes around the key')
      return null
    }
    input[1] = JSON.parse(input[1])
    if (input[1].length === 0) {
      console.error('Key cannot be empty')
      return null
    }
  }
  if (input.length >= 3) {
    let inferred = typeInferValue(input.slice(2).join(' '))
    input = input.slice(0, 2)
    if (inferred) input.push(inferred)
    else return null
  }
  return input
}

function insert (command) {
  if (command.length === 3) {
    command = checkInput(command)
    if (command) return db.insert(command[1], command[2])
    else return null
  } else {
    console.error('Invalid syntax')
    return null
  }
}

function listAll (command) {
  if (command.length === 1) return db.listAll()
  else {
    console.error('Invalid syntax')
    return null
  }
}

function update (command) {
  if (command.length === 3) {
    command = checkInput(command)
    if (command) return db.update(command[1], command[2])
    else return null
  } else {
    console.error('Invalid syntax')
    return null
  }
}

function remove (command) {
  if (command.length === 2) {
    command = checkInput(command)
    if (command) return db.remove(command[1])
    else return null
  } else {
    console.error('Invalid syntax')
    return null
  }
}

function show (command) {
  if (command.length === 2) {
    command = checkInput(command)
    if (command) return db.show(command[1])
    else return null
  } else {
    console.error('Invalid syntax')
    return null
  }
}

function keyExists (command) {
  if (command.length === 2) {
    command = checkInput(command)
    if (command) return db.keyExists(command[1])
    else return null
  } else {
    console.error('Invalid syntax')
    return null
  }
}

function typeInferValue (value) {
  try {
    return JSON.parse(value)
  } catch (err) {
    console.error(err)
    return null
  }
}

module.exports = {
  execute: execute
}
