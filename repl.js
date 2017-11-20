const readline = require('readline')
const {execute} = require('./lib/keyValueStore')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'kvs>> '
})

rl.prompt()

rl.on('line', (command) => {
  if (command.trim()) {
    console.log(command + ' ' + Date())
    execute(command.trim())
  }
  rl.prompt()
}).on('close', () => {
  console.log('Exiting...')
  process.exit(0)
})
