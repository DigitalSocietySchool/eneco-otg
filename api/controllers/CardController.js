'use strict';
/**
 * CardController
 *
 * @description :: Server-side logic for managing Cards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index(req, res) {
    Card
      .find()
      .populate('client')
      .then(cards => {
        res.success(cards)
      })
      .catch(err => {
        res.error(err)
      })
  },
  create(req, res) {
    Card
      .create(req.body)
      .then(card => {
        res.success(card)
      })
      .catch(err => {
        res.error(err)
      })
  },
  update(req, res) {
    Card
      .update(req.param('id'), req.body)
      .then(updatedCards => {
        if(updatedCards.length !== 1) {
          throw new sails.NotFoundError('Card doesnt eist')
        }
        res.success(updatedCards[0])
      })
      .catch(err => {
        res.error(err)
      })
  },
  show(req, res) {
    Card
      .findOne(req.param('id'))
      .populate('client')
      .then(card => {
        res.success(card)
      })
      .catch(err => {
        res.error(err)
      })
  },
  destroy(req, res) {
    Card
      .destroy(req.param('id'))
      .then(destroyedCards => {
        if(destroyedCards.length !== 1) {
          throw new sails.NotFoundError('Card doesnt eist')
        }
        res.success(destroyedCards[0])
      })
      .catch(err => {
        res.error(err)
      })
  }
};

