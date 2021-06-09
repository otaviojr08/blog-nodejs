const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Article = require('./Article');

router.get('/new', (req, res) => {
    res.render('admin/articles/article-new.ejs');
});

router.post('/create', (req, res) => {
    res.json(req.body);
});

module.exports = router;