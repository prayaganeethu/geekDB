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
    try {
      return commands[input[0]](input.slice(1))
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

function insert (keyValue) {
  if (keyValue.length >= 2) {
    try {
      let key = keyValue[0]
      let value = keyValue.slice(1).join(' ')
      return db.insert(parseKey(key), parseValue(value))
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function listAll (input) {
  if (input.length === 0) return db.listAll()
  else throw new Error('Invalid syntax')
}

function update (keyValue) {
  if (keyValue.length >= 2) {
    try {
      let key = keyValue[0]
      let value = keyValue.slice(1).join(' ')
      return db.update(parseKey(key), parseValue(value))
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function remove (key) {
  if (key.length === 1) {
    try {
      key = key[0]
      return db.remove(parseKey(key))
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function show (key) {
  if (key.length === 1) {
    try {
      key = key[0]
      return db.show(parseKey(key))
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid syntax')
}

function keyExists (key) {
  if (key.length === 1) {
    try {
      key = key[0]
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
