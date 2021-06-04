'use strict'
const Bet = use('App/Models/Bet')
const Game = use('App/Models/Game')
const Database = use('Database')
const Mail = use('Mail')

class BetController {

  async index ({ auth  }) {
    const bets = await Bet.query()
      .where('user_id', auth.user.id)
      .fetch()

    return bets
  }

  async store ({ request, auth }) {
    const data = request.only(['bets'])
    data.bets.forEach(v => {
      v.user_id = auth.user.id
    })
    const betsWithType = await Promise.all(data.bets.map(async(item) => {
     const type = await Database.select('type').from('games').where('id', item.game_id)
     return {...item, type: type[0].type}
    }))
    const bets = await Bet.createMany(data.bets)
    
    await Mail.send(
        ['emails.index'],
        { view: 'emails.new_bet', username: auth.user.username, bets: betsWithType},
        message => {
            message
                .to(auth.user.email)
                .from('wesley@gmail.com', 'Wesley')
                .subject('Nova aposta realizada')
        }
    )
    return bets
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
