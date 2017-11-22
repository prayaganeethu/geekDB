'use strict'

let store = {}

function insert (key, value) {
  try {
    if (key in store) throw new Error('Key already exists')
    else {
      store[key] = value
      return true
    }
  } catch (err) {
    console.error(err.message)
  }
}

function listAll () {
  return store
}

module.exports = {
  insert: insert,
  listAll: listAll
}
