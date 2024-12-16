const express = require('express')
const joyasRoutes = require('../routes/joyas.routes')

const app = express()

app.use('/joyas', joyasRoutes)

module.exports = app;