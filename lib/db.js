'use strict'

let kvsObj = {}

function insert (key, value, cb) {
  let error
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

module.exports = {
  insert: insert
}
