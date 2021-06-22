const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./User');

router.post('/new', (req, res) => {
    let saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds).then(hash => {
        User.create({
            name: req.body.name, 
            email: req.body.email,
            password: hash
        }).then(() => {
            req.redirect('/login');
        }).catch(error => {
            console.log(`Erro ao cadastrar novo usuário: ${error}`);
            res.redirect('/login');
        });
    }).catch(error => {
        console.log(`Não foi possível gerar o hash: ${error}`);
        res.redirect('/register');
    });
});

router.post('/authenticate', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        bcrypt.compare(req.body.password, user.password).then(result => {
            if(result){
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
                res.redirect('/admin/article/list');
            }else
                res.redirect('/login');
        }).catch(error => {
            res.redirect('/login');
        });
    }).catch(() => {
        res.redirect('/login');
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;