'use strict'

let store = {}

function insert (key, value) {
  if (key in store) throw new Error('Key already exists')
  store[key] = value
  return true
}

function listAll () {
  return store
}

function update (key, value) {
  if (key in store) {
    store[key] = value
    return true
  } else throw new Error('Key doesnt exist')
}

function remove (key) {
  if (key in store) {
    delete store[key]
    return true
  } else throw new Error('Key doesnt exist')
}

function showSpecificValue (key) {
  if (key in store) return store[key]
  else throw new Error('Key doesnt exist')
}

function keyExists (key) {
  if (key in store) return true
  return false
}

module.exports = {
  insert: insert,
  listAll: listAll,
  update: update,
  remove: remove,
  show: showSpecificValue,
  keyExists: keyExists
}
