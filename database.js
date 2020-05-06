const Seqeulize = require('sequelize')

const db = new Seqeulize({
    dialect: 'mysql',
    database: 'splitapp',
    username: 'head',
    password: 'tail'
})

const Users = db.define('user',{
    Firstname:{
        type: Seqeulize.STRING,
        allownull: false
    },
    Lastname:{
        type: Seqeulize.STRING,
        allownull: false
    },
    Username:{
        type: Seqeulize.STRING,
        allownull: false,
        unique: true
    },
    Password:{
        type: Seqeulize.STRING,
        allownull: false
    }
})

exports  = module.exports = {db,Users}