'use strict'

let store = {}

function insert (key, value) {
  let keyArr = key.split('.')
  if (!keyExists(key)) {
    if (keyArr.length === 1) store[key] = value
    else {
      let db = store[keyArr[0]]
      for (let i = 1; i < keyArr.length; i++) {
        if (i === keyArr.length - 1) {
          db[keyArr[i]] = value
        } else db = db[keyArr[i]]
      }
      store[keyArr[0]] = db
    }
    return true
  } else throw new Error('Key already exists')
}

function keyExists (key) {
  let keyArr = key.split('.')
  if (keyArr.length === 1) {
    if (store[keyArr[0]]) return true
    else return false
  } else {
    let db = store
    let i
    for (i = 0; i < keyArr.length; i++) {
      if (db) db = db[keyArr[i]]
      else break
    }
    if ((i === keyArr.length) && db) return true
    else return false
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

module.exports = {
  insert: insert,
  listAll: listAll,
  update: update,
  remove: remove,
  show: showSpecificValue,
  keyExists: keyExists
}
