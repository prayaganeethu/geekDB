'use strict'

const {insert, listAll} = require('./db')

let commandFunc = {
  'insert': ifInsert,
  'listAll': ifListAll
}

let validCommands = ['insert', 'listAll']

function execute (command, cb) {
  let output = command.split(/\s+/), key = null, value = null, error
  command = output[0]
  if (output.length >= 2) {
    key = output[1]
    if (output[2]) value = output[2]
  }
  if (validCommands.includes(command)) {
    let func
    commandMap(command, (err, out) => {
      if (err) console.error(err)
      func = out
    })
    commandFunc[command](output, (err, isValid) => {
      if (isValid) func(key, value, (err, output) => { cb(err, output) })
      else cb(err, null)
    })
  } else {
    error = new Error('Invalid command')
    cb(error, null)
  }
}

function ifInsert (command, callback) {
  let error
  if (command[1] !== null && command[2] !== null && command.length === 3) {
    callback(null, true)
  } else {
    error = new Error('Invalid insert')
    callback(error, null)
  }
}

function ifListAll (command, callback) {
  let error
  console.log('ifListAll', command)
  if (command.length !== 1) {
    error = new Error('Invalid command syntax')
    callback(error, null)
  } else callback(null, true)
}

function commandMap (command, callback) {
  let func
  switch (command) {
    case 'insert': func = insert
      break
    case 'listAll': func = listAll
      break
  }
  callback(null, func)
}

module.exports = {
  execute: execute
}
