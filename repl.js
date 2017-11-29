'use strict'

const readline = require('readline')
const kvs = require('./lib/keyValueStore')
const path = process.cwd() + '/lib/data.json'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'kvs>> '
})

kvs.initialize(path, function (flag) {
  if (!flag) console.error('Can\'t locate DB. Initializing new file')
  rl.prompt()
})

rl.on('line', (command) => {
  command = command.trim()
  if (command) {
    try {
      console.log(kvs.execute(command))
      rl.prompt()
    } catch (err) {
      console.error(err)
      rl.prompt()
    }
  } else rl.prompt()
}).on('close', () => {
  console.log('Exiting...')
  process.exit(0)
})
