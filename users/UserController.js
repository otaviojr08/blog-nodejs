const express = require('express');
const router = express.Router();
const User = require('./User');

router.post('/new', (req, res) => {
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

router.post('/authenticate', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where: {email}
    }).then(user => {
        if(user && user.password === password){
            
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
            };

            res.redirect('/admin/article/list');

        }else
            res.redirect('/login');
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