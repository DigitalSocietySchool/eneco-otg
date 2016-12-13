'use strict';
/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index(req, res) {
    Client
      .find()
      .populate('cards')
      .then(clients => {
        res.success(clients)
      })
      .catch(err => {
        res.error(err)
      })
  },
  create(req, res) {
    Client
      .create(req.body)
      .then(client => {
        res.success(client)
      })
      .catch(err => {
        res.error(err)
      })
  },
  update(req, res) {
    Client
      .update(req.param('id'), req.body)
      .then(updatedClients => {
        if(updatedClients.length !== 1) {
          throw new sails.NotFoundError('Client doesnt eist')
        }
        res.success(updatedClients[0])
      })
      .catch(err => {
        res.error(err)
      })
  },
  show(req, res) {
    Client
      .findOne(req.param('id'))
      .populate('cards')
      .then(client => {
        res.success(client)
      })
      .catch(err => {
        res.error(err)
      })
  },
  destroy(req, res) {
    Client
      .destroy(req.param('id'))
      .then(destroyedClients => {
        if(destroyedClients.length !== 1) {
          throw new sails.NotFoundError('Client doesnt eist')
        }
        res.success(destroyedClients[0])
      })
      .catch(err => {
        res.error(err)
      })
  }
};

