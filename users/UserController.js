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

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where: {email}
    }).then(user => {
        if(user && user.password === password){
            
            req.session.user = {
                user
            };

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