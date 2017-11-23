'use strict'

let store = {}

function insert (key, value) {
  let splitKey = key.split('.')
  try {
    let res = recursiveInsert(store, splitKey, value)
    return res
  } catch (err) {
    throw err
  }
}

function recursiveInsert (db, splitKey, value) {
  try {
    checkInsert(db, splitKey, value)
    if (splitKey.length === 1) {
      return insertDB(db, splitKey, value)
    } else {
      db = db[splitKey[0]]
      splitKey = splitKey.slice(1)
      if (db[splitKey[0]]) {
        return recursiveInsert(db, splitKey, value)
      } else throw new Error('Invalid insert')
    }
  } catch (err) {
    throw err
  }
}

function insertDB (db, key, value) {
  if (key in db) throw new Error('Key already exists')
  key = key.toString()
  db[key] = value
  return true
}

function checkInsert (db, splitKey, value) {
  if (splitKey.length === 2) {
    if (db[splitKey[0]] && (typeof db[splitKey[0]] !== 'object')) {
      throw new Error('Invalid insert')
    }
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
