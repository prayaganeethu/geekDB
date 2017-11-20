const prompt = require('prompt')

prompt.start()

prompt.get(['command'], function (err, response) {
  if (err) throw err
  console.log(response.command + ' ' + Date())
})
