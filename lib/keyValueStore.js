function execute (command) {
  console.log(command.replace(/ +/g, ' ').split(' '))
}

exports.execute = execute
