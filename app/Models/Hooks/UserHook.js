'use strict'
const Mail = use('Mail')
const UserHook = exports = module.exports = {}

UserHook.sendNewUserEmail = async userInstance => {
    const { email, username } = await userInstance
    
    await Mail.send(
        ['emails.new_user'],
        { email, username },
        message => {
            message
                .to(email)
                .from('wesley@gmail.com', 'Wesley')
                .subject('Seja bem vindo a nossa plataforma')
        }
    )
}
