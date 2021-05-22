'use strict'
const moment = require('moment')
const Factory = use('Factory')
const Database = use('Database')
const { test, trait } = use('Test/Suite')('Reset Password')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it cannot reset password after 2 days of forgot password request', async ({ client }) => {
  const email = 'wesley@email.com'
  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make()

  await user.tokens().save(userToken)

  const dateSubtract = moment().subtract('2', 'days').format('YYYY-MM-DD HH:mm:ss');
  console.log(dateSubtract)

  await Database.table('tokens')
    .where('token', userToken.token)
    .update('created_at', dateSubtract)
  
  await userToken.reload()

  const response = await client
    .post('reset')
    .send({
      token: userToken.token,
      password: 'novasenha'
    })
    .end()

    response.assertStatus(401);
})
