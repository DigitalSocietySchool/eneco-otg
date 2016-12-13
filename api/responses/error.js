'use strict'
/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

module.exports = function error (data) {

  // Get access to `req`, `res`, & `sails`
  const req = this.req
  var res = this.res
  let toReturn


  if(!_.isObject(data) && !_.isArray(data)) {
    // Set status code
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
