'use strict'

let store = {}

function insert (key, value) {
  if (key in store) {
    console.error('Key already exists')
    return null
  } else {
    store[key] = value
    return true
  }
}

function listAll () {
  return store
}

function update (key, value) {
  if (key in store) {
    store[key] = value
    return true
  } else {
    console.error('Key doesnt exist')
    return null
  }
}

function remove (key) {
  try {
    if (key in store) {
      delete store[key]
      return true
    }
    throw new Error('Key doesnt exist')
  } catch (err) {
    console.error(err.message)
  }
}

function showSpecificValue (key) {
  try {
    if (key in store) return store[key]
    throw new Error('Key doesnt exist')
  } catch (err) {
    console.error(err.message)
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
