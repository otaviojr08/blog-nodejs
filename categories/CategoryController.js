const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const adminAuth = require('../middlewares/adminAuth');
const Category = require('./Category');

router.get('/list', adminAuth, (req, res) => {
    Category.findAll({
        raw: true,
        where:{
            userId: req.session.user.id
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(categories => {
        res.render('admin/categories/category-list.ejs', {
            categories
        });
    });
});

router.post('/update', (req, res) => {
    let id = req.body.id;
    let title = req.body.title;

    if(!isNaN(id)){
        Category.findByPk(id).then(category => {
            if(category){
                Category.update({
                    title: title,
                    slug: slugify(title, {
                        lower: true
                    })
                },{
                    where: {id}
                }).then(() => {
                    res.redirect('/admin/category/list');                       
                });
            }else{
                res.redirect('/admin/category/list');
            }
        });
    }else
        res.redirect('/admin/category/list');
});

router.get('/delete/:id', (req, res) => {
    let id = req.params.id;

    if(!isNaN(id)){
        Category.destroy({
            where: {id}
        }).then(() => {
            res.redirect('/admin/category/list');
        });
    }else{
        res.redirect('/admin/category/list');
    }
});

router.post('/create', adminAuth, (req, res) => {
    let title = req.body.title;
    
    Category.create({
        title,
        slug: slugify(title, {
            lower: true
        }),
        userId: req.session.user.id  
    }).then(() => {
        res.redirect('/admin/category/list');
    }).catch(error => {
        console.log(error);
        res.redirect('/admin/category/list');
    });
});

module.exports = router;