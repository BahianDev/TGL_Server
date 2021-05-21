'use strict'

const User =  use('App/Models/User')
const { test, trait } = use('Test/Suite')('Session')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('return a token when user is logged in', async ({ assert,  client }) => {

  await client.post('users').send({
    username: 'wesley',
    email: 'wesley@email.com',
    password: '12345'
  }).end()

  const response = await client.post('sessions').send({
    email: 'wesley@email.com',
    password: '12345'
  }).end()

  assert.isDefined(response.body.token)
  response.assertStatus(200)
})

