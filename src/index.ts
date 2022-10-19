import 'express-async-errors'
import express from 'express'
import { route } from './router'
import { errorMiddleware } from './middlewares/error'

const app = express()

app.use(express.json())

app.use(route)

app.use(errorMiddleware)

app.listen(3333)