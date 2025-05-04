const connectToMongo = require('./db')
const express = require('express')

const app = express()
const port = 4000

//middleware
app.use(express.json())
//api

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})
connectToMongo()