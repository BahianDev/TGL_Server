'use strict'
const Token = use('App/Models/Token')
const moment = require('moment')
class ResetPasswordController {
    async store({ request, response  }) {
        const { token, password } = request.only(['token', 'password'])

        const userToken = await Token.findByOrFail('token', token)
        const tokenExpired = moment()
            .subtract('2', 'days')
            .isAfter(userToken.created_at)
        if (tokenExpired) {
            return response
                .status(401)
                .send({ error: { message: 'O token de recuperação está expirado' } })
        }

        const user = await userToken.user().fetch()

        user.password = password

        await user.save()

    }
}

module.exports = ResetPasswordController
