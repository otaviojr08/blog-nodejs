const express = require('express');
const router = express.Router();
const User = require('../users/User');
const Category = require('../categories/Category');
const Article = require('../articles/Article');

router.get('/', (req, res) => {
    Article.findAll({
        raw: true,
        order:[
            ['id', 'DESC']
        ]
    }).then(articles => {
        res.render('index.ejs',{
            articles,
            userAuth: (req.session.user) ? true : false
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/register', (req, res) => {
    res.render('register.ejs');
});

// list of categories and articles belonging
router.get('/categories', (req, res) => {
    Category.findAll({
        raw: true,
        order:[
            ['title', 'ASC']
        ]
    }).then(categories => {
        res.render('categories.ejs', {
            categories,
            userAuth: (req.session.user) ? true : false
        }); 
    });
});

router.get('/categories/:slug/:id', (req, res) => {
    Article.findAll({
        where: {
            categoryId: req.params.id
        }
    }).then(articles => {
        // res.json(articles);
        Category.findOne({
            where: {
                slug: req.params.slug
            },
            order:[
                ['id', 'DESC']
            ],
            attributes: ['title', 'id']
        }).then(category => {
            res.render('category-list-articles.ejs', {
                articles,
                category,
                userAuth: (req.session.user) ? true : false
            });
        });
    });
});

module.exports = router;