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
    .then(()=> {
        console.log('Banco de dados conectado!')
    })
    .catch(error => {
        console.log(`Erro ao conectar com banco de dados: ${error}`)
    });

//Routes
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.post('/user/new', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    User.create({
        name, 
        email,
        password
    }).then(() => {
        req.redirect('/login');
    }).catch(error => {
        console.log(`Erro ao cadastrar novo usuário: ${error}`);
        res.redirect('/login');
    });
});

app.post('/user/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where: {email}
    }).then(user => {
        if(user && user.password === password){
            
            res.render('admin/user/index.ejs', {
                user
            });

        }else
            res.redirect('/login');
    }).catch(() => {
        res.redirect('/login');
    });
});

app.listen('8080', '127.0.0.1', error => {
    if(error)
        console.log(`Erro ao iniciar servidor: ${error}`);
    else
        console.log('Servidor iniciado!');
});