const express = require('express')

const HOST = '0.0.0.0'
const PORT = '3000'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello world my friends!!')
})

app.listen(PORT, HOST)