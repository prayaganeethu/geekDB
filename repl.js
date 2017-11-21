'use strict'

const readline = require('readline')
const {execute} = require('./lib/keyValueStore')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'kvs>> '
})

rl.prompt()

rl.on('line', (command) => {
  command = command.trim()
  if (command) {
    let output = execute(command)
    console.log(output)
    rl.prompt()
  } else rl.prompt()
}).on('close', () => {
  console.log('Exiting...')
  process.exit(0)
})
