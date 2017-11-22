'use strict'

let store = {}

function insert (key, value) {
  try {
    if (key in store) throw new Error('Key already exists')
    store[key] = value
    return true
  } catch (err) {
    console.error(err)
  }
}

function listAll () {
  return store
}

function update (key, value) {
  try {
    if (key in store) {
      store[key] = value
      return true
    }
    throw new Error('Key doesnt exist')
  } catch (err) {
    console.error(err.message)
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
