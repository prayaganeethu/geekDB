'use strict'

const readline = require('readline')
const db = require('./lib/db')
const {execute} = require('./lib/keyValueStore')

const cwd = process.cwd()
const data = cwd + '/lib/data.json'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'kvs>> '
})

db.copyDB(data, function () {
  rl.prompt()
})

rl.on('line', (command) => {
  command = command.trim()
  if (command) {
    try {
      console.log(execute(command))
      rl.prompt()
    } catch (err) {
      console.error(err.message)
      rl.prompt()
    }
  } else rl.prompt()
}).on('close', () => {
  console.log('Exiting...')
  process.exit(0)
})
