'use strict'

const http = require('http')
const path = require('path')

const pkg = require(path.resolve(__dirname, '..', 'package.json'))

// dummy server for environments who need something listening on port 8080
const server = http.createServer((req, res) => {
  res.end(`${pkg.name}@${pkg.version}`)
})

server.listen(process.env.PORT)
