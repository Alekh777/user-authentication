const express = require('express')
const session = require('express-session')
const app = express();
const {db, Users} = require('./db')
const PORT = process.env.PORT || 2424


app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Hi, welcome to the backend')
})

db.sync()
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server started at http://localhost:${PORT}`)
        })
    })
    .catch((err)=>{
        console.error(err)
    })