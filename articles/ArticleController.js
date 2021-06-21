const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const adminAuth = require('../middlewares/adminAuth');
const Article = require('./Article');
const Category = require('../categories/Category');

router.get('/admin/article/new', adminAuth, (req, res) => {
    Category.findAll()
        .then(categories => {
            res.render('admin/articles/article-new.ejs', {
                categories
            });
        }).catch(error => {
            console.log(error);
            res.redirect('/admin/article/new');
        });
});

router.get('/admin/article/list', adminAuth, (req, res) => {
    Article.findAll({
        order:[
            ['id', 'DESC']
        ],
        include: Category
    }).then(articles => {
        res.render('admin/articles/article-list.ejs', {
            articles
        });
    });
});

router.get('/article/view/:slug', (req, res) => {
    Article.findOne({
        where: {
            slug: req.params.slug
        },
        include: Category
    }).then(article => {
        res.render('article-view.ejs', {
            article,
            userAuth: (req.session.user) ? true : false
        });
    });
});

router.get('/admin/article/edit/:id', (req, res) => {
    let id = req.params.id;
    
    if(!isNaN(id)){
        Article.findByPk(id)
            .then(article => {
                if(article){
                    Category.findAll({
                        raw: true
                    }).then(categories => {
                        res.render('admin/articles/article-edit', {
                            article, 
                            categories
                        });
                    });
                }else
                res.redirect('/admin/article/list');
            });
    }else
        res.redirect('/admin/article/list');
});

router.post('/admin/article/create', adminAuth, (req, res) => {
    Article.create({
        title: req.body.title,
        abstract: req.body.abstract,
        categoryId: req.body.category,
        content: req.body.content,
        slug: slugify(req.body.title, {
            lower: true
        }),
        userId: req.session.user.id
    }).then(() => {
        res.redirect('/admin/article/list');
    });
});

router.post('/admin/article/update', (req, res) => {
    Article.update({
        id: req.body.id,
        title: req.body.title,
        abstract: req.body.abstract,
        content: req.body.content,
        categoryId: req.body.category
    },{
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.redirect('/admin/article/list');
    })
});

module.exports = router;