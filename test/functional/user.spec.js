'use strict'

const User =  use('App/Models/User')
const { test, trait } = use('Test/Suite')('User')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('register a new user', async ({ client }) => {

  const response = await client.post('users').send({
    username: 'wesley',
    email: 'wesley@email.com',
    password: '12345'
  }).end()

  response.assertStatus(200)
})

test('returns an error if any input is not provided', async ({ assert, client }) => {
  const response = await client.post('users').send({ username: null, email: 'test@email.com', password: 'password' }).end()

  response.assertStatus(400)
  const messages = response.body
  assert.isDefined(messages[0].message)
})