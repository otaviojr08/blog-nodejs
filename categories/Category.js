const Sequelize = require('sequelize');
const connection = require('../database/connection');
const User = require('../users/User');

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.hasMany(Category);
Category.belongsTo(User);

Category.sync({force: false});

module.exports = Category;