'use strict'

const db = require('./db')

let dbCommands = {
  'insert': db.insert,
  'listAll': db.listAll,
  'update': db.update,
  'delete': db.remove,
  'show': db.show,
  'keyExists': db.keyExists
}

function execute (input) {
  input = input.split(/\s+/)
  if (input[0] in dbCommands) {
    try {
      return validateAndProcess(input)
    } catch (err) {
      throw err
    }
  } else throw new Error('Invalid command')
}

function validateAndProcess (input) {
  try {
    validate(input)
    let key = input[1]
    let value = input.slice(2).join(' ')
    return dbCommands[input[0]](parseKey(key), parseValue(value))
  } catch (err) {
    throw err
  }
}

function validate (input) {
  let err = new Error('Invalid syntax')
  if (input[0] === 'insert' || input[0] === 'update') {
    if (!(input.length >= 3)) throw err
  } else if (input[0] === 'delete' || input[0] === 'show' || input[0] === 'keyExists') {
    if (!(input.length === 2)) throw err
  } else if (!(input.length === 1)) throw err
}

function parseKey (key) {
  try {
    if (key) {
      if (key[0] !== '"' || key[key.length - 1] !== '"') {
        throw new Error('Missing double quotes around the key')
      }
      key = JSON.parse(key)
      if (key.length === 0) throw new Error('Key cannot be empty')
      return key
    }
  } catch (err) {
    throw err
  }
}

function parseValue (value) {
  try {
    if (value) return JSON.parse(value)
  } catch (err) {
    throw err
  }
}

module.exports = {
  execute: execute
}
