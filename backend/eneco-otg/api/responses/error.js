'use strict'
module.exports = function error (data) {
  const req = this.req
  let res = this.res
  let toReturn;
  if(!_.isObject(data) && !_.isArray(data)) {
    res.status(400)
    toReturn = {
      code: "E_ERROR",
      message: data
    }
  } else {
    res.status(500)
  }
  if(!_.isArray(data) && _.isObject(data)) {
    if(data.hasOwnProperty('originalError') && data.originalError.hasOwnProperty('message') && data.originalError.hasOwnProperty('code')) {
      toReturn = {
        code: data.originalError.code,
        status: data.statusCode,
        message: data.originalError.message,
        stack: data.rawStack
      }
    } else {
      if(data.hasOwnProperty('status')) {
        res.status(data.status)
      }
      toReturn = {
        code: data.code,
        status: data.status,
        message: data.message
      }
    }
  }
  return res.jsonx(toReturn)
};
