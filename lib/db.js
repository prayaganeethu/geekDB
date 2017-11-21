'use strict'

let kvsObj = {}
let error

function insert (key, value, cb) {
  let obj = {}
  if (key in kvsObj) {
    error = new Error('Key already exists')
    cb(error, null)
  }
  kvsObj[key] = value
  if (key in kvsObj && kvsObj[key] === value) {
    error = null
    obj[key] = value
    cb(error, obj)
  }
}

function listAll (key, value, cb) {
  if (Object.keys(kvsObj).length === 0) {
    error = new Error('No data in DB')
    cb(error, null)
  } else cb(null, kvsObj)
}

module.exports = {
  insert: insert,
  listAll: listAll
}
