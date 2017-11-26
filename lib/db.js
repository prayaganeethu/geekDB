'use strict'

let store = {}

function insert (key, value) {
  let keyArr = key.split('.')
  if (!keyExists(key)) {
    if (keyArr.length === 1) store[key] = value
    else {
      let db = {}
      if (typeof db[keyArr[0]] === 'object') db = store[keyArr[0]]
      else throw new Error('Invalid insert')
      for (let i = 1; i < keyArr.length; i++) {
        if (i === keyArr.length - 1) {
          db[keyArr[i]] = value
        } else {
          if (typeof db[keyArr[i]] === 'object') db = db[keyArr[i]]
          else throw new Error('Invalid insert')
        }
      }
      store[keyArr[0]] = db
    }
    return true
  } else throw new Error('Key already exists')
}

function update (key, value) {
  let keyArr = key.split('.')
  if (keyExists(key)) {
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
  } else throw new Error('Key doesn\'t exist')
}

function remove (key) {
  let keyArr = key.split('.')
  if (keyExists(key)) {
    if (keyArr.length === 1) delete store[key]
    else {
      let db = store[keyArr[0]]
      for (let i = 1; i < keyArr.length; i++) {
        if (i === keyArr.length - 1) {
          delete db[keyArr[i]]
        } else db = db[keyArr[i]]
      }
      store[keyArr[0]] = db
    }
    return true
  } else throw new Error('Key doesn\'t exist')
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

function listAll () {
  return store
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
