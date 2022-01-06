const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const ranks = require('./routes/api/ranks')
app.use('/api/ranks', ranks)

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header("host")}${req.url}`)
        else
            next()
    })
    app.use(express.static(__dirname + '/public/'))
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`UniversalRanks started on port ${port}`))