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
    let key = null
    let value
    console.log('Before', input)
    input = splitUserInput(input)
    console.log('After', input)
    validate(input)
    if (input[1]) key = input[1]
    if (input[2]) value = input[2]
    return dbCommands[input[0]](parseKey(key), parseValue(value))
  } catch (err) {
    throw err
  }
}

function splitUserInput (input) {
  let keyValue = null
  if (input.slice(1).join(' ')) {
    keyValue = extractKeyValue(input.slice(1))
  }
  input = input.slice(0, 1)
  if (keyValue) {
    input[1] = keyValue[0].trim()
    if (keyValue[1]) input[2] = keyValue[1].trim()
  }
  return input
}

function extractKeyValue (input) {
  try {
    let keyValue = input.join(' ')
    let i = 1
    let err = new Error('Missing double quotes around the key')
    let key = '"'
    if (keyValue[0] !== '"') throw err
    else {
      while (!(keyValue[i] === '"' && keyValue[i - 1] !== '\\') && (i < keyValue.length - 1)) {
        key += keyValue[i]
        i++
      }
      if (keyValue[i] === '"' && keyValue[i - 1] !== '\\') key += '"'
      if ((i === keyValue.length - 1) && (key[i] !== '"')) throw err
      else return [key, keyValue.slice(i + 1)]
    }
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
