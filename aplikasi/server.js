const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const migration = require('../infastruktur/migration')

const app = express()

app.set('x-powered-by', false)
app.set('etag', false)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/', routes)

migration.init()

module.exports = app