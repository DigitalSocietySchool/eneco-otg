'use strict';
/**
 * LoanController
 *
 * @description :: Server-side logic for managing Loans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index(req, res) {
    Loan
      .find()
      .populate('card')
      .populate('powerbank')
      .then(loans => {
        res.success(loans)
      })
      .catch(err => {
        res.error(err)
      })
  },
  create(req, res) {
    Loan
      .create(req.body)
      .then(loan => {
        res.success(loan)
      })
      .catch(err => {
        res.error(err)
      })
  },
  update(req, res) {
    Loan
      .update(req.param('id'), req.body)
      .then(updatedLoans => {
        if(updatedLoans.length !== 1) {
          throw new sails.NotFoundError('Loan doesnt exist')
        }
        res.success(updatedLoans[0])
      })
      .catch(err => {
        res.error(err)
      })
  },
  start(req, res) {
    let toSend = {
      loanedAt: new Date(),
      status: 'loaned'
    }
    let toReturn;
    if(req.body.hasOwnProperty('card')) {
      toSend.card = req.body.card
    }

    if(req.body.hasOwnProperty('powerbank')) {
      toSend.powerbank = req.body.powerbank
    }

    Loan
      .update(req.param('id'), toSend)
      .then(updatedLoans => {
        if(updatedLoans.length !== 1) {
          throw new sails.NotFoundError('Loan doesnt exist')
        }
        toReturn = updatedLoans[0]
        return Powerbank.update(updatedLoans[0].powerbank, {
          status: 'unavailable'
        })
      })
      .then(updatedPowerbanks => {
        if(updatedPowerbanks.length !== 1) {
          throw new sails.NotFoundError('Powerbank doesnt exist')
        }
        toReturn.powerbank = updatedPowerbanks[0]
        res.success(toReturn)
      })
      .catch(err => {
        res.error(err)
      })
  },
  end(req, res) {
    let toReturn;
    Loan
      .update(req.param('id'), {
        returnedAt: new Date(),
        status: 'returned'
      })
      .then(updatedLoans => {
        if(updatedLoans.length !== 1) {
          throw new sails.NotFoundError('Loan doesnt exist')
        }
        toReturn = updatedLoans[0]
        return Powerbank.update(updatedLoans[0].powerbank, {
          status: 'available'
        })
      })
      .then(updatedPowerbanks => {
        if(updatedPowerbanks.length !== 1) {
          throw new sails.NotFoundError('Powerbank doesnt exist')
        }
        toReturn.powerbank = updatedPowerbanks[0]
        res.success(toReturn)
      })
      .catch(err => {
        res.error(err)
      })
  },
  show(req, res) {
    Loan
      .findOne(req.param('id'))
      .populate('card')
      .populate('powerbank')
      .then(loan => {
        res.success(loan)
      })
      .catch(err => {
        res.error(err)
      })
  },
  destroy(req, res) {
    Loan
      .destroy(req.param('id'))
      .then(destroyedLoans => {
        if(destroyedLoans.length !== 1) {
          throw new sails.NotFoundError('Loan doesnt exist')
        }
        res.success(destroyedLoans[0])
      })
      .catch(err => {
        res.error(err)
      })
  }
};

