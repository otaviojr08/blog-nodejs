const express = require('express');
const app = express();
const database = require('./database/connection');
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

//Configurations
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//Database
database.authenticate()
    .then(()=>console.log('Banco de dados conectado!'))
    .catch(error => {
        console.log(`Erro ao conectar com banco de dados: ${error}`)
    });