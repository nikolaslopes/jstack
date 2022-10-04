const http = require('http')
const { URL } = require('url')

const routes = require('./routes')

const server = http.createServer((request, response) => {
  const parserdUrl = new URL(`http://localhost:3000${request.url}`)
  let { pathname } = parserdUrl
  let id = null

  console.log(
    `Request method: ${request.method} | Endpoint: ${parserdUrl.pathname}`
  )

  const splitEndpoint = pathname.split('/').filter(Boolean)

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`
    id = splitEndpoint[1]
  }

  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === request.method
  )

  if (route) {
    request.query = Object.fromEntries(parserdUrl.searchParams)
    request.params = { id }

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(body))
    }

    route.handler(request, response)
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(`Cannot ${request.method} ${parserdUrl.pathname}`)
  }
})

server.listen(3000, () =>
  console.log('🔥 Server started at http://localhost:3000')
)
