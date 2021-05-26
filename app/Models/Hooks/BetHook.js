'use strict'
const Mail = use('Mail')
const BetHook = exports = module.exports = {}

BetHook.sendNewBetEmail = async betInstance => {
    const { email, username } = await betInstance.user().fetch()
    const { type } = await betInstance.games().fetch()
    const { numbers, price } = await betInstance
    
    await Mail.send(
        ['emails.index'],
        { view: 'emails.new_bet', username, type, numbers, price },
        message => {
            message
                .to(email)
                .from('wesley@gmail.com', 'Wesley')
                .subject('Nova aposta realizada')
        }
    )
}
