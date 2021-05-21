'use strict'
const crypto = require('crypto')
const User = use('App/Models/User')
class ForgotPasswordController {
    async store({ request, response }) {
        try {
            const email = request.input('email')
            const user = await User.findByOrFail('email', email)
            user.token = crypto.randomBytes(10).toString('hex')
            user.token_created_at = new Date()
            await user.save() 
            return user
        } catch (err) {
            return response
                .status(err.status)
                .send({ error: { message: 'something didn`t work, does this email exist?' } })
        }
    }
}

module.exports = ForgotPasswordController
