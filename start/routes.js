'use strict'

const UserController = require("../app/Controllers/Http/UserController")

const Route = use('Route')

Route.resource('users', 'UserController')
        .apiOnly()
        .except(['show', 'index', 'update'])
        .validator(new Map([[['users.store'], ['User']]]))

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.post('reset', 'ResetPasswordController.store').validator('ResetPassword')

Route.group(() => {
    Route.resource('games', 'GameController')
        .apiOnly()
        .validator(new Map([[['games.store'], ['Game']]]))

    Route.get('users', 'UserController.show')
    Route.put('users', 'UserController.update')

    Route.resource('bets', 'BetController')
        .apiOnly()
        .validator(new Map([[['bets.store'], ['Bet']]]))
}).middleware(['auth'])


