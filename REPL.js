const prompt = require('prompt')
const {execute} = require('./lib/keyValueStore')

prompt.start()

function recursivePrompt () {
  prompt.get(['command'], function (err, response) {
    if (err) throw err
    if (response.command) {
      console.log(response.command + ' ' + Date())
      execute(response.command)
    }
    recursivePrompt()
  })
}

recursivePrompt()
