'use strict'

const {insert, listAll} = require('./db')

let validCommands = ['insert', 'listAll']

function execute (command, cb) {
  let output = command.split(/\s+/)
  let key = null
  let value = null
  let error
  command = output[0]
  if (output.length >= 2) {
    key = output[1]
    if (output[2]) value = output[2]
  }
  // console.log('COMMAND: ' + command + ' KEY: ' + key + ' VALUE: ' + value)
  if (validCommands.includes(command)) {
    if (command === 'insert' && key !== null && value !== null) {
      insert(key, value, (err, output) => {
        cb(err, output)
      })
    } else if (command === 'insert' && (key === null || value === null)) {
      error = new Error('Invalid insert: Please provide key AND value')
      cb(error, null)
    } else if (command === 'listAll' && output.length !== 1) {
      error = new Error('Invalid command syntax')
      cb(error, null)
    } else if (command === 'listAll' && output.length === 1) {
      listAll((err, output) => {
        cb(err, output)
      })
    }
  } else {
    error = new Error('Invalid command')
    cb(error, null)
  }
}

module.exports = {
  execute: execute
}
