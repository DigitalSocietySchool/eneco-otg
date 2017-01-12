/**
 * Client.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email'
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
    cards: {
      collection: 'card',
      via: 'client'
    }
  }
};

