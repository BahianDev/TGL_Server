'use strict'
const User =  use('App/Models/User')
const { test, trait, before } = use('Test/Suite')('Forgot Password')


trait('Test/ApiClient')
trait('DatabaseTransactions')


test('return password change token', async ({ assert, client }) => {
  await client.post('users').send({
      username: 'wesley',
      email: 'wesley@email.com',
      password: '12345'
  }).end()

  const response = await client.post('passwords').send({
    email: 'wesley@email.com'
  }).end()

  response.assertStatus(200)
  assert.isDefined(response.body.token)
})

test('return error if user does not exist', async ({ assert, client }) => {

  const response = await client.post('passwords').send({
    email: 'notexist@email.com'
  }).end()

  response.assertStatus(404)
  assert.isDefined(response.body.error.message)
})
