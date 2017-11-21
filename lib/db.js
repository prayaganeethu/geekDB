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
  if (Object.keys(store).length !== 0) return store
  return 'Empty database'
}

module.exports = {
  insert: insert,
  listAll: listAll
}
