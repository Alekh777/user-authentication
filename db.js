const Sequelize = require('sequelize')

const db = new Sequelize('user_auth', 'myuser', 'mypass', {
    host: 'localhost',
    dialect: 'mysql',
})

const Users = db.define('user', {
    username: {
        type: Sequelize.DataTypes.STRING(30),
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING(100)
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {
    db, Users
}