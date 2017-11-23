'use strict'

let store = {}

function insert (key, value) {
  let splitKey = key.split('.')
  try {
    console.log('Before', store, splitKey, value)
    let res = insertDB(store, splitKey, value)
    console.log('After', res)
    return res
  } catch (err) {
    throw err
  }
}

function insertDB (db, splitKey, value) {
  if (splitKey.length === 1) {
    if (splitKey in db) throw new Error('Key already exists')
    db[splitKey.toString()] = value
    return true
  } else {
    db = db[splitKey[0]]
    splitKey = splitKey.slice(1)
    return insertDB(db, splitKey, value)
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
