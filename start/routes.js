'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.post('reset', 'ResetPasswordController.store')

Route.group(() => {
    Route.resource('games', 'GameController').apiOnly()
}).middleware(['auth'])


