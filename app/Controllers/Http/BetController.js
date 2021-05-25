'use strict'
const Bet = use('App/Models/Bet')

class BetController {

  async index ({ auth  }) {
    const bets = await Bet.query()
      .where('user_id', auth.user.id)
      .fetch()

    return bets
  }

  async store ({ request, auth }) {
    const data = request.only(['game_id', 'numbers', 'price'])
    const bet = await Bet.create({... data , numbers:`{${data.numbers}}` ,user_id: auth.user.id})
    return bet
  }


  async show ({ params }) {
    const bet = await Bet.findOrFail(params.id)
      
    return bet
  }


  async update ({ params, request }) {
    const bet = await Bet.findOrFail(params.id)
    const data = request.only(['game_id', 'numbers', 'price'])
    bet.merge(data)
    await bet.save()
    return bet

  }


  async destroy ({ params }) {
    const bet = await Bet.findOrFail(params.id)
    await bet.delete()
  }
}

module.exports = BetController
