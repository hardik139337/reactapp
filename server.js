const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()
const config = require('./config')
const routes = require('./routes')
var cors = require('cors')

const app = express()
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, './client/build')))

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log(`Mongo DB Succesfully Connected`))
  .catch((err) => console.log(err))

app.use(routes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})
