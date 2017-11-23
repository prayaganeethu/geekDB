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
  } else {
    console.error(new Error('Key doesnt exist'))
    return null
  }
}

function remove (key) {
  if (key in store) {
    delete store[key]
    return true
  } else {
    console.error(new Error('Key doesnt exist'))
    return null
  }
}

function showSpecificValue (key) {
  if (key in store) return store[key]
  else {
    console.error(new Error('Key doesnt exist'))
    return null
  }
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
