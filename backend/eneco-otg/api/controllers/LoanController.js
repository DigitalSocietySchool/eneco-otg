'use strict';
/**
 * LoanController
 *
 * @description :: Server-side logic for managing Loans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const POWERBANK_NOT_FOUND = 'Powerbank doesn\'t exist or does not have a status  set to `unavailable`'

module.exports = {
  index(req, res) {
    let query   = {},
        fields  = ['card', 'powerbank', 'identifier'];

    fields.forEach(field => {
      if(req.param(field)) {
        query[field] = req.param(field)
      }
    })

    Loan
      .find(query)
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
    let toReturn, query;
    if(req.param('cardIdentifier')) {
      query = Card
                .findOne({ identifier: req.param('cardIdentifier') }).populate('loans')
                .then(card => {
                  if(!card) {
                    throw new sails.NotFoundError('Card doesn\'t exist')
                  }
                  let valid = false;
                  let loanToUpdate;
                  card.loans.forEach(loan => {
                    if(loan.status === 'inactive') {
                      valid = true;
                      loanToUpdate = loan;
                    }
                  })
                  if(!valid) {
                    throw new sails.NotFoundError('Loan doesn\'t exist2')
                  }
                  return Loan.update({
                    id: loanToUpdate.id
                  }, toSend)
                })
    } else {
      query = Loan
                .update({
                  id: req.param('id'),
                  status: 'inactive'
                }, toSend)
    }

    query
      .then(updatedLoans => {
        if(updatedLoans.length !== 1) {
          throw new sails.NotFoundError('Loan doesn\'t exist or has already been started')
        }
        toReturn = updatedLoans[0]
        return Powerbank.update({
          id: updatedLoans[0].powerbank,
          status: 'available'
        }, {
          status: 'unavailable'
        })
      })
      .then(updatedPowerbanks => {
        if(updatedPowerbanks.length !== 1) {
          throw new sails.NotFoundError(POWERBANK_NOT_FOUND)
        }
        toReturn.powerbank = updatedPowerbanks[0]
        res.success(toReturn)
      })
      .catch(err => {
        if(err.message === POWERBANK_NOT_FOUND) {
          Loan
            .update({
              id: toReturn.id
            }, {
              status: 'inactive'
            })
            .then(updatedLoans => {
              res.error(err)
            })
            .catch(error => {
              res.error(error)
            })
        } else {
          res.error(err)
        }
      })
  },
  end(req, res) {
    let query, toReturn;

    if(req.param('cardIdentifier')) {
      query = Card
                .findOne({ identifier: req.param('cardIdentifier') }).populate('loans')
                .then(card => {
                  if(!card) {
                    throw new sails.NotFoundError('Card doesn\'t exist')
                  }
                  let valid = false;
                  let loanToUpdate;
                  card.loans.forEach(loan => {
                    if(loan.status === 'loaned') {
                      valid = true;
                      loanToUpdate = loan;
                    }
                  })
                  if(!valid) {
                    throw new sails.NotFoundError('Loan doesn\'t exist')
                  }
                  return Loan.update({
                    id: loanToUpdate.id
                  }, {
                    returnedAt: new Date,
                    status: 'returned'
                  })
                })
    } else if(req.param('powerbankIdentifier')) {
      query = Powerbank
                .findOne({ identifier: req.param('powerbankIdentifier') }).populate('loans')
                .then(powerbank => {
                  if(!powerbank) {
                    throw new sails.NotFoundError('Powerbank doesn\'t exist')
                  }
                  let valid = false;
                  let loanToUpdate;
                  powerbank.loans.forEach(loan => {
                    if(loan.status === 'loaned') {
                      valid = true;
                      loanToUpdate = loan;
                    }
                  })
                  if(!valid) {
                    throw new sails.NotFoundError('Loan doesn\'t exist')
                  }
                  return Loan.update({
                    id: loanToUpdate.id
                  }, {
                    returnedAt: new Date,
                    status: 'returned'
                  })
                })
    } else {
      query = Loan
                .update({
                  id: req.param('id'),
                  status: 'loaned'
                }, {
                  returnedAt: new Date(),
                  status: 'returned'
                })
    }

    query
      .then(updatedLoans => {
        if(updatedLoans.length !== 1) {
          throw new sails.NotFoundError('Loan doesn\'t exist or does not have a status set to `loaned`')
        }
        toReturn = updatedLoans[0]
        let toUpdate = {
          status: 'available'
        }
        if(req.body.hasOwnProperty('store')) {
          toUpdate.store = req.body.store
        }
        return Powerbank.update({
          id: updatedLoans[0].powerbank,
          status: 'unavailable'
        }, toUpdate)
      })
      .then(updatedPowerbanks => {
        if(updatedPowerbanks.length !== 1) {
          throw new sails.NotFoundError(POWERBANK_NOT_FOUND)
        }
        toReturn.powerbank = updatedPowerbanks[0]
        res.success(toReturn)
      })
      .catch(err => {
        if(err.message === POWERBANK_NOT_FOUND) {
          Loan
            .update({
              id: toReturn.id
            }, {
              status: 'loaned'
            })
            .then(updatedLoans => {
              res.error(err)
            })
            .catch(error => {
              res.error(error)
            })
        } else {
          res.error(err)
        }
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
