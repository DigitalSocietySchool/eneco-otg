/**
 * Powerbank.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    store: {
      model: 'store'
    },
    status: {
      type: 'string',
      enum: ['available', 'unavailable'],
      defaultsTo: 'unavailable'
    },
    identifier: {
      type: 'string',
      required: true
    },
    loans: {
      collection: 'loan',
      via: 'powerbank'
    },
    cycleCount: {
      type: 'integer',
      defaultsTo: 0
    }
  }
};

