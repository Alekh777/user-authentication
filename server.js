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

app.get('/', (req, res)=>{
    if(!req.session.userId)
        return res.redirect('/signup')
    res.redirect('/profile')
})

app.get('/signup', (req, res)=>{
    res.render('signup.hbs')
})

app.post('/signup', async (req, res)=>{
    const user = await Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    res.status(201).send(`User ${req.body.username} created, <a href="/login">login</a> to go to your profile`)
})

app.get('/login', (req, res)=>{
    if(!req.session.userId)
        return res.render('login.hbs')
    res.redirect('/profile')
})

app.post('/login', async (req, res)=>{
    const user = await Users.findOne({where: {username: req.body.username}})
    if(!user){
        return res.status(404).render('login.hbs', {error: 'No such username found'})
    }
    
    if(user.password !== req.body.password){
        return res.status(404).render('login.hbs', {error: 'Incorrect password'})
    }

    req.session.userId = user.id;
    res.redirect('/profile')
})

app.get('/profile', async (req, res)=>{
    if(!req.session.userId){
        return res.redirect('/login')
    }
    const user = await Users.findByPk(req.session.userId)
    res.render('profile.hbs', {user})
})

app.get('/logout', (req, res)=>{
    req.session.userId = null
    res.redirect('/login')
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