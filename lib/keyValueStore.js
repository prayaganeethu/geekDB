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
    if (input) return commands[input[0]](input)
    else return null
  } else {
    console.error(new Error('Invalid command'))
    return null
  }
}

function parseValue (input) {
  let allowed = [null, false]
  let inferred = typeInferValue(input.slice(2).join(' '))
  input = input.slice(0, 2)
  if (inferred || allowed.includes(inferred)) input.push(inferred)
  else return null
  return input
}

function parseKey (input) {
  input = isMissingQuote(input)
  if (input) {
    return isKeyEmpty(input)
  }
  return null
}

function isMissingQuote (input) {
  if (input[1][0] !== '"' || input[1][input[1].length - 1] !== '"') {
    console.error(new Error('Missing double quotes around the key'))
    return null
  }
  input[1] = JSON.parse(input[1])
  return input
}

function isKeyEmpty (input) {
  if (input[1].length === 0) {
    console.error(new Error('Key cannot be empty'))
    return null
  }
  return input
}

function insert (command) {
  if (command.length >= 3) {
    command = parseKey(command)
    if (command) {
      command = parseValue(command)
    } else return null
    if (command) {
      try {
        return db.insert(command[1], command[2])
      } catch (err) {
        console.error(err)
        return null
      }
    } else return null
  } else {
    console.error(new Error('Invalid syntax'))
    return null
  }
}

function listAll (command) {
  if (command.length === 1) return db.listAll()
  else {
    console.error(new Error('Invalid syntax'))
    return null
  }
}

function update (command) {
  if (command.length >= 3) {
    command = parseKey(command)
    if (command) {
      command = parseValue(command)
    } else return null
    if (command) {
      try {
        return db.update(command[1], command[2])
      } catch (err) {
        console.error(err)
        return null
      }
    } else return null
  } else {
    console.error(new Error('Invalid syntax'))
    return null
  }
}

function remove (command) {
  if (command.length >= 2) {
    command = parseKey(command)
    if (command) {
      try {
        return db.remove(command[1])
      } catch (err) {
        console.error(err)
        return null
      }
    } else return null
  } else {
    console.error(new Error('Invalid syntax'))
    return null
  }
}

function show (command) {
  if (command.length >= 2) {
    command = parseKey(command)
    if (command) return db.show(command[1])
    else return null
  } else {
    console.error(new Error('Invalid syntax'))
    return null
  }
}

function keyExists (command) {
  if (command.length >= 2) {
    command = parseKey(command)
    if (command) return db.keyExists(command[1])
    else return null
  } else {
    console.error(new Error('Invalid syntax'))
    return null
  }
}

function typeInferValue (value) {
  try {
    return JSON.parse(value)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  execute: execute
}
