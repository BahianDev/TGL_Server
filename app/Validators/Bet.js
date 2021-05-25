'use strict'

class Bet {
  get validateAll() {
    return true
  }
  
  get rules () {
    return {
    game_id: 'required',
    numbers: 'required',
    price: 'required'
    }
  }
}

module.exports = Bet
