'use strict'
import express, { json, urlencoded } from 'express'
import router from './routes/index'
import error from './middleware/error'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/', router)

app.use(error)
// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))