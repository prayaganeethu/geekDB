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
  if (input[0] in commands) {
    if (input) {
      try {
        return commands[input[0]](input)
      } catch (err) {
        throw err
      }
    } else return null
  } else throw new Error('Invalid command')
}

function parseValue (input) {
  let allowed = [null, false]
  let inferred
  try {
    inferred = typeInferValue(input.slice(2).join(' '))
  } catch (err) {
    throw err
  }
  input = input.slice(0, 2)
  if (inferred || allowed.includes(inferred)) input.push(inferred)
  else return null
  return input
}

function parseKey (input) {
  try {
    input = isMissingQuote(input)
    if (input) return isKeyEmpty(input)
    else return null
  } catch (err) {
    throw err
  }
}

function isMissingQuote (input) {
  if (input[1][0] !== '"' || input[1][input[1].length - 1] !== '"') {
    throw new Error('Missing double quotes around the key')
  }
  input[1] = JSON.parse(input[1])
  return input
}

function isKeyEmpty (input) {
  if (input[1].length === 0) throw new Error('Key cannot be empty')
  return input
}

function insert (command) {
  if (command.length >= 3) {
    try {
      command = parseKey(command)
      if (command) {
        command = parseValue(command)
      } else return null
      if (command) return db.insert(command[1], command[2])
      else return null
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function listAll (command) {
  if (command.length === 1) return db.listAll()
  else throw new Error('Invalid syntax')
}

function update (command) {
  if (command.length >= 3) {
    try {
      command = parseKey(command)
      if (command) {
        command = parseValue(command)
      } else return null
      if (command) return db.update(command[1], command[2])
      else return null
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function remove (command) {
  if (command.length >= 2) {
    try {
      command = parseKey(command)
      if (command) {
        console.log('Before', command[1])
        return db.remove(command[1])
      } else return null
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function show (command) {
  if (command.length === 2) {
    try {
      command = parseKey(command)
      if (command) return db.show(command[1])
      else return null
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function keyExists (command) {
  if (command.length === 2) {
    try {
      command = parseKey(command)
      if (command) return db.keyExists(command[1])
      else return null
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function typeInferValue (value) {
  try {
    return JSON.parse(value)
  } catch (err) {
    throw err
  }
}

module.exports = {
  execute: execute
}
