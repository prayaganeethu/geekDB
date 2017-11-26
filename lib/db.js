'use strict'

let store = {}

function insert (key, value) {
  let splitKey = key.split('.')
  try {
    return recursiveInsert(store, splitKey, value)
  } catch (err) {
    throw err
  }
}

function recursiveInsert (db, splitKey, value) {
  try {
    let res = ifArrayThenInsert(db, splitKey, value)
    if (res) return res
    if (splitKey.length === 1) {
      return insertDB(db, splitKey, value)
    } else {
      db = db[splitKey[0]]
      splitKey = splitKey.slice(1)
      return recursiveInsert(db, splitKey, value)
    }
  } catch (err) {
    throw err
  }
}

function insertDB (db, key, value) {
  key = key.toString()
  if (key in db) throw new Error('Key already exists')
  db[key] = value
  return true
}

function ifArrayThenInsert (db, splitKey, value) {
  if (splitKey.length === 2) {
    if (db[splitKey[0]] && (typeof db[splitKey[0]] !== 'object')) {
      throw new Error('Invalid insert')
    }
  }
  if (db[splitKey[0]] && (Object.getPrototypeOf(db[splitKey[0]]).length === 0)) {
    db = db[splitKey[0]]
    if ((splitKey[1] >= db.length) && (splitKey[1] >= 0) && (typeof Number(splitKey[1]) === 'number')) {
      db.push(value)
      return true
    } else throw new Error('Invalid key')
  }
}

function update (key, value) {
  let splitKey = key.split('.')
  try {
    return recursiveUpdate(store, splitKey, value)
  } catch (err) {
    throw err
  }
}

function recursiveUpdate (db, splitKey, value) {
  try {
    if (splitKey.length === 1) {
      return updateDB(db, splitKey, value)
    } else {
      db = db[splitKey[0]]
      splitKey = splitKey.slice(1)
      if (db[splitKey[0]]) {
        return recursiveUpdate(db, splitKey, value)
      } else throw new Error('Key doesnt exist')
    }
  } catch (err) {
    throw err
  }
}

function updateDB (db, key, value) {
  key = key.toString()
  if (key in db) db[key] = value
  else throw new Error('Key doesnt exist')
  return true
}

function listAll () {
  return store
}

function remove (key) {
  let splitKey = key.split('.')
  try {
    return recursiveRemove(store, splitKey)
  } catch (err) {
    throw err
  }
}

function recursiveRemove (db, splitKey) {
  try {
    let res = ifArrayThenRemove(db, splitKey)
    if (res) return res
    if (splitKey.length === 1) {
      return removeDB(db, splitKey)
    } else {
      db = db[splitKey[0]]
      splitKey = splitKey.slice(1)
      if (db[splitKey[0]]) {
        return recursiveRemove(db, splitKey)
      } else throw new Error('Key doesnt exist')
    }
  } catch (err) {
    throw err
  }
}

function removeDB (db, key) {
  key = key.toString()
  if (key in db) delete db[key]
  else throw new Error('Key doesnt exist')
  return true
}

function ifArrayThenRemove (db, splitKey, value) {
  if (splitKey.length === 2) {
    if (db[splitKey[0]] && (Object.getPrototypeOf(db[splitKey[0]]).length === 0)) {
      db = db[splitKey[0]]
      if ((splitKey[1] < db.length) && (splitKey[1] >= 0) && (typeof Number(splitKey[1]) === 'number')) {
        db.splice(splitKey[1], 1)
        return true
      } else throw new Error('Invalid key')
    }
  }
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
