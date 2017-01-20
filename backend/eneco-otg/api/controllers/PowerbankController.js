'use strict';
/**
 * PowerbankController
 *
 * @description :: Server-side logic for managing Powerbanks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index(req, res) {
    let query   = {},
        fields  = ['store', 'identifier'];

    fields.forEach(field => {
      if(req.param(field)) {
        query[field] = req.param(field)
      }
    })

    Powerbank
      .find(query)
      .populate('store')
      .populate('loans')
      .then(powerbanks => {
        res.success(powerbanks)
      })
      .catch(err => {
        res.error(err)
      })
  },
  create(req, res) {
    Powerbank
      .create(req.body)
      .then(powerbank => {
        res.success(powerbank)
      })
      .catch(err => {
        res.error(err)
      })
  },
  update(req, res) {
    Powerbank
      .update(req.param('id'), req.body)
      .then(updatedPowerbanks => {
        if(updatedPowerbanks.length !== 1) {
          throw new sails.NotFoundError('Powerbank doesnt exist')
        }
        res.success(updatedPowerbanks[0])
      })
      .catch(err => {
        res.error(err)
      })
  },
  show(req, res) {
    Powerbank
      .findOne(req.param('id'))
      .populate('store')
      .populate('loans')
      .then(powerbank => {
        res.success(powerbank)
      })
      .catch(err => {
        res.error(err)
      })
  },
  destroy(req, res) {
    Powerbank
      .destroy(req.param('id'))
      .then(destroyedPowerbanks => {
        if(destroyedPowerbanks.length !== 1) {
          throw new sails.NotFoundError('Powerbank doesnt exist')
        }
        res.success(destroyedPowerbanks[0])
      })
      .catch(err => {
        res.error(err)
      })
  }
};

