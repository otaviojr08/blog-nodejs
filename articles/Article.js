const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Category = require('../categories/Category');
const User = require('../users/User');

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    abstract: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Associations
Category.hasMany(Article);
Article.belongsTo(Category);
User.hasMany(Article);
Article.belongsTo(User);
User.hasMany(Category);
Category.belongsTo(User);

Article.sync({force: false});

module.exports = Article;