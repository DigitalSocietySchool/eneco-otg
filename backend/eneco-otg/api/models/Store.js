/**
 * Store.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    street: {
      type: 'string'
    },
    houseNumber: {
      type: 'string'
    },
    postcode: {
      type: 'string'
    },
    province: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    identifier: {
      type: 'string'
    },
    powerbanks: {
      collection: 'powerbank',
      via: 'store'
    }
  },
  beforeValidate: (values, cb) => {
    if(values.hasOwnProperty('houseNumber')) {
      values.houseNumber = String(values.houseNumber);
    }

    cb()
  }
};

