'use strict'
const User =  use('App/Models/User')
const Factory = use('Factory')
const Mail = use('Mail');
const { test, trait } = use('Test/Suite')('Forgot Password')


trait('Test/ApiClient')
trait('DatabaseTransactions')


test('it should send an email with reset password instructions', async ({ assert, client }) => {
  Mail.fake()
  const email = 'wesley@email.com';
  const redirect_url = 'http://meusistema.com';

  const user = await Factory.model('App/Models/User').create({ email });

  const response = await client
    .post('passwords')
    .send({ email, redirect_url })
    .end();

  const token = await user.tokens().first();
  const recentEmail = Mail.pullRecent();
  assert.include(token.toJSON(), {
    type: 'forgotPassword',
  });

  assert.equal(recentEmail.message.to[0].address, email);

  response.assertStatus(200)
  Mail.restore();
}).timeout(0)

test('return error if user does not exist', async ({ assert, client }) => {

  const response = await client.post('passwords').send({
    email: 'notexist@email.com',
    redirect_url: 'http://meusistema.com'
  }).end()

  response.assertStatus(404)
  assert.isDefined(response.body.error.message)
})
