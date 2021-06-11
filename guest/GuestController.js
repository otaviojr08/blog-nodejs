const express = require('express');
const router = express.Router();
const User = require('../users/User');
const Category = require('../categories/Category');
const Article = require('../articles/Article');

Category.findAll({
    raw: true
}).then(categories => {

    router.get('/', (req, res) => {
        Article.findAll({
            raw: true,
            order:[
                ['id', 'DESC']
            ]
        }).then(articles => {
            res.render('index.ejs',{
                categories,
                articles
            });
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

module.exports = router;