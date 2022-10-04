const http = require('http')
const { URL } = require('url')

const routes = require('./routes')

const server = http.createServer((request, response) => {
  const parserdUrl = new URL(`http://localhost:3000${request.url}`)

  console.log(
    `Request method: ${request.method} | Endpoint: ${parserdUrl.pathname}`
  )

  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === parserdUrl.pathname &&
      routeObj.method === request.method
  )

  if (route) {
    request.query = Object.fromEntries(parserdUrl.searchParams)
    route.handler(request, response)
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(`Cannot ${request.method} ${parserdUrl.pathname}`)
  }
})

server.listen(3000, () =>
  console.log('🔥 Server started at http://localhost:3000')
)
