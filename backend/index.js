const express = require('express')
const cors = require('cors');
const { database } = require('./db/database')
const { readdirSync } = require('fs')


const app = express()

require('dotenv').config()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// app.get('/', (req, res) => {
//     res.send('Project starts here')
// })

const server = () => {
    database()
    app.listen(PORT, () => {
        console.log('listening to the port  ' + PORT);

    })
}

server()