'use strict'
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
    return {
        username: faker.name(),
        email: faker.email(),
        password: faker.string(),
        ...data
    }
})

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => {
    return {
        type: 'refreshtoken',
        token: faker.string({ length:20 }),
        ...data
    }
})