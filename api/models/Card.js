/**
 * Card.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    client: {
      model: 'client'
    },
    status: {
      type: 'string',
      enum: ['activated', 'inactivated'],
      defaultsTo: 'inactivated'
    },
    active: {
      type: 'boolean',
      defaultsTo: false
    },
    identifier: {
      type: 'string'
    },
    loans: {
      collection: 'loan',
      via: 'card'
    }
  },
  beforeValidate: (values, cb) => {
    if(values.hasOwnProperty('identifier') && values.identifier.indexOf('/') > -1) {
      return cb(new sails.RequestError('No slashes are allowed in card identifiers'))
    }
    return cb()
  }
};

