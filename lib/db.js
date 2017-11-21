'use strict'

let store = {}

function insert (key, value) {
  if (key in store) return false
  else {
    store[key] = value
    return true
  }
}

function listAll () {

}

module.exports = {
  insert: insert,
  listAll: listAll
}
