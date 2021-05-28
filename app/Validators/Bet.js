'use strict'

class Bet {
  get validateAll() {
    return true
  }
  
  get rules () {
    return {
    bets: 'required'
    }
  }
}

module.exports = Bet
