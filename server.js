const express = require('express')
const session = require('express-session')
const app = express();
const {db, Users} = require('./db')
const PORT = process.env.PORT || 2424

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'asdkfjadfki24j3i23j5'
}))

app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/signup', (req, res)=>{
    res.render('signup.hbs')
})

app.post('/signup', async (req, res)=>{
    const user = await Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    res.status(201).send(`User ${req.body.username} created`)
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