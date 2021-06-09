const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Category = require('./Category');

router.get('/list', (req, res) => {
    Category.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(categories => {
        res.render('admin/categories/category-list.ejs', {
            categories
        });
    });
});

router.post('/create', (req, res) => {
    let title = req.body.title;
    
    Category.create({
        title,
        slug: slugify(title, {
            lower: true
        })  
    }).then(() => {
        res.redirect('/admin/category/list');
    }).catch(error => {
        console.log(error);
        res.redirect('/admin/category/list');
    });
});

module.exports = router;