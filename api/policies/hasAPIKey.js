/**
 * hasAPIKey
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  console.log('header key is ' + req.headers.apikey)
  console.log('CFg key is ' + sails.config.apiKey)
  if(req.headers.hasOwnProperty('apikey')) {
    if(sails.config.apiKey === req.headers.apikey) {
      return next()
    }
  }

  return res.error(new sails.AuthError('Invalid API Key'))
};
