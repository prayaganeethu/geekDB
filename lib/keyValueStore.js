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
  console.log(input)
  input = input.split(/\s+/)
  if (input[0] in commands) {
    try {
      return commands[input[0]](input)
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid command')
}

function parseKey (key) {
  try {
    key = isMissingQuote(key)
    isKeyEmpty(key)
    return key
  } catch (err) {
    throw err
  }
}

function isMissingQuote (key) {
  if (key[0] !== '"' || key[key.length - 1] !== '"') {
    throw new Error('Missing double quotes around the key')
  }
  return JSON.parse(key)
}

function isKeyEmpty (key) {
  if (key.length === 0) throw new Error('Key cannot be empty')
}

function insert (command) {
  if (command.length >= 3) {
    try {
      let key = command[1]
      let value = command.slice(2).join(' ')
      return db.insert(parseKey(key), parseValue(value))
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
      let key = command[1]
      let value = command.slice(2).join(' ')
      return db.update(parseKey(key), parseValue(value))
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function remove (command) {
  if (command.length >= 2) {
    try {
      let key = command[1]
      return db.remove(parseKey(key))
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function show (command) {
  if (command.length === 2) {
    try {
      let key = command[1]
      return db.show(parseKey(key))
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function keyExists (command) {
  if (command.length === 2) {
    try {
      let key = command[1]
      return db.keyExists(parseKey(key))
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function parseValue (value) {
  try {
    return JSON.parse(value)
  } catch (err) {
    throw err
  }
}

module.exports = {
  execute: execute
}
