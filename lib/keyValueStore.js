function execute (command) {
  console.log(command.trim().replace(/ +/g, ' ').split(' '))
}

exports.execute = execute
