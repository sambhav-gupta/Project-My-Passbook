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

const Passbook = db.define('passbook',{
    Lender:{
        type: Seqeulize.STRING,
        allownull: false
    },
    Receiver:{
        type: Seqeulize.STRING,
        allownull: false
    },
    Day:{
        type: Seqeulize.INTEGER,
        allownull: false
    },
    Month:{
        type: Seqeulize.INTEGER,
        allownull: false
    },
    Year:{
        type: Seqeulize.INTEGER,
        allownull: false
    },
    Time:{
        type: Seqeulize.STRING,
        allownull: false
    },
    Amount:{
        type: Seqeulize.FLOAT,
        allownull: false
    },
    Bill:{
        type: Seqeulize.STRING,
        allownull: true
    },
    Description:{
        type: Seqeulize.STRING,
        allownull: true
    }

})
exports  = module.exports = {db,Users,Friends,Passbook}