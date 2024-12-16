const express = require('express')
const morgan = require('morgan')
const joyasRoutes = require('./routes/joyas.routes')
const cors = require('cors')
const errorMiddleware = require('./middlewares/errorMiddleware')
const reportesMiddleware = require('./middlewares/reportesMiddleware')

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/joyas', reportesMiddleware, joyasRoutes)

app.use(errorMiddleware)

module.exports = app;
