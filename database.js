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
    },
    Extension:{
        type: Seqeulize.STRING,
        allownull: false
    }
})

const Friends = db.define('friendlist',{
    Username:{
        type: Seqeulize.STRING,
        allownull: false
    },
    Friend:{
        type: Seqeulize.STRING,
        allownull: false
    }
})

exports  = module.exports = {db,Users,Friends}