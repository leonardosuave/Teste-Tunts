const express = require('express')
const app = express()
const path = require('path')

//Import routers
const home = require('./src/routes/home');

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use(home)

app.listen(8081, () => {
    console.log('Connected Server')
    console.log('http://localhost:8081')
})