const express = require('express');
const app = express();
const database = require('./database/connection');

//Models database
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

//Controllers
const GuestController = require('./guest/GuestController');
const ArticleController = require('./articles/ArticleController');
const CategoryController = require('./categories/CategoryController');

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

//Use controllers
app.use('/', GuestController);
app.use('/admin/article', ArticleController);
app.use('/admin/category', CategoryController);

app.listen('8080', '127.0.0.1', error => {
    if(error)
        console.log(`Erro ao iniciar servidor: ${error}`);
    else
        console.log('Servidor iniciado!');
});