function execute (command, cb) {
  let output = command.split(/\s+/)
  setTimeout(function () {
    cb(null, output)
  }, 2000)
}

exports.execute = execute
