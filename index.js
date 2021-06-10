const express = require('express');
const app = express();
const database = require('./database/connection');
const session = require('express-session');

//Models database
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

//Controllers
const GuestController = require('./guest/GuestController');
const ArticleController = require('./articles/ArticleController');
const CategoryController = require('./categories/CategoryController');
const UserController = require('./users/UserController');

//Configurations
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//Database
database.authenticate()
    .then(()=> {
        console.log('Banco de dados conectado!')
    })
    .catch(error => {
        console.log(`Erro ao conectar com banco de dados: ${error}`)
    });

//Session config
app.use(session({
    secret: 'mnbvcxz',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 960000
    }
}));

//Use controllers
app.use('/', GuestController);
app.use('/', ArticleController);
app.use('/admin/category', CategoryController);
app.use('/user', UserController);

app.get('/leitura', (req, res) => {
    res.json(req.session.user);
});

app.listen('8080', '127.0.0.1', error => {
    if(error)
        console.log(`Erro ao iniciar servidor: ${error}`);
    else
        console.log('Servidor iniciado!');
});