const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Article = require('./Article');
const Category = require('../categories/Category');

router.get('/admin/article/new', (req, res) => {
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

router.get('/admin/article/list', (req, res) => {
    Article.findAll({
        raw: true,
        order:[
            ['id', 'DESC']
        ]
    }).then(articles => {
        res.render('admin/articles/article-list.ejs', {
            articles
        });
    });
});

router.get('/article/view/:slug', (req, res) => {
    let slug = req.params.slug;

    Article.findOne({
        where: {slug}
    }).then(article => {
        res.render('article-view.ejs', {
            article
        });
    });
});

router.post('/admin/article/create', (req, res) => {
    Article.create({
        title: req.body.title,
        abstract: req.body.abstract,
        category: req.body.category,
        content: req.body.content,
        slug: slugify(req.body.title, {
            lower: true
        })
    }).then(() => {
        res.redirect('/admin/article/list');
    });
});

module.exports = router;