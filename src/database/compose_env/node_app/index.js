const express = require('express')

const HOST = '0.0.0.0'
const PORT = '3000'

const app = express()

app.get('/', (req, res) => {
    res.send('<h3>Aplicação executando!</h3>')
})

app.get('/hello', (req, res) => {
    res.send('<h3>Hello world my friends!!</h3>')
})

app.listen(PORT, HOST)