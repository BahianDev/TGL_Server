'use strict'

const User =  use('App/Models/User')
const Factory = use('Factory');
const { test, trait } = use('Test/Suite')('Session')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('return a token when user is logged in', async ({ assert,  client }) => {
  const sessionPayload = {
    email: 'wesley@email.com',
    password: '12345'
  }
  await Factory.model('App/Models/User').create(sessionPayload)

  const response = await client
    .post('sessions')
    .send(sessionPayload)
    .end()

  assert.isDefined(response.body.token)
  response.assertStatus(200)
})

