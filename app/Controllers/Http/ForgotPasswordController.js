'use strict'
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')
class ForgotPasswordController {
    async store({ request, response }) {
        try {
            const email = request.input('email')
            const user = await User.findByOrFail('email', email)
            const token = crypto.randomBytes(10).toString('hex')

            await user.tokens().create({
                token,      
                type: 'forgotPassword'
            })
            await Mail.send(
                ['emails.forgot_password'],
                { email, token: token, link: `${request.input('redirect_url')}?token=${token}`},
                message => {
                    message
                        .to(user.email)
                        .from('tgl@email.com', 'TGL')
                        .subject('Recuperação de Senha')
                }
            ) 
            return user
        } catch (err) {
            return response
                .status(err.status)
                .send({ error: { message: 'something didn`t work, does this email exist?' } })
        }
    }
}

module.exports = ForgotPasswordController
