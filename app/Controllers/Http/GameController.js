'use strict'

const Game = use('App/Models/Game')

class GameController {

  async index () {
    const games = await Game.all()
    return games
  }

  async store ({ request }) {
    const data = request.only(['type', 'description', 'range', 'price', 'max-number', 'color', 'min-cart-value'])
    const game = await Game.create(data)
    return game
  }

  async show ({ params }) {
    const game = await Game.findOrFail(params.id)
    return game
  }

  async update ({ params, request }) {
    const game = await Game.findOrFail(params.id)
    const data = request.only(['type', 'description', 'range', 'price', 'max-number', 'color', 'min-cart-value'])
    game.merge(data)
    await game.save()
    return game

  }

  async destroy ({ params }) {
    const game = await Game.findOrFail(params.id)
    await game.delete()
  }
}

module.exports = GameController
