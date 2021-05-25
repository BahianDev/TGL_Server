'use strict'

class Game {
  get validateAll() {
    return true
  }

  get rules () {
    return {
      types: 'required'
    }
  }
}

module.exports = Game
