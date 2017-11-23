'use strict'

let store = {}

function insert (key, value) {
  let splitKey = key.split('.')
  try {
    console.log('Before', store, splitKey, value)
    let res = recursiveInsert(store, splitKey, value)
    console.log('After', res)
    return res
  } catch (err) {
    throw err
  }
}

function recursiveInsert (db, splitKey, value) {
  if (splitKey.length === 1) {
    if (splitKey in db) throw new Error('Key already exists')
    db[splitKey.toString()] = value
    return true
  } else if (splitKey.length === 2) {
    if (db[splitKey[0]] && (typeof db[splitKey[0]] !== 'object')) {
      throw new Error('Invalid insert')
    }
  } else {
    db = db[splitKey[0]]
    splitKey = splitKey.slice(1)
    if (db[splitKey[0]]) {
      return recursiveInsert(db, splitKey, value)
    } else throw new Error('Invalid insert')
  }
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
