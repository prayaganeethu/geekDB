const prompt = require('prompt')

prompt.start()

function recursivePrompt () {
  prompt.get(['command'], function (err, response) {
    if (err) throw err
    if (response.command) console.log(response.command + ' ' + Date())
    recursivePrompt()
  })
}

recursivePrompt()
