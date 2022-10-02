const games = require('../mocks/games')

module.exports = {
  listGames(request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(games))
  },
}
