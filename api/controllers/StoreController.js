'use strict';
/**
 * StoreController
 *
 * @description :: Server-side logic for managing Stores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index(req, res) {
    Store
      .find()
      .populate('powerbanks')
      .then(stores => {
        res.success(stores)
      })
      .catch(err => {
        res.error(err)
      })
  },
  create(req, res) {
    Store
      .create(req.body)
      .then(store => {
        res.success(store)
      })
      .catch(err => {
        res.error(err)
      })
  },
  update(req, res) {
    Store
      .update(req.param('id'), req.body)
      .then(updatedStores => {
        if(updatedStores.length !== 1) {
          throw new sails.NotFoundError('Store doesnt eist')
        }
        res.success(updatedStores[0])
      })
      .catch(err => {
        res.error(err)
      })
  },
  show(req, res) {
    Store
      .findOne(req.param('id'))
      .populate('powerbanks')
      .then(store => {
        res.success(store)
      })
      .catch(err => {
        res.error(err)
      })
  },
  destroy(req, res) {
    Store
      .destroy(req.param('id'))
      .then(destroyedStores => {
        if(destroyedStores.length !== 1) {
          throw new sails.NotFoundError('Store doesnt eist')
        }
        res.success(destroyedStores[0])
      })
      .catch(err => {
        res.error(err)
      })
  }
};

