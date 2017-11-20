function execute (command, cb) {
  let output = command.split(/\s+/)
  cb(null, output)
}

exports.execute = execute
