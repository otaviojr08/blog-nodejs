const express = require('express');
const router = express.Router();
const User = require('../users/User');
const Category = require('../categories/Category');

Category.findAll({
    raw: true
}).then(categories => {

    router.get('/', (req, res) => {
        res.render('index.ejs',{
            categories
        });
    });
    
    router.get('/login', (req, res) => {
        res.render('login.ejs', {
            categories
        });
    });
    
    router.get('/register', (req, res) => {
        res.render('register.ejs', {
            categories
        });
    });

});

router.post('/user/new', (req, res) => {
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

router.post('/user/login', (req, res) => {
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

module.exports = router;