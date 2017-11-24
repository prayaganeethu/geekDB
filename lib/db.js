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

function checkInsert (db, splitKey, value) {
  if (splitKey.length === 2) {
    if (db[splitKey[0]] && (typeof db[splitKey[0]] !== 'object')) {
      throw new Error('Invalid insert')
    }
  }
}

function update (key, value) {
  let splitKey = key.split('.')
  try {
    let res = recursiveUpdate(store, splitKey, value)
    return res
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
    let res = recursiveRemove(store, splitKey)
    return res
  } catch (err) {
    throw err
  }
}

function recursiveRemove (db, splitKey) {
  try {
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

// function remove (key) {
//   if (key in store) {
//     delete store[key]
//     return true
//   } else throw new Error('Key doesnt exist')
// }

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
