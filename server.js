if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-Parser')
const { Router } = require('express')
PORT = process.env.PORT

const indexRouter = require('./routes/index')
const regRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const userRouter = require('./routes/user')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') 
app.set('layout', 'layouts/layout1')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})

const db = mongoose.connection
db.on('error', error => console.log('error'))
db.once('open', error => console.log("MongoDB connected"))

app.use('/', indexRouter)
app.use('/register', regRouter)
app.use('/login', loginRouter)
app.use('/user', userRouter)


app.listen(PORT);

console.log(`App Listening on Port ${PORT}`)
console.log(`Link: http://localhost:${PORT}`)