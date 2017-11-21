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
    execute(command.trim(), (err, output) => {
      if (err) console.error(err)
      else {
        console.log(output)
      }
      rl.prompt()
    })
  } else rl.prompt()
}).on('close', () => {
  console.log('Exiting...')
  process.exit(0)
})
