'use strict'

const fs = require('fs')
const cwd = process.cwd()
const data = cwd + '/lib/data.json'

let store

function loadDB (db, cb) {
  fs.readFile(db, 'utf8', 'r+', (err, data) => {
    if (err) store = {}
    if (data) store = JSON.parse(data)
    cb()
  })
}

function commit () {
  fs.writeFile(data, JSON.stringify(store, null, 4), 'utf8', 'w+', (err, data) => {
    if (err) throw err
  })
  return true
}

function insert (keyArr, value) {
  try {
    if (keyArr.length === 1) {
      if (keyArr[0] in store) throw new Error('Key already exists')
      else store[keyArr[0]] = value
    } else {
      nestedInsert(keyArr, value)
    }
    return true
  } catch (err) {
    throw err
  }
}

function nestedInsert (keyArr, value) {
  let db
  if (keyArr[0] in store) db = store[keyArr[0]]
  else throw new Error('Key already exists')
  for (let i = 1; i < keyArr.length; i++) {
    if (i === keyArr.length - 1) db[keyArr[i]] = value
    else {
      if (keyArr[i] in db) {
        if (typeof db[keyArr[i]] === 'object') db = db[keyArr[i]]
        else throw new Error('Invalid insert')
      } else throw new Error('Invalid key')
    }
  }
  store[keyArr[0]] = db
}

function update (keyArr, value) {
  try {
    if (keyArr.length === 1) {
      if (keyArr[0] in store) store[keyArr[0]] = value
      else throw new Error('Key doesn\'t exist')
    } else {
      nestedUpdate(keyArr, value)
    }
    return true
  } catch (err) {
    throw err
  }
}

function nestedUpdate (keyArr, value) {
  let db, i, err = new Error('Key doesn\'t exist')
  if (keyArr[0] in store) db = store[keyArr[0]]
  else throw err
  for (i = 1; i < keyArr.length - 1; i++) {
    if (keyArr[i] in db) {
      if (typeof db[keyArr[i]] === 'object') db = db[keyArr[i]]
      else throw new Error('Invalid update')
    } else throw new Error('Invalid key')
  }
  if (keyArr[i] in db) db[keyArr[i]] = value
  else throw err
  store[keyArr[0]] = db
}

function remove (keyArr) {
  try {
    if (keyArr.length === 1) {
      if (keyArr[0] in store) delete store[keyArr[0]]
      else throw new Error('Key doesn\'t exist')
    } else {
      nestedRemove(keyArr)
    }
    return true
  } catch (err) {
    throw err
  }
}

function nestedRemove (keyArr) {
  let db, i, err = new Error('Key doesn\'t exist')
  if (keyArr[0] in store) db = store[keyArr[0]]
  else throw err
  for (i = 1; i < keyArr.length - 1; i++) {
    if (keyArr[i] in db) {
      if (typeof db[keyArr[i]] === 'object') db = db[keyArr[i]]
      else throw new Error('Invalid update')
    } else throw new Error('Invalid key')
  }
  if (keyArr[i] in db) delete db[keyArr[i]]
  else throw err
  store[keyArr[0]] = db
}

function keyExists (key) {
  try {
    if (showSpecificValue(key) !== undefined) return true
    else return false
  } catch (err) {
    if (err.message === 'Key doesn\'t exist') return false
    else throw err
  }
}

function showSpecificValue (keyArr) {
  try {
    if (keyArr.length === 1) {
      if (keyArr[0] in store) return store[keyArr[0]]
      else throw new Error('Key doesn\'t exist')
    } else return nestedShow(keyArr)
  } catch (err) {
    throw err
  }
}

function nestedShow (keyArr) {
  let db = store
  let i
  for (i = 0; i < keyArr.length; i++) {
    if (keyArr[i] in db) {
      db = db[keyArr[i]]
    } else break
  }
  if ((i === keyArr.length) && db) return db
  else throw new Error('Key doesn\'t exist')
}

function listAll () {
  return store
}

module.exports = {
  insert: insert,
  listAll: listAll,
  update: update,
  remove: remove,
  show: showSpecificValue,
  keyExists: keyExists,
  loadDB: loadDB,
  commit: commit
}
