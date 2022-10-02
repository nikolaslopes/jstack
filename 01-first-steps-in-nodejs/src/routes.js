const UserController = require('./controllers/UserController')
const GameController = require('./controllers/GameController')

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.listUsers,
  },
  {
    endpoint: '/games',
    method: 'GET',
    handler: GameController.listGames,
  },
]
